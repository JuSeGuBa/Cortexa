"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

  const labelStyle = {
    color: "#94a3b8",
    fontSize: 13,
    marginBottom: 6,
    display: "block",
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
          maxWidth: 480,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h2 style={{ color: "#f1f5f9", margin: 0, fontSize: 20 }}>
          {editItem ? "Editar item" : "Nuevo item"}
        </h2>

        <div>
          <label style={labelStyle}>Título *</label>
          <input
            style={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
          />
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Tipo</label>
            <select
              style={inputStyle}
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Estado</label>
            <select
              style={inputStyle}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
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

        <div>
          <label style={labelStyle}>URL (opcional)</label>
          <input
            style={inputStyle}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label style={labelStyle}>Tags (separados por coma)</label>
          <input
            style={inputStyle}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="productividad, diseño, dev"
          />
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
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
            {saving ? "Guardando..." : editItem ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
