package com.jeycee.smart_rate_limiter.dto;

public class RateLimitResponse {

    private boolean allowed;
    private String message;

    public RateLimitResponse(boolean allowed, String message) {
        this.allowed = allowed;
        this.message = message;
    }

    public boolean isAllowed() { return allowed; }
    public String getMessage() { return message; }
}