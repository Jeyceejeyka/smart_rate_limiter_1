package com.jeycee.smart_rate_limiter.dto;

public class ClientResponse {

    private String name;
    private int baseLimit;
    private String role;

    public ClientResponse(String name, int baseLimit, String role) {
        this.name = name;
        this.baseLimit = baseLimit;
        this.role = role;
    }

    public String getName() { return name; }
    public int getBaseLimit() { return baseLimit; }
    public String getRole() { return role; }
}