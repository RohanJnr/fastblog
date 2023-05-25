from loguru import logger
from postgres.config import TORTOISE_ORM
from tortoise import Tortoise


async def db_init() -> None:
    """Initialize postgres connection and create tables."""
    await Tortoise.init(config=TORTOISE_ORM)
    # Generate the schema
    await Tortoise.generate_schemas(safe=True)
    logger.info("Database initialized.")