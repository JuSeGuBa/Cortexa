"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DayActivity {
  date: string;
  count: number;
}

function getColor(count: number): string {
  if (count === 0) return "#1a1a2e";
  if (count === 1) return "#1e3a5f";
  if (count === 2) return "#1a6b8a";
  if (count === 3) return "#0ea5e9";
  return "#38bdf8";
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
      <div style={{ height: 100, background: "#1a1a2e", borderRadius: 8 }} />
    );

  return (
    <div style={{ marginTop: 32 }}>
      <h4 style={{ color: "#94a3b8", marginBottom: 12, fontSize: 14 }}>
        Actividad — últimas 12 semanas
      </h4>
      <div style={{ display: "flex", gap: 4 }}>
        {weeks.map((week, wi) => (
          <div
            key={wi}
            style={{ display: "flex", flexDirection: "column", gap: 4 }}
          >
            {week.map((day) => (
              <motion.div
                key={day.date}
                title={`${day.date}: ${day.count} acciones`}
                whileHover={{ scale: 1.4 }}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 3,
                  background: getColor(day.count),
                  cursor: "default",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
