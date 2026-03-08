package com.jeycee.smart_rate_limiter.security;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Set;

@Component
public class JwtFilter implements Filter {

    private static final Set<String> PUBLIC_PATHS = Set.of("/", "/health", "/error", "/favicon.ico");
    private static final String AUTH_PREFIX = "/auth";
    private static final String ACTUATOR_PREFIX = "/actuator";
    private static final String MISSING_TOKEN_MESSAGE = "Missing or invalid token";
    private static final String INVALID_TOKEN_MESSAGE = "Invalid or expired token";

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        if (isPublicRequest(httpRequest)) {
            chain.doFilter(request, response);
            return;
        }

        String authHeader = httpRequest.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            writeUnauthorizedResponse(httpResponse, MISSING_TOKEN_MESSAGE);
            return;
        }

        String token = authHeader.substring(7).trim();
        if (token.isEmpty()) {
            writeUnauthorizedResponse(httpResponse, MISSING_TOKEN_MESSAGE);
            return;
        }

        try {
            String clientName = jwtUtil.extractClientName(token);
            request.setAttribute("clientName", clientName);
        } catch (JwtException | IllegalArgumentException ex) {
            writeUnauthorizedResponse(httpResponse, INVALID_TOKEN_MESSAGE);
            return;
        }

        chain.doFilter(request, response);
    }

    private boolean isPublicRequest(HttpServletRequest request) {
        String uri = request.getRequestURI();
        return "OPTIONS".equalsIgnoreCase(request.getMethod())
                || PUBLIC_PATHS.contains(uri)
                || uri.startsWith(AUTH_PREFIX)
                || uri.startsWith(ACTUATOR_PREFIX);
    }

    private void writeUnauthorizedResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        response.getWriter().write(
                "{\"message\":\"" + message + "\",\"status\":401,\"timestamp\":\"" + Instant.now() + "\"}"
        );
    }
}
