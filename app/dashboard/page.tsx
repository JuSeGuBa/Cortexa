"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

interface Insights {
  message: string;
  currentCompleted: number;
  lastCompleted: number;
  diff: number;
  pattern: string;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function DashboardPage() {
  const [insights, setInsights] = useState<Insights | null>(null);

  useEffect(() => {
    fetch("/api/insights")
      .then((res) => res.json())
      .then((data: Insights) => setInsights(data));
  }, []);

  return (
    <div style={{ padding: "40px 40px 80px", maxWidth: 1100 }}>
      {/* Header */}
      <motion.div {...fadeUp(0)} style={{ marginBottom: 40 }}>
        <p
          style={{
            fontSize: 12,
            color: "#4f46e5",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
            margin: "0 0 8px",
          }}
        >
          {new Date().toLocaleDateString("es-CO", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </p>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-1px",
            background: "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Dashboard
        </h1>
      </motion.div>

      {/* Insight hero */}
      {insights && (
        <motion.div {...fadeUp(0.1)} style={{ marginBottom: 32 }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 20,
              padding: "32px 36px",
              background:
                "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)",
              border: "1px solid rgba(99,102,241,0.25)",
              boxShadow: "0 0 60px rgba(99,102,241,0.08)",
            }}
          >
            {/* glow blob */}
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                background:
                  "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                fontSize: 11,
                color: "#6366f1",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                marginBottom: 12,
              }}
            >
              ⚡ insight del sistema
            </div>
            <p
              style={{
                fontSize: 26,
                fontWeight: 600,
                margin: 0,
                color: "#e2e8f0",
                letterSpacing: "-0.5px",
                lineHeight: 1.3,
              }}
            >
              {insights.message}
            </p>
          </div>
        </motion.div>
      )}

      {/* Metric cards */}
      <motion.div
        {...fadeUp(0.2)}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {[
          {
            label: "Esta semana",
            value: insights?.currentCompleted ?? "—",
            accent: "#6366f1",
          },
          {
            label: "Semana pasada",
            value: insights?.lastCompleted ?? "—",
            accent: "#8b5cf6",
          },
          {
            label: "Diferencia",
            value: insights
              ? insights.diff > 0
                ? `+${insights.diff}`
                : insights.diff
              : "—",
            accent: insights?.diff && insights.diff > 0 ? "#22c55e" : "#f59e0b",
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            style={{
              padding: "28px 28px 24px",
              borderRadius: 16,
              background: "linear-gradient(145deg, #0d1424, #080f1e)",
              border: "1px solid rgba(255,255,255,0.06)",
              position: "relative",
              overflow: "hidden",
              cursor: "default",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: -20,
                right: -20,
                width: 100,
                height: 100,
                background: `radial-gradient(circle, ${card.accent}18, transparent 70%)`,
                borderRadius: "50%",
              }}
            />
            <p
              style={{
                fontSize: 11,
                color: "#334155",
                margin: "0 0 16px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                fontSize: 48,
                fontWeight: 700,
                margin: 0,
                letterSpacing: "-2px",
                lineHeight: 1,
                color: card.accent,
                fontFamily: "var(--font-mono)",
                textShadow: `0 0 30px ${card.accent}40`,
              }}
            >
              {card.value}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Heatmap */}
      <motion.div {...fadeUp(0.4)} style={{ marginBottom: 40 }}>
        <SectionLabel>Actividad</SectionLabel>
        <div
          style={{
            padding: "28px 28px",
            borderRadius: 16,
            background: "linear-gradient(145deg, #0d1424, #080f1e)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Heatmap />
        </div>
      </motion.div>

      {/* Activity feed */}
      <motion.div {...fadeUp(0.5)}>
        <SectionLabel>Actividad reciente</SectionLabel>
        <div
          style={{
            padding: "28px 28px",
            borderRadius: 16,
            background: "linear-gradient(145deg, #0d1424, #080f1e)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <ActivityFeed />
        </div>
      </motion.div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        color: "#334155",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        fontFamily: "var(--font-mono)",
        marginBottom: 12,
        paddingLeft: 4,
      }}
    >
      {children}
    </div>
  );
}
