"use client";

import RequestHistory from "@/components/RequestHistory";
import RequestCounter from "@/components/RequestCounter";

export default function HistoryPage() {
  return (
    <main className="dashboard-shell">
      <header className="hero compact">
        <p className="chip">Smart Rate Limiter</p>
        <h1>Request History</h1>
        <p>Inspect traffic events captured during load and burst tests.</p>
      </header>
      <RequestCounter />
      <RequestHistory />
    </main>
  );
}
