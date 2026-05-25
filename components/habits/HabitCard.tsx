"use client";

import { motion } from "framer-motion";

interface Habit {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  last_completed: string | null;
  completed?: boolean;
}

interface Props {
  habit: Habit;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

function isCompletedToday(last_completed: string | null): boolean {
  if (!last_completed) return false;
  const today = new Date().toISOString().split("T")[0];
  return last_completed === today;
}

export function HabitCard({ habit, onComplete, onDelete }: Props) {
  const completedToday = isCompletedToday(habit.last_completed);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{
        background: "#0f172a",
        border: `1px solid ${completedToday ? "#22c55e33" : "#1e293b"}`,
        borderRadius: 12,
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Botón completar */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => !completedToday && onComplete(habit.id)}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `2px solid ${completedToday ? "#22c55e" : "#334155"}`,
            background: completedToday ? "#22c55e" : "transparent",
            cursor: completedToday ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {completedToday ? "✓" : ""}
        </motion.button>

        <div>
          <p
            style={{
              color: completedToday ? "#94a3b8" : "#f1f5f9",
              fontSize: 16,
              fontWeight: 600,
              margin: 0,
              textDecoration: completedToday ? "line-through" : "none",
            }}
          >
            {habit.name}
          </p>
          <p
            style={{
              color: "#475569",
              fontSize: 12,
              margin: "4px 0 0",
              textTransform: "capitalize",
            }}
          >
            {habit.frequency}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Streak */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "#f59e0b",
              fontSize: 20,
              fontWeight: 700,
              margin: 0,
            }}
          >
            🔥 {habit.streak ?? 0}
          </p>
          <p style={{ color: "#475569", fontSize: 11, margin: 0 }}>racha</p>
        </div>

        {/* Eliminar */}
        <button
          onClick={() => onDelete(habit.id)}
          style={{
            background: "transparent",
            border: "1px solid #7f1d1d",
            color: "#ef4444",
            borderRadius: 6,
            padding: "6px 10px",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  );
}
