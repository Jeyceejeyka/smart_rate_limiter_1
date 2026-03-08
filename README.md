Smart Rate Limiter

A distributed rate limiting service built using Spring Boot and Redis.
This project demonstrates backend system design concepts such as rate limiting algorithms, JWT authentication, role-based request limits, and containerized deployment using Docker.

The system controls how many requests a client can make within a time window and prevents API abuse.

Features

Distributed rate limiting using Redis

Sliding window style request control

JWT authentication for clients

Role-based rate limits (FREE vs PREMIUM)

Clean layered architecture

Global exception handling

Request tracking using correlation IDs

Dockerized deployment

Health monitoring with Spring Boot Actuator

Integration tests

Architecture Overview
Client Request
      │
      ▼
JWT Authentication Filter
      │
      ▼
RateLimitController
      │
      ▼
RedisRateLimitService
      │
      ▼
Redis (stores request counts with expiration)


Each client has a rate limit based on their role.

Requests are counted in Redis using atomic operations with expiration.

If the limit is exceeded, the request is rejected.

Tech Stack

Backend

Java 17

Spring Boot

Spring Web

Spring Data JPA

Spring Data Redis

Storage

H2 Database (client data)

Redis (rate limiting)

Security

JWT authentication

Testing

Spring Boot Test

MockMvc integration tests

DevOps

Docker

Docker Compose

Project Structure
src/main/java/com/example/ratelimiter

config
 └ RedisConfig.java

controller
 ├ AuthController.java
 ├ ClientController.java
 └ RateLimitController.java

dto
 ├ ClientRequest.java
 ├ ClientResponse.java
 └ RateLimitResponse.java

entity
 ├ Client.java
 └ UserRole.java

exception
 ├ ClientNotFoundException.java
 ├ UnauthorizedException.java
 └ GlobalExceptionHandler.java

repository
 └ ClientRepository.java

security
 ├ JwtFilter.java
 └ JwtUtil.java

service
 ├ ClientService.java
 └ RedisRateLimitService.java

util
 └ RequestIdFilter.java

How Rate Limiting Works

Each client has:

a base request limit

a role

Roles determine how much traffic is allowed.

Example:

Role	Limit
FREE	baseLimit
PREMIUM	baseLimit × 3

Redis stores request counters using:

rate_limit:<clientName>


The counter automatically resets after the window expires.

API Endpoints
Create Client

POST /clients

Example request:

{
  "name": "clientA",
  "baseLimit": 5,
  "role": "FREE"
}


Response:

{
  "name": "clientA",
  "baseLimit": 5,
  "role": "FREE"
}

Login (Generate JWT)

POST /auth/login?name=clientA

Response:

<jwt_token>

Check Rate Limit

GET /rate-limit

Header:

Authorization: Bearer <token>


Example response:

Allowed:

{
  "allowed": true,
  "message": "Request allowed"
}


Blocked:

{
  "allowed": false,
  "message": "Rate limit exceeded"
}

Running Locally
1 Start Redis
docker run -d -p 6379:6379 redis

2 Run Spring Boot App
mvn spring-boot:run


Application runs on:

http://localhost:8081

Run with Docker
Build the project
mvn clean package

Build Docker image
docker build -t smart-rate-limiter .

Run container
docker run -p 8081:8081 smart-rate-limiter

Run with Docker Compose (Recommended)

Start Redis + App together:

docker compose up --build


Stop:

docker compose down

Health Check
GET /actuator/health


Example:

{
  "status": "UP"
}

Integration Tests

Integration tests validate:

client creation

JWT authentication

rate limit enforcement

Run tests:

mvn test

Future Improvements

Possible extensions:

Redis cluster support

Advanced sliding window using Redis sorted sets

API gateway integration

Prometheus monitoring

CI/CD pipeline

Load testing

What This Project Demonstrates

This project demonstrates knowledge of:

Backend architecture

Distributed system constraints

API protection techniques

Stateless authentication

Containerized deployment

Clean code organization

Author

Backend project built for learning Spring Boot, distributed systems concepts, and API security.

License

MIT License