"use client";

export default function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;

  console.error("[frontend] rendering error banner", { message });

  return (
    <div className="panel error-panel" role="alert" aria-live="polite">
      <strong>Request Error:</strong> {message}
    </div>
  );
}
