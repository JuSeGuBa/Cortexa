"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Item {
  id: string;
  title: string;
  content: string | null;
  url: string | null;
  type: string;
  status: string;
  tags: string[];
}

interface Props {
  editItem: Item | null;
  onClose: () => void;
  onSaved: () => void;
}

const TYPES = ["note", "idea", "task", "link", "resource", "insight"];
const STATUSES = ["pending", "completed", "archived"];

const TYPE_CONFIG: Record<string, { emoji: string; color: string }> = {
  note: { emoji: "📝", color: "#8b5cf6" },
  idea: { emoji: "💡", color: "#f59e0b" },
  task: { emoji: "📌", color: "#0ea5e9" },
  link: { emoji: "🔗", color: "#06b6d4" },
  resource: { emoji: "📚", color: "#10b981" },
  insight: { emoji: "🧠", color: "#f43f5e" },
};

export function CreateItemModal({ editItem, onClose, onSaved }: Props) {
  const [title, setTitle] = useState(editItem?.title ?? "");
  const [content, setContent] = useState(editItem?.content ?? "");
  const [url, setUrl] = useState(editItem?.url ?? "");
  const [type, setType] = useState(editItem?.type ?? "note");
  const [status, setStatus] = useState(editItem?.status ?? "pending");
  const [tags, setTags] = useState(editItem?.tags?.join(", ") ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    if (!title.trim()) return;
    setSaving(true);

    const payload = {
      title,
      content: content || null,
      url: url || null,
      type,
      status,
      tags: tags
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
      ...(editItem ? { id: editItem.id } : {}),
    };

    await fetch("/api/items", {
      method: editItem ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    onSaved();
    onClose();
  }

  const activeColor = TYPE_CONFIG[type]?.color ?? "#6366f1";

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    color: "#f1f5f9",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "var(--font-display), sans-serif",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    color: "#475569",
    fontSize: 11,
    marginBottom: 6,
    display: "block",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    fontFamily: "var(--font-mono)",
  };

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
            border: `1px solid ${activeColor}30`,
            borderRadius: 20,
            padding: 32,
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            boxShadow: `0 0 60px ${activeColor}15, 0 24px 48px rgba(0,0,0,0.5)`,
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
              background: `linear-gradient(90deg, ${activeColor}, transparent)`,
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
              {editItem ? "Editar item" : "Nuevo item"}
            </h2>
            <p
              style={{
                color: "#334155",
                fontSize: 12,
                margin: 0,
                fontFamily: "var(--font-mono)",
              }}
            >
              {editItem
                ? "// modificar elemento existente"
                : "// agregar al brain"}
            </p>
          </div>

          {/* Type selector */}
          <div>
            <label style={labelStyle}>Tipo</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TYPES.map((t) => {
                const conf = TYPE_CONFIG[t];
                const active = type === t;
                return (
                  <motion.button
                    key={t}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => setType(t)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 20,
                      cursor: "pointer",
                      border: `1px solid ${active ? conf.color : "rgba(255,255,255,0.08)"}`,
                      background: active ? `${conf.color}18` : "transparent",
                      color: active ? conf.color : "#475569",
                      fontSize: 12,
                      fontWeight: active ? 600 : 400,
                      textTransform: "capitalize",
                      transition: "all 0.15s",
                    }}
                  >
                    {conf.emoji} {t}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Título *</label>
            <input
              style={inputStyle}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="¿Qué tienes en mente?"
              autoFocus
            />
          </div>

          <div>
            <label style={labelStyle}>Estado</label>
            <div style={{ display: "flex", gap: 8 }}>
              {STATUSES.map((s) => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setStatus(s)}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    borderRadius: 10,
                    cursor: "pointer",
                    border: `1px solid ${status === s ? "#6366f1" : "rgba(255,255,255,0.08)"}`,
                    background:
                      status === s ? "rgba(99,102,241,0.12)" : "transparent",
                    color: status === s ? "#a5b4fc" : "#475569",
                    fontSize: 12,
                    textTransform: "capitalize",
                    transition: "all 0.15s",
                  }}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Contenido</label>
            <textarea
              style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Descripción, notas, ideas..."
            />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>URL</label>
              <input
                style={inputStyle}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Tags</label>
              <input
                style={inputStyle}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="dev, diseño, ideas"
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
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
              whileHover={{ boxShadow: `0 0 30px ${activeColor}50` }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              disabled={saving}
              style={{
                flex: 2,
                padding: "12px 0",
                borderRadius: 12,
                border: "none",
                background: `linear-gradient(135deg, ${activeColor}, ${activeColor}cc)`,
                color: "#fff",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "-0.2px",
                boxShadow: `0 0 20px ${activeColor}30`,
                transition: "all 0.15s",
              }}
            >
              {saving
                ? "Guardando..."
                : editItem
                  ? "Guardar cambios"
                  : "Crear item"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
