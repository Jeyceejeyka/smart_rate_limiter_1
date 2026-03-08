package com.jeycee.smart_rate_limiter.repository;

import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class InMemoryClientRepository {

    private final Map<String, Integer> clientLimits = new ConcurrentHashMap<>();

    public void save(String clientName, int limit) {
        clientLimits.put(clientName, limit);
    }

    public boolean exists(String clientName) {
        return clientLimits.containsKey(clientName);
    }

    public Integer findLimit(String clientName) {
        return clientLimits.get(clientName);
    }
}