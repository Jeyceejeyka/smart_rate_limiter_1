"use client";

import HealthBadge from "@/components/HealthBadge";
import { useHealthCheck } from "@/hooks/useHealthCheck";

export default function HealthPage() {
  const { basicHealth, actuatorHealth } = useHealthCheck();

  return (
    <main className="dashboard-shell">
      <header className="hero compact">
        <p className="chip">Smart Rate Limiter</p>
        <h1>Service Health</h1>
        <p>Live health signals from custom and actuator endpoints.</p>
      </header>

      <HealthBadge />

      <section className="panel">
        <h3>/health</h3>
        <pre className="json-box">{JSON.stringify(basicHealth.data?.data ?? null, null, 2)}</pre>
      </section>

      <section className="panel">
        <h3>/actuator/health</h3>
        <pre className="json-box">{JSON.stringify(actuatorHealth.data?.data ?? null, null, 2)}</pre>
      </section>
    </main>
  );
}
