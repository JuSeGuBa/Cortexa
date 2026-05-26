"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HabitCard } from "@/components/habits/HabitCard";
import { CreateHabitModal } from "@/components/habits/CreateHabitModal";

interface Habit {
  id: string;
  name: string;
  frequency: string;
  streak: number;
  last_completed: string | null;
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function loadHabits() {
    const res = await fetch("/api/habits");
    const data = await res.json();
    setHabits(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    let cancelled = false;
    async function fetchHabits() {
      const res = await fetch("/api/habits");
      const data = await res.json();
      if (!cancelled) {
        setHabits(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    }
    fetchHabits();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleComplete(id: string) {
    await fetch("/api/habits", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed: true }),
    });
    loadHabits();
  }

  async function handleDelete(id: string) {
    await fetch("/api/habits", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setHabits((prev) => prev.filter((h) => h.id !== id));
  }

  const today = new Date().toISOString().split("T")[0];
  const completedToday = habits.filter(
    (h) => h.last_completed === today,
  ).length;
  const progress =
    habits.length > 0 ? (completedToday / habits.length) * 100 : 0;

  return (
    <div style={{ padding: "40px 40px 80px", maxWidth: 800 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ marginBottom: 40 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
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
              {completedToday} / {habits.length} completados hoy
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
              Hábitos
            </h1>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            style={{
              padding: "12px 24px",
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              boxShadow: "0 0 24px rgba(99,102,241,0.4)",
            }}
          >
            + Nuevo
          </motion.button>
        </div>

        {/* Progress bar */}
        {habits.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ marginTop: 24 }}
          >
            <div
              style={{
                height: 4,
                borderRadius: 4,
                background: "rgba(255,255,255,0.06)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                style={{
                  height: "100%",
                  borderRadius: 4,
                  background:
                    progress === 100
                      ? "linear-gradient(90deg, #22c55e, #16a34a)"
                      : "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  boxShadow:
                    progress === 100
                      ? "0 0 8px rgba(34,197,94,0.6)"
                      : "0 0 8px rgba(99,102,241,0.6)",
                }}
              />
            </div>
            <p
              style={{
                fontSize: 11,
                color: "#334155",
                margin: "8px 0 0",
                fontFamily: "var(--font-mono)",
              }}
            >
              {Math.round(progress)}% completado
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Lista */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 72,
                borderRadius: 14,
                background: "rgba(255,255,255,0.03)",
                opacity: 1 - i * 0.25,
              }}
            />
          ))}
        </div>
      ) : habits.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", paddingTop: 80 }}
        >
          <p style={{ fontSize: 48, margin: "0 0 16px" }}>🎯</p>
          <p
            style={{
              color: "#334155",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          >
            {"// no hay hábitos aún"}
          </p>
        </motion.div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <AnimatePresence>
            {habits.map((habit, i) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.06, ease: "easeOut" }}
              >
                <HabitCard
                  habit={habit}
                  onComplete={handleComplete}
                  onDelete={handleDelete}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {showModal && (
        <CreateHabitModal
          onClose={() => setShowModal(false)}
          onSaved={loadHabits}
        />
      )}
    </div>
  );
}
