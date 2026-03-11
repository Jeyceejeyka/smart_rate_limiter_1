"use client";

import { useDashboardStore } from "@/store/dashboardStore";

export default function APIResponseViewer() {
  const history = useDashboardStore((state) => state.history);
  const latest = history[0];

  return (
    <section className="panel">
      <h3>Latest API Response</h3>
      {latest ? (
        <pre className="json-box">{JSON.stringify(latest.response, null, 2)}</pre>
      ) : (
        <p>No responses captured yet.</p>
      )}
    </section>
  );
}
