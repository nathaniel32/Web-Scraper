import threading
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fastapi import WebSocket, WebSocketDisconnect
import database
import config
from selenium.webdriver.common.by import By
import asyncio
import time

#TODO error handling

class BotManager:
    def __init__(self):
        self.global_db = database.session_local()
        self.active_bots: list[Bot] = []
        self.global_urls = []
        self.global_categorys = []
        self.init()

    def init(self):
        query_url = self.global_db.query(database.TScrap.url_s).all()
        self.global_urls.extend([url_s for (url_s,) in query_url])
        print(self.global_urls)

        query_category = self.global_db.query(database.TCategory.name_c).all()
        self.global_categorys.extend([name_c for (name_c,) in query_category])
        print(self.global_categorys)

    def get_data_database(self):
        #TODO update database untuk semua user realtime
        query = (
            self.global_db.query(database.TScrap, database.TCategory, database.TData)
            .join(database.TData, database.TScrap.id_s == database.TData.id_s)
            .join(database.TCategory, database.TCategory.id_c == database.TData.id_c)
            .all()
        )
        for scrap, category, data in query:
            print(scrap.url_s, category.id_c, data.id_d)

    def get_set_data_category(self, data):
        pass
    
    async def manager_add(self, bot: 'Bot'):
        self.active_bots.append(bot)
        await self.manager_information()

    async def manager_remove(self, bot: 'Bot'):
        try:
            self.active_bots.remove(bot)
            await self.manager_information()
        except ValueError:
            print("Bot not found")

    async def manager_information(self):
        data = {"active_bots": len(self.active_bots), "total_global_page": len(self.global_urls)}
        await self.manager_broadcast({"action": config.BotAction.INFORMATION.value, "message": "ok", "data": data})

    async def manager_broadcast(self, message: dict):
        for bot in self.active_bots:
            try:
                await bot.websocket.send_json(message)
            except WebSocketDisconnect:
                await self.manager_remove(bot)

class Bot:
    def __init__(self, websocket: WebSocket, db: database.db_dependency, manager: BotManager):
        self.websocket = websocket
        self.db = db
        self.manager = manager
        self.auto_visit = False
        self.driver = None
        self.search_map = [{"typ": "1", "data": By.TAG_NAME}, {"typ": "2", "data": By.CSS_SELECTOR}]
        self.url = []
        self.url_index = 0
        self.pattern = []
        self.time = 1
        self.search = []

    async def connect(self):
        await self.websocket.accept()

    async def get_set_bot_config(self, data=None):
        if data:
            self.pattern = data["data_pattern"]
            self.time = int(data["data_time"]) if data["data_time"] is not None else 0
            self.search = data["data_search"]
        await self.websocket.send_json({"action": config.BotAction.CONFIG.value, "message": "ok", "data": {"pattern": self.pattern, "time": self.time, "search": self.search}})

    async def get_bot_status(self):
        await self.websocket.send_json({"action": config.BotAction.STATUS.value, "message": "ok", "data": {"url": self.url, "url_index": self.url_index}})
    
    def bot_remote(self, data=None):
        self.auto_visit = not self.auto_visit
        if self.auto_visit:
            threading.Thread(target=self.run_bot_loop, daemon=True).start()
    
    def run_bot_loop(self):
        while True:
            if self.url_index < len(self.url):
                if self.auto_visit:
                    url_index_booking = self.url_index
                    self.url_index += 1
                    asyncio.run(self.bot_surfing({"url": self.url[url_index_booking], "force":False}))
                else:
                    try:
                        asyncio.run(self.websocket.send_json({"action": config.BotAction.REMOTE.value, "message": "auto_visit is disabled", "data": self.auto_visit}))
                    except Exception as e:
                        print("ws error")
                    break
            else:
                self.auto_visit = False
                asyncio.run(self.websocket.send_json({"action": config.BotAction.REMOTE.value, "message": "end", "data": self.auto_visit}))
                break

    async def bot_surfing(self, data):
        if self.driver is None or not self.browser_check():
            self.open_browser()

        url = data["url"]
        if url not in self.manager.global_urls or data["force"]:
            self.manager.global_urls.append(url)
            #error handling
            self.driver.get(url)

            time.sleep(self.time)

            try:
                WebDriverWait(self.driver, self.time).until(
                    EC.presence_of_element_located((By.TAG_NAME, "body"))
                )
            except:
                print("timeout!")

            search_data_array = []
            for element in self.search:
                try:
                    this_element_map = next((item for item in self.search_map if item["typ"] == element["typ"]), None)
                    if this_element_map:
                        search_element = self.driver.find_element(this_element_map["data"], element["search"])
                        search_data_array.append({"category": element["category"], "data": search_element.text.strip()})
                except Exception as e:
                    print("error: element not found")
            
            print(search_data_array)
            
            try:
                anchor_tags = self.driver.find_elements(By.TAG_NAME, "a")
                if anchor_tags:
                    try:
                        new_url = [tag.get_attribute("href") for tag in anchor_tags]
                        new_url_global_checked = [url for url in new_url if url not in self.manager.global_urls]
                        self.url = list(dict.fromkeys(self.url + new_url_global_checked))

                        print(len(new_url), len(new_url_global_checked), len(self.url))
                    except Exception as e:
                        print("error href")
            except Exception as e:
                print("error anchor")

            try:
                new_scrap = database.TScrap(url_s=url)
                self.db.add(new_scrap)
                self.db.flush()
                id_scrap = new_scrap.id_s
                
                for data in search_data_array:
                    category = self.db.query(database.TCategory).filter(database.TCategory.name_c == data["category"]).first()
                    
                    if not category:
                        new_category = database.TCategory(name_c=data["category"])
                        self.db.add(new_category)
                        self.db.flush()
                        id_category = new_category.id_c
                        self.manager.global_categorys.append(data["category"])
                    else:
                        id_category = category.id_c
                    
                    new_data = database.TData(id_s=id_scrap, id_c=id_category, data_d=data["data"])
                    self.db.add(new_data)
                
                self.db.commit()
                
                message = "ok"
            except Exception as e:
                self.db.rollback()
                message = "duplicate"
            
            await self.manager.manager_information()
            try:
                await self.websocket.send_json({"action": config.BotAction.SURFING.value, "message": message, "data": {"url": url, "data_search": search_data_array}})
            except Exception as e:
                print("Error WS")
        else:
            print("duplikat")
        
        await self.get_bot_status()

    def browser_check(self):
        if self.driver is None:
            return False
        try:
            self.driver.get_window_position()
            return True
        except Exception as e:
            return False
        
    def open_browser(self):
        options = Options()
        options.headless = False
        options.add_argument("--autoplay-policy=no-user-gesture-required")
        self.driver = webdriver.Chrome(options=options)
    
    def close_browser(self):
        if self.driver is not None:
            self.driver.quit()
            self.driver = None