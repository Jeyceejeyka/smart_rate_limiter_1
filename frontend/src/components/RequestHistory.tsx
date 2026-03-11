"use client";

import { useRequestHistory } from "@/hooks/useRequestHistory";
import { formatDateTime } from "@/utils/format";

export default function RequestHistory() {
  const { history } = useRequestHistory();

  return (
    <section className="panel">
      <h3>Request History</h3>
      {history.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Result</th>
                <th>Latency</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry) => (
                <tr key={entry.id}>
                  <td>{formatDateTime(entry.createdAt)}</td>
                  <td>{entry.endpoint}</td>
                  <td>{entry.status}</td>
                  <td>
                    {!entry.ok ? "FAILED" : entry.blocked ? "BLOCKED" : "ALLOWED"}
                  </td>
                  <td>{entry.latencyMs} ms</td>
                  <td>{entry.message ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
