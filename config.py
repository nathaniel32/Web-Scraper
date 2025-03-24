import os
from enum import Enum

BOT_SERVICE_HOST = "localhost"
BOT_SERVICE_PORT = 50000

DATABASE_DIR = "data"
DATABASE_PATH = os.path.join(DATABASE_DIR, 'bot.db')
os.makedirs(DATABASE_DIR, exist_ok=True)

class BotAction(Enum):
    REMOTE = "remote"
    SURFING = "surfing"
    INFORMATION = "information"
    CONFIG = "config"
    STATUS = "status"