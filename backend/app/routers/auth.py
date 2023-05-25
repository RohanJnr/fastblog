import aiohttp
from fastapi.responses import RedirectResponse
from fastapi.routing import APIRouter
from fastapi.requests import Request

from app.constants import DiscordCredentials


router = APIRouter(
    prefix="/auth"
)


@router.get("/discord/authorize")
async def authorize():
    return RedirectResponse(DiscordCredentials.AUTHORIZE_URL)


@router.get("/discord/redirect")
async def discord_redirect(request: Request):
    if code := request.query_params.get("code", None):
        data = {
            'client_id': DiscordCredentials.DISCORD_CLIENT_ID,
            'client_secret': DiscordCredentials.DISCORD_CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': DiscordCredentials.REDIRECT_URI
        }
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        client: aiohttp.ClientSession = request.app.state.aiohttp_client
        if client:
            async with client.post(
                    "https://discord.com/api/oauth2/token",
                    data=data,
                    headers=headers
            ) as response:
                print(response.status)
                return await response.json()

    else:
        return {"error": "no code"}