import datetime
import typing as t

from pydantic import BaseModel


class User(BaseModel):
    user_id: int
    username: str
    discriminator: int
    avatar: str


class Post(BaseModel):
    user: User
    id: int
    title: str
    description: str
    created_at: datetime.datetime | str
    modified_at: datetime.datetime | str
    likes: t.Optional[t.List[User]]
    liked: bool
