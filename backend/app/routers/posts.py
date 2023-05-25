from fastapi import HTTPException
from fastapi.routing import APIRouter
from tortoise.contrib.fastapi import HTTPNotFoundError

from postgres.models import Post, PostPydantic, PostPydanticInput

router = APIRouter(
    prefix="/posts"
)


@router.get("/something")
async def something():
    return {"message": "hello world posts"}


@router.get("/")
async def get_posts():
    p = await Post.first()
    return await PostPydantic.from_queryset(Post.all())

@router.get("/{post_id}", response_model=PostPydantic)
async def get_post(post_id: int) -> PostPydantic:
    return await PostPydantic.from_queryset_single(Post.get(id=post_id))

@router.post("/", response_model=PostPydantic, responses={404: {"model": HTTPNotFoundError}})
async def create_post(user: PostPydanticInput):
    user_obj = await Post.create(**user.dict(exclude_unset=True))
    return await PostPydantic.from_tortoise_orm(user_obj)


@router.put(
    "/{post_id}", response_model=PostPydantic, responses={404: {"model": HTTPNotFoundError}}
)
async def update_post(post_id: int, post: PostPydanticInput):
    await Post.filter(id=post_id).update(**post.dict(exclude_unset=True))
    return await PostPydantic.from_queryset_single(Post.get(id=post_id))


@router.delete("/{post_id}", responses={404: {"model": HTTPNotFoundError}})
async def delete_post(post_id: int):
    deleted_count = await Post.filter(id=post_id).delete()
    if not deleted_count:
        raise HTTPException(status_code=404, detail=f"Post {post_id} not found")
    return {"message": "Deleted post successfully!"}