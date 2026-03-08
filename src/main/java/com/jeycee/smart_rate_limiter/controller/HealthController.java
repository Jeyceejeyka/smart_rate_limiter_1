package com.jeycee.smart_rate_limiter.controller;

import com.jeycee.smart_rate_limiter.dto.HealthResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public HealthResponse healthCheck(
            @RequestParam(defaultValue = "false") boolean verbose
    ) {
        return new HealthResponse(
                verbose ? "UP - detailed" : "UP",
                System.currentTimeMillis()
        );
    }
}
