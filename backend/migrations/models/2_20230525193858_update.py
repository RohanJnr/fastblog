from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" ADD "username" VARCHAR(256);
        ALTER TABLE "user" ADD "avatar" VARCHAR(256);
        ALTER TABLE "user" ADD "discriminator" INT;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "user" DROP COLUMN "username";
        ALTER TABLE "user" DROP COLUMN "avatar";
        ALTER TABLE "user" DROP COLUMN "discriminator";"""
