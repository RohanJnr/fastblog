import typing as t

from fastapi import HTTPException, Request, Response


async def jwt_auth(
    request: Request,
    call_next: t.Callable
) -> Response:
    """
    Check for JWT Authentication.
    """
    try:
        # Populate the user data in the request
        cookies = request.cookies
        token = cookies.get("token")
        
        request.state.token = token

    except HTTPException as e:
        # Convert HTTPExceptions to regular responses
        return Response(e.detail, e.status_code)

    return await call_next(request)
