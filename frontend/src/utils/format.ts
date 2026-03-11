export function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleString();
}

export function formatLatency(ms: number | null): string {
  if (ms === null) return "-";
  return `${ms} ms`;
}

export function percent(numerator: number, denominator: number): string {
  if (denominator === 0) return "0%";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

export function inferRemaining(allowed: number, estimatedLimit: number): number {
  const remaining = estimatedLimit - allowed;
  return remaining > 0 ? remaining : 0;
}
