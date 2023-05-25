from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class User(models.Model):
    """User model."""
    user_id = fields.BigIntField(pk=True, generated=False)
    username = fields.CharField(max_length=256, null=True)
    discriminator = fields.IntField(null=True)
    avatar = fields.CharField(max_length=256, null=True)
    key_salt = fields.CharField(max_length=64, null=False)

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._custom_generated_pk = True


UserPydantic = pydantic_model_creator(User, name="User")
UserPydanticInput = pydantic_model_creator(User, name="UserIn", exclude_readonly=True)