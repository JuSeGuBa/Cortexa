"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  created_at: string;
  habits?: { name: string };
  items?: { title: string };
}

const ACTION_CONFIG: Record<
  string,
  { label: (log: ActivityLog) => string; color: string; icon: string }
> = {
  completed_habit: {
    label: (log) => `Completaste "${log.habits?.name ?? "hábito"}"`,
    color: "#22c55e",
    icon: "✓",
  },
  created_habit: {
    label: (log) => `Creaste el hábito "${log.habits?.name ?? ""}"`,
    color: "#6366f1",
    icon: "+",
  },
  created_item: {
    label: (log) => `Guardaste "${log.items?.title ?? "item"}" en Brain`,
    color: "#8b5cf6",
    icon: "◆",
  },
  completed_item: {
    label: (log) => `Completaste "${log.items?.title ?? "item"}"`,
    color: "#0ea5e9",
    icon: "✓",
  },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `${days}d`;
  if (hrs > 0) return `${hrs}h`;
  return `${mins}m`;
}

export function ActivityFeed() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/activity?limit=10")
      .then((res) => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) setLogs(data as ActivityLog[]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              height: 48,
              borderRadius: 8,
              background: "rgba(255,255,255,0.03)",
              opacity: 1 - i * 0.2,
            }}
          />
        ))}
      </div>
    );

  if (logs.length === 0)
    return (
      <p
        style={{
          color: "#334155",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
        }}
      >
        {"// sin actividad registrada aún"}
      </p>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <AnimatePresence>
        {logs.map((log, i) => {
          const config = ACTION_CONFIG[log.action];
          const color = config?.color ?? "#475569";
          const icon = config?.icon ?? "·";
          const label = config?.label(log) ?? "Acción registrada";

          return (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 16px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  flexShrink: 0,
                  background: `${color}18`,
                  border: `1px solid ${color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {icon}
              </div>
              <span style={{ flex: 1, color: "#94a3b8", fontSize: 13 }}>
                {label}
              </span>
              <span
                style={{
                  color: "#334155",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  flexShrink: 0,
                }}
              >
                {timeAgo(log.created_at)}
              </span>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
