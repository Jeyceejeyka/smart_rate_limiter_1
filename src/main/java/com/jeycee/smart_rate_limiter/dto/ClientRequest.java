package com.jeycee.smart_rate_limiter.dto;

import com.jeycee.smart_rate_limiter.entity.UserRole;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public class ClientRequest {

    @NotBlank
    private String name;

    @Min(1)
    private int baseLimit;

    private UserRole role;

    public String getName() { return name; }
    public int getBaseLimit() { return baseLimit; }
    public UserRole getRole() { return role; }

    public void setName(String name) { this.name = name; }
    public void setBaseLimit(int baseLimit) { this.baseLimit = baseLimit; }
    public void setRole(UserRole role) { this.role = role; }
}