"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

const FREQUENCIES = [
  { value: "daily", label: "Diario", emoji: "📅" },
  { value: "weekly", label: "Semanal", emoji: "📆" },
  { value: "monthly", label: "Mensual", emoji: "🗓️" },
];

export function CreateHabitModal({ onClose, onSaved }: Props) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!name.trim()) return;
    setSaving(true);

    await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, frequency }),
    });

    setSaving(false);
    onSaved();
    onClose();
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(2,6,23,0.85)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          padding: 16,
        }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            background: "linear-gradient(145deg, #0d1424, #080f1e)",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: 20,
            padding: 32,
            width: "100%",
            maxWidth: 420,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            boxShadow:
              "0 0 60px rgba(99,102,241,0.12), 0 24px 48px rgba(0,0,0,0.5)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(90deg, #6366f1, #8b5cf6, transparent)",
            }}
          />

          <div>
            <h2
              style={{
                color: "#f1f5f9",
                margin: "0 0 4px",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              Nuevo hábito
            </h2>
            <p
              style={{
                color: "#334155",
                fontSize: 12,
                margin: 0,
                fontFamily: "var(--font-mono)",
              }}
            >
              {"// construye tu rutina ideal"}
            </p>
          </div>

          <div>
            <label
              style={{
                color: "#475569",
                fontSize: 11,
                marginBottom: 8,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
              }}
            >
              Nombre del hábito
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Meditación, Ejercicio, Lectura..."
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                color: "#f1f5f9",
                fontSize: 14,
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "var(--font-display), sans-serif",
              }}
            />
          </div>

          <div>
            <label
              style={{
                color: "#475569",
                fontSize: 11,
                marginBottom: 10,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
              }}
            >
              Frecuencia
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              {FREQUENCIES.map((f) => (
                <motion.button
                  key={f.value}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setFrequency(f.value)}
                  style={{
                    flex: 1,
                    padding: "12px 8px",
                    borderRadius: 12,
                    cursor: "pointer",
                    border: `1px solid ${frequency === f.value ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                    background:
                      frequency === f.value
                        ? "rgba(99,102,241,0.12)"
                        : "transparent",
                    color: frequency === f.value ? "#a5b4fc" : "#475569",
                    fontSize: 12,
                    fontWeight: frequency === f.value ? 600 : 400,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.15s",
                    boxShadow:
                      frequency === f.value
                        ? "0 0 12px rgba(99,102,241,0.2)"
                        : "none",
                  }}
                >
                  <span style={{ fontSize: 20 }}>{f.emoji}</span>
                  <span>{f.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <motion.button
              whileHover={{ background: "rgba(255,255,255,0.06)" }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              style={{
                flex: 1,
                padding: "12px 0",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "transparent",
                color: "#475569",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 500,
                transition: "all 0.15s",
              }}
            >
              Cancelar
            </motion.button>
            <motion.button
              whileHover={{ boxShadow: "0 0 30px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={saving}
              style={{
                flex: 2,
                padding: "12px 0",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                transition: "all 0.15s",
                letterSpacing: "-0.2px",
              }}
            >
              {saving ? "Creando..." : "Crear hábito"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
