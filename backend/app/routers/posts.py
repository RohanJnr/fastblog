from fastapi import HTTPException, Response
from fastapi.requests import Request
from fastapi.routing import APIRouter
from tortoise.contrib.fastapi import HTTPNotFoundError

from app.schemas import Post as PostSchema
from app.constants import Discord
from postgres.models import Post, PostPydantic, PostPydanticInput, User

router = APIRouter(
    prefix="/posts"
)


@router.get("/toggle_like/{post_id}")
async def toggle_like(request: Request, post_id: int):
    post = await Post.get_or_none(id=post_id).prefetch_related("likes")
    user = await User.get_or_none(user_id=request.state.user_id)
    if not post or not user:
        raise HTTPException(status_code=400, detail=f"Invalid...")
    
    try:
        if user in post.likes.related_objects:
            await post.likes.remove(user)
        else:
            await post.likes.add(user)

        return Response(status_code=200)
    except:
        return Response(status_code=500)

@router.get("/")
async def get_posts(request: Request):
    user = await User.get_or_none(user_id=request.state.user_id)
    if user is None:
        raise HTTPException(status_code=400, detail="Invalid")
    post_data = await Post.all().prefetch_related("user", "likes")
    posts = []
    for data in post_data:
        post = PostSchema(
            user = {
                "user_id":data.user.user_id,
                "username":data.user.username,
                "discriminator": data.user.discriminator,
                "avatar": Discord.AVATAR_URL_FORMAT.format(user_id=data.user.user_id,avatar=data.user.avatar),
            },
            id=data.id,
            title=data.title,
            description=data.description,
            created_at=str(data.created_at)[:10],
            modified_at=str(data.modified_at)[:10],
            likes=data.likes.related_objects,
            liked=user in data.likes.related_objects
        )
        posts.append(post)

    return posts
    # return await PostPydantic.from_queryset(Post.all().prefetch_related("user"))

@router.get("/me")
async def get_posts(request: Request):
    user_id = request.state.user_id
    return await PostPydantic.from_queryset(Post.filter(user_id=user_id))

@router.get("/{post_id}", response_model=PostPydantic)
async def get_post(post_id: int) -> PostPydantic:
    return await PostPydantic.from_queryset_single(Post.get(id=post_id))

@router.post("/", response_model=PostPydantic, responses={404: {"model": HTTPNotFoundError}})
async def create_post(request: Request, post: PostPydanticInput):
    post_obj = await Post.create(**post.dict(exclude_unset=True))
    post_obj.user = await User.get(user_id=request.state.user_id)
    await post_obj.save()
    return await PostPydantic.from_tortoise_orm(post_obj)


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