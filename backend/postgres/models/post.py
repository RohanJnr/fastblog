from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator

from postgres.models import User


class Post(models.Model):
    """Post models."""
    user: fields.ForeignKeyRelation[User] = fields.ForeignKeyField(
        "models.User", related_name="posts", null=True
    )
    title = fields.CharField(max_length=256, null=False, unique=True)
    description = fields.TextField(null=False)
    
    created_at = fields.DatetimeField(auto_now_add=True)
    modified_at = fields.DatetimeField(auto_now=True)

    likes: fields.ManyToManyRelation["User"] = fields.ManyToManyField("models.User", related_name="likes", through="post_likes", on_delete=fields.CASCADE)


PostPydantic = pydantic_model_creator(Post, name="Post")
PostPydanticInput = pydantic_model_creator(Post, name="PostIn", exclude_readonly=True)