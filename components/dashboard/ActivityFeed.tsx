"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  created_at: string;
  habits?: { name: string };
  items?: { title: string };
}

function getLabel(log: ActivityLog): string {
  if (log.action === "completed_habit" && log.habits?.name)
    return `Completaste el hábito "${log.habits.name}"`;
  if (log.action === "created_item" && log.items?.title)
    return `Creaste "${log.items.title}"`;
  if (log.action === "completed_item" && log.items?.title)
    return `Completaste "${log.items.title}"`;
  return "Acción registrada";
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  if (days > 0) return `hace ${days}d`;
  if (hrs > 0) return `hace ${hrs}h`;
  return `hace ${mins}m`;
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

  return (
    <div style={{ marginTop: 32 }}>
      <h4 style={{ color: "#94a3b8", marginBottom: 12, fontSize: 14 }}>
        Actividad reciente
      </h4>
      {loading ? (
        <p style={{ color: "#475569" }}>Cargando...</p>
      ) : logs.length === 0 ? (
        <p style={{ color: "#475569" }}>Sin actividad reciente.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {logs.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: "12px 16px",
                background: "#0f172a",
                borderRadius: 8,
                border: "1px solid #1e293b",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "#cbd5e1", fontSize: 14 }}>
                {getLabel(log)}
              </span>
              <span style={{ color: "#475569", fontSize: 12 }}>
                {timeAgo(log.created_at)}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
