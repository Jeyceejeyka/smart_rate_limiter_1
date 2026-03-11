import { API_BASE_URL } from "@/utils/constants";

export interface ApiResult<T> {
  data: T;
  status: number;
  latencyMs: number;
}

export class ApiClientError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.data = data;
  }
}

function parseBody(raw: string): unknown {
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<ApiResult<T>> {
  const startedAt = performance.now();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  const latencyMs = Math.round(performance.now() - startedAt);
  const rawBody = await response.text();
  const parsedBody = parseBody(rawBody);

  if (!response.ok) {
    const message =
      typeof parsedBody === "object" && parsedBody !== null && "message" in parsedBody
        ? String((parsedBody as { message?: string }).message)
        : `Request failed with status ${response.status}`;

    throw new ApiClientError(response.status, message, parsedBody);
  }

  return {
    data: parsedBody as T,
    status: response.status,
    latencyMs,
  };
}
