package com.jeycee.smart_rate_limiter.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ClientNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, Object> handleClientNotFound(ClientNotFoundException ex) {
        return buildError(ex.getMessage(), 404);
    }

    @ExceptionHandler(UnauthorizedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, Object> handleUnauthorized(UnauthorizedException ex) {
        return buildError(ex.getMessage(), 401);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, Object> handleGeneralError(Exception ex) {
        return buildError("Unexpected error", 500);
    }

    private Map<String, Object> buildError(String message, int status) {
        Map<String, Object> error = new HashMap<>();
        error.put("message", message);
        error.put("status", status);
        error.put("timestamp", Instant.now());
        return error;
    }
}