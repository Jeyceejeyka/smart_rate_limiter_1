"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useDashboardStore } from "@/store/dashboardStore";
import { DEFAULT_BURST_COUNT } from "@/utils/constants";
import { useRateLimiter } from "@/hooks/useRateLimiter";
import { useRequestBurst } from "@/hooks/useRequestBurst";

export default function RequestForm() {
  const {
    clientName,
    baseLimit,
    role,
    token,
    setClientName,
    setBaseLimit,
    setRole,
    clearSession,
  } = useAuthStore();

  const resetHistory = useDashboardStore((state) => state.resetHistory);
  const { loginMutation, createClientMutation, checkLimitMutation } = useRateLimiter();
  const { runBurst, running } = useRequestBurst();

  const [burstCount, setBurstCount] = useState(DEFAULT_BURST_COUNT);

  return (
    <section className="panel form-panel">
      <h3>Rate Limiter Control Panel</h3>
      <div className="form-grid">
        <label>
          Client Name
          <input
            value={clientName}
            onChange={(event) => setClientName(event.target.value)}
            placeholder="clientA"
          />
        </label>

        <label>
          Base Limit
          <input
            type="number"
            min={1}
            value={baseLimit}
            onChange={(event) => setBaseLimit(Number(event.target.value) || 1)}
          />
        </label>

        <label>
          Role
          <select
            value={role}
            onChange={(event) => setRole(event.target.value as "FREE" | "PREMIUM")}
          >
            <option value="FREE">FREE</option>
            <option value="PREMIUM">PREMIUM</option>
          </select>
        </label>

        <label>
          Burst Count
          <input
            type="number"
            min={1}
            value={burstCount}
            onChange={(event) => setBurstCount(Number(event.target.value) || 1)}
          />
        </label>
      </div>

      <div className="button-row">
        <button onClick={() => loginMutation.mutate()} disabled={loginMutation.isPending}>
          1) Login / Get JWT
        </button>
        <button
          onClick={() => createClientMutation.mutate()}
          disabled={!token || createClientMutation.isPending}
        >
          2) Create Client
        </button>
        <button
          onClick={() => checkLimitMutation.mutate()}
          disabled={!token || checkLimitMutation.isPending || running}
        >
          3) Send Single Request
        </button>
        <button
          onClick={() => runBurst(burstCount)}
          disabled={!token || checkLimitMutation.isPending || running}
        >
          4) Run Burst Test
        </button>
        <button
          onClick={() => {
            resetHistory();
          }}
        >
          Reset Metrics
        </button>
        <button
          onClick={() => {
            clearSession();
            resetHistory();
          }}
        >
          Clear Session
        </button>
      </div>

      <p className="token-note">
        Token: {token ? `${token.slice(0, 36)}...` : "No token yet"}
      </p>
      <p className="hint">
        Backend flow alignment: login first to get JWT, then create client, then test `/rate-limit`.
      </p>
    </section>
  );
}
