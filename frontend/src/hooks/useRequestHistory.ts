"use client";

import { useMemo } from "react";
import { useDashboardStore } from "@/store/dashboardStore";

export function useRequestHistory() {
  const history = useDashboardStore((state) => state.history);

  const allowed = useMemo(
    () => history.filter((entry) => entry.ok && !entry.blocked),
    [history],
  );

  const blocked = useMemo(
    () => history.filter((entry) => entry.ok && entry.blocked),
    [history],
  );

  const failed = useMemo(() => history.filter((entry) => !entry.ok), [history]);

  return {
    history,
    allowed,
    blocked,
    failed,
  };
}
