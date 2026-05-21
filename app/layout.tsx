import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cortexa",
  description: "Intelligent Productivity System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={geist.variable}
        style={{
          margin: 0,
          background: "#020617",
          minHeight: "100vh",
          display: "flex",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: 220,
            background: "#0f172a",
            borderRight: "1px solid #1e293b",
            padding: "24px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
          }}
        >
          <div
            style={{
              color: "#f1f5f9",
              fontWeight: 700,
              fontSize: 18,
              marginBottom: 24,
              paddingLeft: 8,
            }}
          >
            🧠 Cortexa
          </div>
          {[
            { href: "/dashboard", label: "📊 Dashboard" },
            { href: "/brain", label: "🧠 Brain" },
            { href: "/habits", label: "🎯 Hábitos" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                color: "#94a3b8",
                textDecoration: "none",
                padding: "10px 12px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                display: "block",
              }}
            >
              {label}
            </Link>
          ))}
        </aside>

        {/* Main content */}
        <main
          style={{
            marginLeft: 220,
            flex: 1,
            minHeight: "100vh",
            color: "#f1f5f9",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
