# fastblog
A blog built using fastapi and nextjs

## Backend
Backend has been built using FastAPI. Database tables and migrations is being handled by tortoise ORM and aerich (their migrations tool).
Authentication is done using Discord Oauth.

### Requirements
1. Python 3.11
2. Postgres Db or docker
3. nodejs

### Setup
1. Create a discord application at https://discord.com/developers/applications
2. Set the redirect URL to "http://localhost:8000/api/auth/discord/redirect"
3. Generate URL by checking "identify" and "email" scope.

4. Install python packaing by `poetry install`
5. Activate environment `poetry shell`
6. Start your local postgres server or use docker by `docker compose up` in root dir.

### Sample env file
```env
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
REDIRECT_URI="http://localhost:8000/api/auth/discord/redirect"
DATABASE_URL=postgres://fastblog:fastblog@localhost:5000/fastblog
AUTHORIZE_URL=
# openssl rand -hex 32
SECRET_KEY=
```

### Run server
1. Update database schemas by aerich
`aerich upgrade`

2. Start fastAPI Server
`python -m app`


## Frontend

1. install packages with `npm i`
2. Start dev server with `npm run dev`