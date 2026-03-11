"use client";

import { useMutation } from "@tanstack/react-query";
import type { ClientRequest, RateLimitResponse } from "@/types/api";
import { normalizeError } from "@/utils/error";
import { useAuthStore } from "@/store/authStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { loginClient } from "@/services/auth.service";
import { createClient } from "@/services/client.service";
import { checkRateLimit } from "@/services/rateLimit.service";
import { ApiClientError } from "@/services/apiClient";

export function useRateLimiter() {
  const { clientName, baseLimit, role, token, setToken } = useAuthStore();
  const { setLastRequest, pushHistory, setError } = useDashboardStore();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const result = await loginClient(clientName);
      setToken(result.data);
      setError(null);
      pushHistory({
        endpoint: "/auth/login",
        method: "POST",
        status: result.status,
        latencyMs: result.latencyMs,
        ok: true,
        blocked: false,
        message: "JWT token issued",
        createdAt: new Date().toISOString(),
        payload: { name: clientName },
        response: { token: `${result.data.slice(0, 24)}...` },
      });
      return result.data;
    },
    onError: (error) => {
      const normalized = normalizeError(error);
      setError(`Login failed: ${normalized.message}`);
    },
  });

  const createClientMutation = useMutation({
    mutationFn: async () => {
      const payload: ClientRequest = { name: clientName, baseLimit, role };
      const result = await createClient(payload, token);
      setError(null);
      pushHistory({
        endpoint: "/clients",
        method: "POST",
        status: result.status,
        latencyMs: result.latencyMs,
        ok: true,
        blocked: false,
        message: "Client profile created",
        createdAt: new Date().toISOString(),
        payload,
        response: result.data,
      });
      return result.data;
    },
    onError: (error) => {
      const normalized = normalizeError(error);
      setError(`Create client failed: ${normalized.message}`);
    },
  });

  const checkLimitMutation = useMutation({
    mutationFn: async () => {
      setLastRequest(null, null, null, true);
      const result = await checkRateLimit(token);
      setLastRequest(result.data, result.status, result.latencyMs, false);
      setError(null);
      pushHistory({
        endpoint: "/rate-limit",
        method: "GET",
        status: result.status,
        latencyMs: result.latencyMs,
        ok: true,
        blocked: !result.data.allowed,
        message: result.data.message,
        createdAt: new Date().toISOString(),
        response: result.data,
      });
      return result.data;
    },
    onError: (error) => {
      const normalized = normalizeError(error);
      const apiError = error as ApiClientError;
      const message = `Rate limit call failed (${normalized.status}): ${normalized.message}`;
      setError(message);
      setLastRequest(
        { allowed: false, message: normalized.message } as RateLimitResponse,
        normalized.status,
        null,
        false,
      );
      pushHistory({
        endpoint: "/rate-limit",
        method: "GET",
        status: normalized.status,
        latencyMs: 0,
        ok: false,
        blocked: false,
        message: normalized.message,
        createdAt: new Date().toISOString(),
        response: apiError?.data,
      });
    },
  });

  return {
    token,
    loginMutation,
    createClientMutation,
    checkLimitMutation,
  };
}
