import os
from dotenv import load_dotenv


load_dotenv()

class ConnectionUrls:
    DATABASE_URL = os.getenv("DATABASE_URL")


class DiscordCredentials:
    DISCORD_CLIENT_ID = os.getenv("DISCORD_CLIENT_ID")
    DISCORD_CLIENT_SECRET = os.getenv("DISCORD_CLIENT_SECRET")
    REDIRECT_URI = os.getenv("REDIRECT_URI")
    AUTHORIZE_URL = os.getenv("AUTHORIZE_URL")