import type { ErrorResponse } from "@/types/api";

export interface NormalizedError {
  status: number;
  message: string;
  timestamp?: string;
}

export function normalizeError(err: unknown): NormalizedError {
  if (typeof err === "object" && err !== null) {
    const maybe = err as {
      status?: number;
      message?: string;
      data?: ErrorResponse;
    };

    if (typeof maybe.status === "number") {
      const message = maybe.data?.message ?? maybe.message ?? "Request failed";
      return {
        status: maybe.status,
        message,
        timestamp: maybe.data?.timestamp,
      };
    }
  }

  return {
    status: 500,
    message: "Unexpected client-side error",
  };
}
