# Smart Rate Limiter Frontend

Developer dashboard for testing and visualizing the Spring Boot + Redis rate limiter.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The app proxies API requests through Next route handlers to avoid browser CORS issues.

## Required backend endpoints

- `POST /auth/login?name=...`
- `POST /clients`
- `GET /rate-limit`
- `GET /health`
- `GET /actuator/health`

## Docker

Build and run this service through the project root `docker-compose.yml`.
