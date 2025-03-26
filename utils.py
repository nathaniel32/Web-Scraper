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
import re

class BotManager:
    def __init__(self):
        self.global_db = database.session_local()
        self.active_bots: list[Bot] = []
        self.global_urls = []
        self.init()

    def init(self):
        query_url = self.global_db.query(database.TScraping.url_s).all()
        self.global_urls.extend([url_s for (url_s,) in query_url])
        print(self.global_urls)

    def get_data_database(self):
        pass

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
        self.time = None
        self.title_value = None
        self.description_value = None
        self.location_value = None
        self.content_value = None
        self.email_value = None
        self.surfing_is_free = True

    async def connect(self):
        await self.websocket.accept()

    async def get_set_bot_config(self, data=None):
        if data:
            self.pattern = data["data_pattern"]
            self.time = int(data["data_time"]) if isinstance(data["data_time"], (int, float, str)) and str(data["data_time"]).isdigit() else 0
            self.title_value = data["data_title"]
            self.description_value = data["data_description"]
            self.location_value = data["data_location"]
            self.content_value = data["data_content"]
            self.email_value = data["data_email"]
        await self.websocket.send_json({"action": config.BotAction.CONFIG.value, "message": "ok", "data": {"pattern": self.pattern, "time": self.time, "title": self.title_value, "description": self.description_value, "location": self.location_value, "content": self.content_value, "email": self.email_value}})

    async def get_bot_status(self):
        await self.websocket.send_json({"action": config.BotAction.STATUS.value, "message": "ok", "data": {"url": len(self.url), "url_index": self.url_index}})
    
    def bot_remote(self, data=None):
        self.auto_visit = not self.auto_visit
        if self.auto_visit:
            threading.Thread(target=self.run_bot_loop, daemon=True).start()
    
    def run_bot_loop(self):
        while True:
            if self.url_index < len(self.url):
                if self.auto_visit:
                    if self.surfing_is_free:
                        url_index_booking = self.url_index
                        self.url_index += 1
                        asyncio.run(self.bot_surfing({"url": self.url[url_index_booking], "force":False}))
                    else:
                        time.sleep(0.5)
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
        if self.surfing_is_free:
            self.surfing_is_free = False
            if self.driver is None or not self.browser_check():
                self.open_browser()

            url = data["url"]
            if url not in self.manager.global_urls or data["force"]:
                self.manager.global_urls.append(url)
                #error handling
                try:
                    self.driver.get(url)

                    time.sleep(self.time)

                    try:
                        WebDriverWait(self.driver, self.time).until(
                            EC.presence_of_element_located((By.TAG_NAME, "body"))
                        )
                    except:
                        print("timeout!")
                        
                    ################################################################################
                    try:
                        title_element_map = next((item for item in self.search_map if item["typ"] == self.title_value["typ"]), None)
                        title_element = self.driver.find_element(title_element_map["data"], self.title_value["feature"])
                        title_value = title_element.text.strip()
                    except:
                        title_value = None

                    print("value title:", title_value)

                    try:
                        description_element_map = next((item for item in self.search_map if item["typ"] == self.description_value["typ"]), None)
                        description_element = self.driver.find_element(description_element_map["data"], self.description_value["feature"])
                        description_value = description_element.text.strip()
                    except:
                        description_value = None

                    print("value description:", description_value)

                    try:
                        location_element_map = next((item for item in self.search_map if item["typ"] == self.location_value["typ"]), None)
                        location_element = self.driver.find_element(location_element_map["data"], self.location_value["feature"])
                        location_value = location_element.text.strip()
                    except:
                        location_value = None

                    print("value location:", location_value)

                    try:
                        content_element_map = next((item for item in self.search_map if item["typ"] == self.content_value["typ"]), None)
                        content_container = self.driver.find_element(content_element_map["data"], self.content_value["feature"])
                        content_value = content_container.text.strip()
                    except:
                        content_value = None

                    print("value content:", content_value)

                    try:
                        email_element_map = next((item for item in self.search_map if item["typ"] == self.email_value["typ"]), None)
                        email_container = self.driver.find_element(email_element_map["data"], self.email_value["feature"])
                        email_content_value = email_container.text.strip()

                        emails_value = re.findall(config.EMAIL_PATTERN, email_content_value)
                        if emails_value:
                            email_value = emails_value[0]
                        else:
                            email_value = None
                    except:
                        email_value = None

                    print("value email:", email_value)
                    ################################################################################

                    try:
                        anchor_tags = self.driver.find_elements(By.TAG_NAME, "a")
                        if anchor_tags:
                            try:
                                new_url = [
                                    (match.group(0))  # sesuai dengan pola
                                    for tag in anchor_tags
                                    if tag.get_attribute("href") and
                                    (match := next((re.match(pattern, tag.get_attribute("href")) for pattern in self.pattern if re.match(pattern, tag.get_attribute("href"))), None)) is not None
                                ]
                                new_url_global_checked = [url for url in new_url if url not in self.manager.global_urls]
                                self.url = list(dict.fromkeys(self.url + new_url_global_checked))

                                print(len(new_url), len(new_url_global_checked), len(self.url))
                            except Exception as e:
                                print("error href")
                    except Exception as e:
                        print("error anchor")

                    if title_value and (description_value or content_value):
                        try:
                            new_scrap = database.TScraping(
                                url_s = url,
                                title_s = title_value,
                                description_s = description_value,
                                location_s = location_value,
                                content_s = content_value,
                                email_s = email_value
                            )
                            self.db.add(new_scrap)
                            self.db.commit()
                            message = "ok"
                        except Exception as e:
                            self.db.rollback()
                            message = "duplicate"
                    else:
                        message = "title not found"
                    
                    await self.manager.manager_information()
                    try:
                        await self.manager.manager_broadcast({"action": config.BotAction.SURFING.value, "message": message, "data": {"url": url, "title": title_value, "description": description_value, "location": location_value, "content": content_value, "email": email_value}})
                    except Exception as e:
                        print("Error WS")
                except Exception as e:
                    print("URL Error")
            else:
                print("duplikat")
            
            await self.get_bot_status()
            self.surfing_is_free = True
        else:
            print("busy")

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