package com.jeycee.smart_rate_limiter.entity;

import jakarta.persistence.*;

@Entity
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private int baseLimit;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    public Client() {
    }

    public Client(String name, int baseLimit, UserRole role) {
        this.name = name;
        this.baseLimit = baseLimit;
        this.role = role;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public int getBaseLimit() { return baseLimit; }
    public UserRole getRole() { return role; }

    public void setName(String name) { this.name = name; }
    public void setBaseLimit(int baseLimit) { this.baseLimit = baseLimit; }
    public void setRole(UserRole role) { this.role = role; }
}
