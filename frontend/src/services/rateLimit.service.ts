import type { RateLimitResponse } from "@/types/api";
import { apiRequest } from "./apiClient";

export async function checkRateLimit(token: string) {
  return apiRequest<RateLimitResponse>("/rate-limit", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
