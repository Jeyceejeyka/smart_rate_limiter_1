import type { RateLimitResponse } from "./api";

export interface DashboardMetrics {
  total: number;
  allowed: number;
  blocked: number;
  failed: number;
}

export interface LastRequestState {
  loading: boolean;
  data: RateLimitResponse | null;
  statusCode: number | null;
  latencyMs: number | null;
}
