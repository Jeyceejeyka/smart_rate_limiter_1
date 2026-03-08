package com.jeycee.smart_rate_limiter.controller;

import com.jeycee.smart_rate_limiter.security.JwtUtil;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public String login(@RequestParam String name) {
        return jwtUtil.generateToken(name);
    }
}