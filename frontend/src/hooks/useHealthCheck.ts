"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchActuatorHealth, fetchHealth } from "@/services/health.service";

export function useHealthCheck() {
  const basicHealth = useQuery({
    queryKey: ["health", "basic"],
    queryFn: () => fetchHealth(true),
    refetchInterval: 15_000,
  });

  const actuatorHealth = useQuery({
    queryKey: ["health", "actuator"],
    queryFn: () => fetchActuatorHealth(),
    refetchInterval: 15_000,
  });

  return {
    basicHealth,
    actuatorHealth,
  };
}
