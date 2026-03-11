"use client";

export default function ErrorBanner({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="panel error-panel" role="alert" aria-live="polite">
      <strong>Request Error:</strong> {message}
    </div>
  );
}
