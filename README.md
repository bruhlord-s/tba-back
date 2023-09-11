# ✅ Real Time Testing App

API written in NestJS

## Prerequisites

- Docker + docker-compose

## Installation

Copy config files from samples

```
$ make init

// or

$ cp .env.sample .env
$ cp docker-compose.yml.sample docker-compose.yml
```

Start containers

```
$ make up

// or

$ docker-compose up
```

Run migrations

```
$ make migrate

// or

$ docker exec -it api npx prisma migrate dev
```

🎉 Now API Server is running at port `3000`

✅ Swagger is located in `http://localhost:3000/api#/`
