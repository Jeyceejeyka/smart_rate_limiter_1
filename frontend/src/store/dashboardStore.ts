import { create } from "zustand";
import type { LastRequestState, DashboardMetrics } from "@/types/ui";
import type { RequestLogEntry, RateLimitResponse } from "@/types/api";

interface DashboardState {
  metrics: DashboardMetrics;
  history: RequestLogEntry[];
  lastRequest: LastRequestState;
  activeError: string | null;
  setError: (message: string | null) => void;
  setLastRequest: (data: RateLimitResponse | null, statusCode: number | null, latencyMs: number | null, loading: boolean) => void;
  pushHistory: (entry: Omit<RequestLogEntry, "id">) => void;
  resetHistory: () => void;
}

const initialMetrics: DashboardMetrics = {
  total: 0,
  allowed: 0,
  blocked: 0,
  failed: 0,
};

export const useDashboardStore = create<DashboardState>((set) => ({
  metrics: initialMetrics,
  history: [],
  lastRequest: {
    loading: false,
    data: null,
    statusCode: null,
    latencyMs: null,
  },
  activeError: null,
  setError: (activeError) => set({ activeError }),
  setLastRequest: (data, statusCode, latencyMs, loading) =>
    set({
      lastRequest: {
        data,
        statusCode,
        latencyMs,
        loading,
      },
    }),
  pushHistory: (entry) =>
    set((state) => {
      const nextMetrics = { ...state.metrics, total: state.metrics.total + 1 };

      if (!entry.ok) {
        nextMetrics.failed += 1;
      } else if (entry.blocked) {
        nextMetrics.blocked += 1;
      } else {
        nextMetrics.allowed += 1;
      }

      return {
        history: [
          {
            ...entry,
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          },
          ...state.history,
        ].slice(0, 120),
        metrics: nextMetrics,
      };
    }),
  resetHistory: () =>
    set({
      history: [],
      metrics: initialMetrics,
      lastRequest: {
        loading: false,
        data: null,
        statusCode: null,
        latencyMs: null,
      },
      activeError: null,
    }),
}));
