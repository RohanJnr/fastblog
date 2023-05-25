import datetime
import typing as t

from pydantic import BaseModel


class User(BaseModel):
    user_id: int
    key_salt: str


class Post(BaseModel):
    title: str
    description: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    likes: t.Optional[t.List[User]]
