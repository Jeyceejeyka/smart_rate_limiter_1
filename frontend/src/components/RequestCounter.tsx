"use client";

import { useAuthStore } from "@/store/authStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { inferRemaining, percent } from "@/utils/format";

export default function RequestCounter() {
  const { role, baseLimit } = useAuthStore();
  const metrics = useDashboardStore((state) => state.metrics);

  const estimatedLimit = role === "PREMIUM" ? baseLimit * 3 : baseLimit;
  const remaining = inferRemaining(metrics.allowed, estimatedLimit);

  return (
    <section className="panel counter-grid">
      <article>
        <h4>Total</h4>
        <p>{metrics.total}</p>
      </article>
      <article>
        <h4>Allowed</h4>
        <p>{metrics.allowed}</p>
      </article>
      <article>
        <h4>Blocked</h4>
        <p>{metrics.blocked}</p>
      </article>
      <article>
        <h4>Failed</h4>
        <p>{metrics.failed}</p>
      </article>
      <article>
        <h4>Estimated Window Limit</h4>
        <p>{estimatedLimit}</p>
      </article>
      <article>
        <h4>Estimated Remaining</h4>
        <p>{remaining}</p>
      </article>
      <article>
        <h4>Pass Rate</h4>
        <p>{percent(metrics.allowed, metrics.total)}</p>
      </article>
    </section>
  );
}
