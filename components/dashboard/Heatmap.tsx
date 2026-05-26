"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DayActivity {
  date: string;
  count: number;
}

function getColor(count: number): string {
  if (count === 0) return "rgba(255,255,255,0.04)";
  if (count === 1) return "rgba(99,102,241,0.3)";
  if (count === 2) return "rgba(99,102,241,0.55)";
  if (count === 3) return "rgba(99,102,241,0.75)";
  return "#6366f1";
}

function getLast12Weeks(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 83; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
}

export function Heatmap() {
  const [data, setData] = useState<DayActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<{
    date: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/activity")
      .then((res) => res.json())
      .then((logs: unknown) => {
        if (!Array.isArray(logs)) return;
        const days = getLast12Weeks();
        const counts: Record<string, number> = {};
        days.forEach((d) => (counts[d] = 0));
        (logs as { created_at: string }[]).forEach((log) => {
          const date = log.created_at.split("T")[0];
          if (counts[date] !== undefined) counts[date]++;
        });
        setData(days.map((date) => ({ date, count: counts[date] })));
      })
      .finally(() => setLoading(false));
  }, []);

  const weeks: DayActivity[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  if (loading)
    return (
      <div
        style={{
          height: 120,
          borderRadius: 8,
          background: "rgba(255,255,255,0.03)",
          animation: "pulse 2s infinite",
        }}
      />
    );

  return (
    <div>
      <div style={{ display: "flex", gap: 4, position: "relative" }}>
        {weeks.map((week, wi) => (
          <div
            key={wi}
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            {week.map((day) => (
              <motion.div
                key={day.date}
                onHoverStart={() => setTooltip(day)}
                onHoverEnd={() => setTooltip(null)}
                whileHover={{ scale: 1.5, zIndex: 10 }}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: getColor(day.count),
                  cursor: "default",
                  border:
                    day.count > 0
                      ? "1px solid rgba(99,102,241,0.3)"
                      : "1px solid rgba(255,255,255,0.04)",
                  boxShadow:
                    day.count > 2 ? "0 0 6px rgba(99,102,241,0.5)" : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
      {tooltip && (
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: "#6366f1",
            fontFamily: "var(--font-mono)",
          }}
        >
          {tooltip.date} · {tooltip.count} acciones
        </div>
      )}
      <div
        style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16 }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#334155",
            fontFamily: "var(--font-mono)",
          }}
        >
          menos
        </span>
        {[0, 1, 2, 3, 4].map((v) => (
          <div
            key={v}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: getColor(v),
            }}
          />
        ))}
        <span
          style={{
            fontSize: 11,
            color: "#334155",
            fontFamily: "var(--font-mono)",
          }}
        >
          más
        </span>
      </div>
    </div>
  );
}
