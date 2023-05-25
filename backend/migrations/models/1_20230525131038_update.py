from tortoise import BaseDBAsyncClient


async def upgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "post" ADD "user_id" BIGINT;
        ALTER TABLE "post" ADD CONSTRAINT "fk_post_user_cd59c18a" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE;"""


async def downgrade(db: BaseDBAsyncClient) -> str:
    return """
        ALTER TABLE "post" DROP CONSTRAINT "fk_post_user_cd59c18a";
        ALTER TABLE "post" DROP COLUMN "user_id";"""
