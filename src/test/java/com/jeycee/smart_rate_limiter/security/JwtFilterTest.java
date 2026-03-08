package com.jeycee.smart_rate_limiter.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.assertj.core.api.Assertions.assertThat;
class JwtFilterTest {

    private JwtUtil jwtUtil;

    private JwtFilter jwtFilter;

    @BeforeEach
    void setUp() {
        jwtUtil = new JwtUtil("thisIsSimpleSecretKeyForJwtDemoOnly123456", 3600000);
        jwtFilter = new JwtFilter(jwtUtil);
    }

    @Test
    void shouldReturnUnauthorizedWhenProtectedRouteHasNoToken() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/rate-limit");
        MockHttpServletResponse response = new MockHttpServletResponse();
        TrackingFilterChain filterChain = new TrackingFilterChain();

        jwtFilter.doFilter(request, response, filterChain);

        assertThat(response.getStatus()).isEqualTo(401);
        assertThat(response.getContentAsString()).contains("Missing or invalid token");
        assertThat(filterChain.called).isFalse();
    }

    @Test
    void shouldAllowAuthRouteWithoutToken() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/auth/login");
        MockHttpServletResponse response = new MockHttpServletResponse();
        TrackingFilterChain filterChain = new TrackingFilterChain();

        jwtFilter.doFilter(request, response, filterChain);

        assertThat(filterChain.called).isTrue();
        assertThat(filterChain.request).isSameAs(request);
        assertThat(filterChain.response).isSameAs(response);
    }

    @Test
    void shouldAllowRootWithoutToken() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/");
        MockHttpServletResponse response = new MockHttpServletResponse();
        TrackingFilterChain filterChain = new TrackingFilterChain();

        jwtFilter.doFilter(request, response, filterChain);

        assertThat(filterChain.called).isTrue();
    }

    @Test
    void shouldAllowHealthWithoutToken() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/health");
        MockHttpServletResponse response = new MockHttpServletResponse();
        TrackingFilterChain filterChain = new TrackingFilterChain();

        jwtFilter.doFilter(request, response, filterChain);

        assertThat(filterChain.called).isTrue();
    }

    @Test
    void shouldSetClientNameAndContinueForValidToken() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/rate-limit");
        String token = jwtUtil.generateToken("client-a");
        request.addHeader("Authorization", "Bearer " + token);
        MockHttpServletResponse response = new MockHttpServletResponse();
        TrackingFilterChain filterChain = new TrackingFilterChain();

        jwtFilter.doFilter(request, response, filterChain);

        assertThat(request.getAttribute("clientName")).isEqualTo("client-a");
        assertThat(filterChain.called).isTrue();
    }

    @Test
    void shouldReturnUnauthorizedWhenTokenIsInvalid() throws Exception {
        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/rate-limit");
        request.addHeader("Authorization", "Bearer bad-token");
        MockHttpServletResponse response = new MockHttpServletResponse();
        TrackingFilterChain filterChain = new TrackingFilterChain();

        jwtFilter.doFilter(request, response, filterChain);

        assertThat(response.getStatus()).isEqualTo(401);
        assertThat(response.getContentAsString()).contains("Invalid or expired token");
        assertThat(filterChain.called).isFalse();
    }

    private static class TrackingFilterChain implements FilterChain {

        private boolean called;
        private ServletRequest request;
        private ServletResponse response;

        @Override
        public void doFilter(ServletRequest request, ServletResponse response) {
            called = true;
            this.request = request;
            this.response = response;
        }
    }
}
