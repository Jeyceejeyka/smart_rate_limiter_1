package com.jeycee.smart_rate_limiter.service;

import com.jeycee.smart_rate_limiter.exception.ClientAlreadyExistsException;
import com.jeycee.smart_rate_limiter.repository.InMemoryClientRepository;
import org.springframework.stereotype.Service;

@Service
public class RateLimiterService {

    private final InMemoryClientRepository repository;
    private final SlidingWindowRateLimiter rateLimiter;

    public RateLimiterService(InMemoryClientRepository repository,
                              SlidingWindowRateLimiter rateLimiter) {
        this.repository = repository;
        this.rateLimiter = rateLimiter;
    }

    public void registerClient(String clientName, int limit) {
        if (repository.exists(clientName)) {
            throw new ClientAlreadyExistsException("Client already exists");
        }

        repository.save(clientName, limit);
    }

    public boolean allowRequest(String clientName) {
        Integer limit = repository.findLimit(clientName);

        if (limit == null) {
            return false;
        }

        return rateLimiter.allowRequest(clientName, limit);
    }
}