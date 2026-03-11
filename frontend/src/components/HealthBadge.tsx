"use client";

import { useHealthCheck } from "@/hooks/useHealthCheck";

export default function HealthBadge() {
  const { basicHealth, actuatorHealth } = useHealthCheck();

  const basicStatus = basicHealth.data?.data.status ?? "loading";
  const actuatorStatus = actuatorHealth.data?.data.status ?? "loading";

  const allHealthy = basicStatus.startsWith("UP") && actuatorStatus === "UP";

  return (
    <div className={`health-badge ${allHealthy ? "healthy" : "warning"}`}>
      <span>API: {basicStatus}</span>
      <span>Actuator: {actuatorStatus}</span>
    </div>
  );
}
