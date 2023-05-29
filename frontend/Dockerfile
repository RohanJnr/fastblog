FROM node:20-alpine
# NOT OPTIMIZED !!!! just for testing
COPY frontend/package.json frontend/package-lock.json ./

WORKDIR /app
RUN npm i
COPY ./frontend .
# RUN npm run build  -- skip for dev ()

EXPOSE 3000
