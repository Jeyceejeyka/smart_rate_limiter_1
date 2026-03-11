"use client";

import { useDashboardStore } from "@/store/dashboardStore";
import { formatLatency } from "@/utils/format";

export default function RateLimitStatus() {
  const lastRequest = useDashboardStore((state) => state.lastRequest);

  const tone =
    lastRequest.loading
      ? "pending"
      : lastRequest.data?.allowed
        ? "success"
        : "danger";

  const label =
    lastRequest.loading
      ? "Sending..."
      : lastRequest.data?.allowed
        ? "ALLOWED"
        : "BLOCKED";

  return (
    <section className={`panel status-panel ${tone}`}>
      <h3>Rate Limit Status</h3>
      <p className="status-label">{label}</p>
      <p>{lastRequest.data?.message ?? "No request sent yet."}</p>
      <p>Status Code: {lastRequest.statusCode ?? "-"}</p>
      <p>Latency: {formatLatency(lastRequest.latencyMs)}</p>
    </section>
  );
}
