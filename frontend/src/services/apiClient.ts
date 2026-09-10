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
  const url = `${API_BASE_URL}${path}`;

  console.debug("[apiRequest] starting request", {
    url,
    method: init.method ?? "GET",
    headers: init.headers,
    bodyPreview: typeof init.body === "string" ? init.body.slice(0, 200) : null,
  });

  try {
    const response = await fetch(url, {
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

    console.debug("[apiRequest] response received", {
      url,
      status: response.status,
      ok: response.ok,
      latencyMs,
      body: parsedBody,
    });

    if (!response.ok) {
      const message =
        typeof parsedBody === "object" && parsedBody !== null && "message" in parsedBody
          ? String((parsedBody as { message?: string }).message)
          : `Request failed with status ${response.status}`;

      console.error("[apiRequest] request failed", {
        url,
        status: response.status,
        message,
        body: parsedBody,
      });

      throw new ApiClientError(response.status, message, parsedBody);
    }

    return {
      data: parsedBody as T,
      status: response.status,
      latencyMs,
    };
  } catch (error) {
    console.error("[apiRequest] unexpected fetch error", {
      url,
      error,
    });
    throw error;
  }
}
