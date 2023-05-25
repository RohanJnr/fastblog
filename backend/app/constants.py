import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class ConnectionUrls:
    DATABASE_URL = os.getenv("DATABASE_URL")


class Discord:
    DISCORD_CLIENT_ID = os.getenv("DISCORD_CLIENT_ID")
    DISCORD_CLIENT_SECRET = os.getenv("DISCORD_CLIENT_SECRET")
    REDIRECT_URI = os.getenv("REDIRECT_URI")
    AUTHORIZE_URL = os.getenv("AUTHORIZE_URL")

    DISCORD_USER_DETAILS_URL = "https://discord.com/api/v10/users/@me"
    AVATAR_URL_FORMAT = "https://cdn.discordapp.com/avatars/{user_id}/{avatar}?size=1024"


class Auth:
    TOKEN_EXPIRES_IN_DAYS_TIMEDELTA = timedelta(days=30)
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = "HS256"