import secrets
from datetime import datetime, timezone

from httpx import AsyncClient
from fastapi.responses import Response, RedirectResponse
from fastapi.routing import APIRouter
from fastapi.requests import Request
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer

from app.constants import Auth, Discord
from postgres.models import User, UserPydantic


router = APIRouter(
    prefix="/auth"
)


@router.get("/test")
async def testing(response: Response):
    response.set_cookie(key="token", value="fake-cookie-session-value")
    return {"message": "Come to the dark side, we have cookies"}

@router.get("/discord/logout")
async def logout() -> RedirectResponse:
    redirect = RedirectResponse("http://localhost:3000")
    redirect.delete_cookie(
        key="token",
        httponly=True,
    )

    return redirect 

@router.get("/discord/authorize")
async def authorize() -> RedirectResponse:
    return RedirectResponse(Discord.AUTHORIZE_URL)


@router.get("/discord/redirect")
async def discord_redirect(code: str):
    """Handle discord oauth callback URL with access code."""
    async with AsyncClient() as client:
        data = {
            'client_id': Discord.DISCORD_CLIENT_ID,
            'client_secret': Discord.DISCORD_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': Discord.REDIRECT_URI
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        auth_details = await client.post("https://discord.com/api/oauth2/token", data=data, headers=headers)
        auth_details.raise_for_status()

        access_token = auth_details.json()["access_token"]
        auth_headers = {"Authorization": f"Bearer {access_token}"}
        
        # Get discord user details
        user = await client.get(Discord.DISCORD_USER_DETAILS_URL, headers=auth_headers)
        user.raise_for_status()
        
        user_data = user.json()
        print(user_data)
        user_id = user_data["id"]
        username = user_data["username"]
        avatar = user_data["avatar"]
        discriminator = user_data["discriminator"]
        
        user = await User.get_or_none(user_id=user_id)
        key_salt = secrets.token_urlsafe(16)

        
        if user:
            user.key_salt = key_salt
            user.username = username
            user.avatar = avatar
            user.discriminator = discriminator
            await user.save()
        else:
            # New user, persist to DB.
            user = User(
                user_id=user_id,
                username=username,
                avatar=avatar,
                discriminator=discriminator,
                key_salt=key_salt
            )
            await user.save()
        
        expires_at = datetime.now(timezone.utc) + Auth.TOKEN_EXPIRES_IN_DAYS_TIMEDELTA

        token = jwt.encode(
            {
                "user_id": user.user_id,
                "key_salt": user.key_salt,
                "expires_at": expires_at.timestamp()
            },
            Auth.SECRET_KEY,
            Auth.ALGORITHM
        )
    print(token)
    redirect = RedirectResponse("http://localhost:3000")
    redirect.set_cookie(
        key="token",
        value=token,
        httponly=True,
        max_age=30 * 24 * 60 * 60 * 1000,  # 30 days
    )

    return redirect


@router.get("/me")
async def get_user(request: Request):
    user_id = request.state.user_id
    return await UserPydantic.from_queryset_single(User.get(user_id=user_id)) 