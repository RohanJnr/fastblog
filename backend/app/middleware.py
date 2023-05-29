import typing as t
from datetime import datetime, timezone

from fastapi import HTTPException, Request, Response
from fastapi.responses import JSONResponse
from jose import jwt, JWTError

from app.constants import Auth
from postgres.models import User


async def jwt_auth(
    request: Request,
    call_next: t.Callable
) -> Response:
    """
    Check for JWT Authentication.
    """
    # print(request.url.path)
    if (
        request.url.path in ["/api/auth/discord/authorize", "/api/auth/discord/redirect", "/api/auth/discord/logout", "/"]
        or request.url.path.startswith("/static/")
    ):
        # Short circuit the authorization route
        return await call_next(request)
    try:
        # Populate the user data in the request
        auth_header = request.headers.get("Authorization")
        # print(auth_header)
        if auth_header is not None:
            _, token = auth_header.split(" ")
        else:
            token = request.cookies.get("token")

        # print(f"GOT TOKEN: {token}")

        if token is None:
            raise HTTPException(status_code=403, detail="No token provided. Please login first!")
        
        request.state.token = token
        try:
            token_data = jwt.decode(token, Auth.SECRET_KEY)
        except JWTError:
            raise HTTPException(status_code=403, detail="Invalid Token!")
        
        user_id = token_data["user_id"]
        user: User | None = await User.get_or_none(user_id=user_id)

        # print(user_id)
        # print(user)

        if user is None:
            raise HTTPException(status_code=403, detail="User does not exist, authorize!")
        # print(user.key_salt, token_data["key_salt"])
        if user.key_salt != token_data["key_salt"]:
            raise HTTPException(status_code=403, detail="Invalid Token, Re-login and try again!")
        
        if int(token_data["expires_at"]) < datetime.now(timezone.utc).timestamp():
            raise HTTPException(status_code=403, detail="Token expired, Re-login and try again!")

        request.state.user_id = user_id

    except HTTPException as e:
        # Convert HTTPExceptions to regular responses
        return JSONResponse(content={"error": e.detail}, status_code=e.status_code)

    return await call_next(request)
