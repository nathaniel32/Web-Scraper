from fastapi import FastAPI, Query, status, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import uvicorn
import config
import utils
import database

app = FastAPI()
bots_manager = utils.BotManager()

app.mount("/assets", StaticFiles(directory="template/assets"))

@app.get("/", response_class=HTMLResponse, status_code=status.HTTP_200_OK)
def controller():
    with open("template/controller.html", "r") as file:
        content = file.read()
    return content

@app.websocket("/bot_ws")
async def bot_ws(websocket: WebSocket, db: database.db_dependency):
    bot = utils.Bot(websocket, db, bots_manager)
    action_map = {
        config.BotAction.REMOTE.value: (bot.bot_remote, False),
        config.BotAction.SURFING.value: (bot.bot_surfing, True),
        config.BotAction.CONFIG.value: (bot.get_set_bot_config, True)
    }

    await bot.connect()
    await bots_manager.manager_add(bot)
    #await bot.get_set_bot_config()
    await bot.get_bot_status()
    try:
        while True:
            message = await bot.websocket.receive_json()
            handler, needs_await = action_map.get(message["action"])
            print(message)
            if handler:
                if needs_await:
                    await handler(message["data"])
                else:
                    handler(message["data"])
            else:
                print("Action Error!")
    except WebSocketDisconnect:
        bot.auto_visit = False
        bot.close_browser()
        await bots_manager.manager_remove(bot)
        #del bot
        print("Disconnected")

if __name__ == "__main__":
    uvicorn.run("main:app", host=config.BOT_SERVICE_HOST, port=config.BOT_SERVICE_PORT)