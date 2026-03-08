package com.jeycee.smart_rate_limiter.service;

import com.jeycee.smart_rate_limiter.entity.Client;
import com.jeycee.smart_rate_limiter.entity.UserRole;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class RedisRateLimitService {

    private final StringRedisTemplate redisTemplate;
    private final ClientService clientService;

    private static final long WINDOW_SECONDS = 60;

    public RedisRateLimitService(StringRedisTemplate redisTemplate,
                                 ClientService clientService) {
        this.redisTemplate = redisTemplate;
        this.clientService = clientService;
    }

    public boolean isRequestAllowed(String clientName) {

        Client client = clientService.getClientByName(clientName);

        String redisKey = "rate_limit:" + clientName;

        Long currentCount = redisTemplate.opsForValue().increment(redisKey);

        if (currentCount == 1) {
            redisTemplate.expire(redisKey, WINDOW_SECONDS, TimeUnit.SECONDS);
        }

        int allowedLimit = calculateLimit(client);

        return currentCount <= allowedLimit;
    }

    private int calculateLimit(Client client) {

        if (client.getRole() == UserRole.PREMIUM) {
            return client.getBaseLimit() * 3;
        }

        return client.getBaseLimit();
    }
}