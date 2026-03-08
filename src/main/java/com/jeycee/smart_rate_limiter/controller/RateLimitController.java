package com.jeycee.smart_rate_limiter.controller;

import com.jeycee.smart_rate_limiter.dto.RateLimitResponse;
import com.jeycee.smart_rate_limiter.service.RedisRateLimitService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rate-limit")
public class RateLimitController {

    private final RedisRateLimitService rateLimitService;

    public RateLimitController(RedisRateLimitService rateLimitService) {
        this.rateLimitService = rateLimitService;
    }

    @GetMapping
    public RateLimitResponse checkLimit(HttpServletRequest request) {

        String clientName = (String) request.getAttribute("clientName");

        boolean allowed = rateLimitService.isRequestAllowed(clientName);

        if (allowed) {
            return new RateLimitResponse(true, "Request allowed");
        }

        return new RateLimitResponse(false, "Rate limit exceeded");
    }
}