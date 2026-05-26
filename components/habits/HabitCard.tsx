"use client";

import { motion } from "framer-motion";

interface Habit {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  last_completed: string | null;
}

interface Props {
  habit: Habit;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const FREQ_LABEL: Record<string, string> = {
  daily: "diario",
  weekly: "semanal",
  monthly: "mensual",
};

export function HabitCard({ habit, onComplete, onDelete }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const completedToday = habit.last_completed === today;

  return (
    <motion.div
      whileHover={{ x: 4 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 20px",
        borderRadius: 14,
        background: completedToday
          ? "linear-gradient(135deg, rgba(34,197,94,0.06), rgba(34,197,94,0.02))"
          : "linear-gradient(145deg, #0d1424, #080f1e)",
        border: `1px solid ${completedToday ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left accent */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: completedToday
            ? "linear-gradient(180deg, #22c55e, #16a34a)"
            : "linear-gradient(180deg, #6366f1, #8b5cf6)",
          borderRadius: "14px 0 0 14px",
          opacity: completedToday ? 1 : 0.4,
        }}
      />

      {/* Check button */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => !completedToday && onComplete(habit.id)}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          flexShrink: 0,
          border: `2px solid ${completedToday ? "#22c55e" : "rgba(99,102,241,0.4)"}`,
          background: completedToday
            ? "linear-gradient(135deg, #22c55e, #16a34a)"
            : "rgba(99,102,241,0.06)",
          cursor: completedToday ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: "#fff",
          boxShadow: completedToday ? "0 0 12px rgba(34,197,94,0.4)" : "none",
          transition: "all 0.2s",
        }}
      >
        {completedToday ? "✓" : ""}
      </motion.button>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <p
          style={{
            color: completedToday ? "#64748b" : "#e2e8f0",
            fontSize: 15,
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-0.3px",
            textDecoration: completedToday ? "line-through" : "none",
          }}
        >
          {habit.name}
        </p>
        <p
          style={{
            color: "#334155",
            fontSize: 11,
            margin: "3px 0 0",
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {FREQ_LABEL[habit.frequency] ?? habit.frequency}
        </p>
      </div>

      {/* Streak */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 20,
            lineHeight: 1,
            filter:
              habit.streak > 0
                ? "drop-shadow(0 0 6px rgba(245,158,11,0.6))"
                : "none",
          }}
        >
          🔥
        </div>
        <span
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: habit.streak > 0 ? "#f59e0b" : "#334155",
            fontFamily: "var(--font-mono)",
            lineHeight: 1,
          }}
        >
          {habit.streak}
        </span>
      </motion.div>

      {/* Delete */}
      <motion.button
        whileHover={{
          background: "rgba(239,68,68,0.1)",
          borderColor: "rgba(239,68,68,0.4)",
        }}
        onClick={() => onDelete(habit.id)}
        style={{
          padding: "6px 12px",
          borderRadius: 8,
          flexShrink: 0,
          border: "1px solid rgba(239,68,68,0.2)",
          background: "transparent",
          color: "#ef4444",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 500,
          transition: "all 0.15s",
        }}
      >
        Eliminar
      </motion.button>
    </motion.div>
  );
}
