"use client";

import HealthBadge from "./HealthBadge";
import RequestForm from "./RequestForm";
import RequestCounter from "./RequestCounter";
import RateLimitStatus from "./RateLimitStatus";
import APIResponseViewer from "./APIResponseViewer";
import RequestHistory from "./RequestHistory";
import ErrorBanner from "./ErrorBanner";
import { useDashboardStore } from "@/store/dashboardStore";

export default function Dashboard() {
  const activeError = useDashboardStore((state) => state.activeError);

  return (
    <main className="dashboard-shell">
      <header className="hero">
        <p className="chip">Smart Rate Limiter</p>
        <h1>Developer Traffic Lab</h1>
        <p>
          Visualize request allowance, blocked traffic, and API health in real time against your
          Spring Boot + Redis backend.
        </p>
        <HealthBadge />
      </header>

      <ErrorBanner message={activeError} />
      <RequestForm />

      <section className="grid-two">
        <RateLimitStatus />
        <APIResponseViewer />
      </section>

      <RequestCounter />
      <RequestHistory />
    </main>
  );
}
