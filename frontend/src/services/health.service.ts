import type { HealthResponse } from "@/types/api";
import { apiRequest } from "./apiClient";

export async function fetchHealth(verbose = true) {
  return apiRequest<HealthResponse>(`/health?verbose=${verbose}`);
}

export async function fetchActuatorHealth() {
  return apiRequest<{ status: string }>("/actuator/health");
}
