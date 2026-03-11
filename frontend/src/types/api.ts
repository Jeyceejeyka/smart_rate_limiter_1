export type UserRole = "FREE" | "PREMIUM";

export interface ClientRequest {
  name: string;
  baseLimit: number;
  role: UserRole;
}

export interface ClientResponse {
  name: string;
  baseLimit: number;
  role: UserRole;
}

export interface RateLimitResponse {
  allowed: boolean;
  message: string;
}

export interface HealthResponse {
  status: string;
  timestamp: number;
}

export interface ErrorResponse {
  message: string;
  status: number;
  timestamp: string;
}

export interface RequestLogEntry {
  id: string;
  endpoint: string;
  method: string;
  status: number;
  latencyMs: number;
  ok: boolean;
  blocked: boolean;
  message?: string;
  createdAt: string;
  payload?: unknown;
  response?: unknown;
}
