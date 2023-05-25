from app.constants import ConnectionUrls


TORTOISE_ORM = {
    "connections": {"default": ConnectionUrls.DATABASE_URL},
    "apps": {
        "models": {
            "models": ["postgres.models", "aerich.models"],
            "default_connection": "default",
        },
    },
}