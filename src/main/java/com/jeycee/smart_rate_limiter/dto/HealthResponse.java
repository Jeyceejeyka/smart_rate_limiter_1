package com.jeycee.smart_rate_limiter.dto;

public class HealthResponse {

    private String status;
    private long timestamp;

    public HealthResponse(String status, long timestamp) {
        this.status = status;
        this.timestamp = timestamp;
    }

    public String getStatus() {
        return status;
    }

    public long getTimestamp() {
        return timestamp;
    }
}
