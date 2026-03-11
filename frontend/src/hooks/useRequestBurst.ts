"use client";

import { useState } from "react";
import { useRateLimiter } from "./useRateLimiter";

function delay(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function useRequestBurst() {
  const { checkLimitMutation } = useRateLimiter();
  const [running, setRunning] = useState(false);

  const runBurst = async (count: number, spacingMs = 80) => {
    setRunning(true);
    try {
      for (let i = 0; i < count; i += 1) {
        // Sequential requests intentionally emulate realistic traffic flow.
        await checkLimitMutation.mutateAsync();
        if (i < count - 1) {
          await delay(spacingMs);
        }
      }
    } finally {
      setRunning(false);
    }
  };

  return {
    runBurst,
    running,
  };
}
