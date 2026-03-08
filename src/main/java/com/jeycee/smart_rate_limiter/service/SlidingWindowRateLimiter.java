package com.jeycee.smart_rate_limiter.service;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class SlidingWindowRateLimiter {

    private final Map<String, ConcurrentLinkedQueue<Long>> requestLogs = new ConcurrentHashMap<>();
    private static final long WINDOW_SIZE_MS = 60_000;

    public boolean allowRequest(String client, int limit) {
        long now = System.currentTimeMillis();

        requestLogs.putIfAbsent(client, new ConcurrentLinkedQueue<>());
        ConcurrentLinkedQueue<Long> timestamps = requestLogs.get(client);

        while (!timestamps.isEmpty() && now - timestamps.peek() > WINDOW_SIZE_MS) {
            timestamps.poll();
        }

        if (timestamps.size() < limit) {
            timestamps.add(now);
            return true;
        }

        return false;
    }
}