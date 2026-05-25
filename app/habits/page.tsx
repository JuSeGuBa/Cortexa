"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
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
    setLoading(true);
    const res = await fetch("/api/habits");
    const data = await res.json();
    setHabits(Array.isArray(data) ? data : []);
    setLoading(false);
  }
  useEffect(() => {
    let cancelled = false;

    async function fetchHabits() {
      setLoading(true);
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

  const completedToday = habits.filter(
    (h) => h.last_completed === new Date().toISOString().split("T")[0],
  ).length;

  return (
    <div style={{ padding: 24 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              color: "#f1f5f9",
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
            }}
          >
            🎯 Hábitos
          </h1>
          <p style={{ color: "#475569", fontSize: 14, margin: "4px 0 0" }}>
            {completedToday} de {habits.length} completados hoy
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "#0ea5e9",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          + Nuevo
        </button>
      </div>

      {/* Lista */}
      {loading ? (
        <p style={{ color: "#475569" }}>Cargando...</p>
      ) : habits.length === 0 ? (
        <p style={{ color: "#475569" }}>No tienes hábitos aún. ¡Crea uno!</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <AnimatePresence>
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onComplete={handleComplete}
                onDelete={handleDelete}
              />
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
