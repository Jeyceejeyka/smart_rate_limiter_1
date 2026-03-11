import type { Metadata } from "next";
import Link from "next/link";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Rate Limiter Dashboard",
  description: "Frontend dashboard for testing and visualizing a Redis-based rate limiter API.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <nav className="top-nav">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/history">History</Link>
            <Link href="/health">Health</Link>
          </nav>
          {children}
        </Providers>
      </body>
    </html>
  );
}
