import typing
from socket import AF_INET

import aiohttp
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from fastapi.requests import Request
from starlette.middleware import Middleware
from starlette.middleware.base import BaseHTTPMiddleware
from tortoise.contrib.fastapi import HTTPNotFoundError, register_tortoise
from tortoise import Tortoise

from app.routers import auth, posts
from app.middleware import jwt_auth
from postgres.config import TORTOISE_ORM

load_dotenv()

SIZE_POOL_AIOHTTP = 100


origins = [
    "http://localhost:3000"
]

installed_middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_methods=["*"],
        allow_headers=["*"],
        allow_credentials=True,
    ),
    Middleware(BaseHTTPMiddleware, dispatch=jwt_auth)
]

app = FastAPI(
    middleware=installed_middleware,
)


app.include_router(auth.router, prefix="/api")
app.include_router(posts.router, prefix="/api")


@app.on_event("startup")
async def startup_event():
    connector = aiohttp.TCPConnector(family=AF_INET, limit_per_host=SIZE_POOL_AIOHTTP)
    app.state.aiohttp_client = aiohttp.ClientSession(connector=connector)


@app.on_event("shutdown")
async def startup_event():
    await app.state.aiohttp_client.close()
    app.state.aiohttp_client = None



@app.get("/")
async def root():
    return {"message": "Hello World"}


register_tortoise(
    app,
    config=TORTOISE_ORM
)


def start_server():
    import os
    print(os.getenv("DATABASE_URL"))
    uvicorn.run("app.fastblog:app", reload=True, host="0.0.0.0")

