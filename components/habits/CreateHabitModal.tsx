"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onClose: () => void;
  onSaved: () => void;
}

const FREQUENCIES = ["daily", "weekly", "monthly"];

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

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 8,
    color: "#f1f5f9",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 16,
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          background: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: 16,
          padding: 28,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h2 style={{ color: "#f1f5f9", margin: 0, fontSize: 20 }}>
          Nuevo hábito
        </h2>

        <div>
          <label
            style={{
              color: "#94a3b8",
              fontSize: 13,
              marginBottom: 6,
              display: "block",
            }}
          >
            Nombre *
          </label>
          <input
            style={inputStyle}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Ejercicio, Meditación..."
          />
        </div>

        <div>
          <label
            style={{
              color: "#94a3b8",
              fontSize: 13,
              marginBottom: 6,
              display: "block",
            }}
          >
            Frecuencia
          </label>
          <select
            style={inputStyle}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 8,
              border: "1px solid #1e293b",
              background: "transparent",
              color: "#94a3b8",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 8,
              border: "none",
              background: "#0ea5e9",
              color: "#fff",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {saving ? "Guardando..." : "Crear"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
