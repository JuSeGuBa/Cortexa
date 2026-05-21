"use client";

import { motion } from "framer-motion";

interface Item {
  id: string;
  title: string;
  content: string | null;
  url: string | null;
  type: string;
  status: string;
  tags: string[];
  created_at: string;
}

interface Props {
  item: Item;
  onDelete: (id: string) => void;
  onEdit: (item: Item) => void;
}

const TYPE_EMOJI: Record<string, string> = {
  note: "📝",
  idea: "💡",
  task: "📌",
  link: "🔗",
  resource: "📚",
  insight: "🧠",
};

const STATUS_COLOR: Record<string, string> = {
  pending: "#f59e0b",
  completed: "#22c55e",
  archived: "#64748b",
};

export function ItemCard({ item, onDelete, onEdit }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      style={{
        background: "#0f172a",
        border: "1px solid #1e293b",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 20 }}>{TYPE_EMOJI[item.type] ?? "📄"}</span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: STATUS_COLOR[item.status] ?? "#94a3b8",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          {item.status}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 600, margin: 0 }}
      >
        {item.title}
      </h3>

      {/* Content */}
      {item.content && (
        <p
          style={{ color: "#94a3b8", fontSize: 13, margin: 0, lineHeight: 1.5 }}
        >
          {item.content.length > 100
            ? item.content.slice(0, 100) + "…"
            : item.content}
        </p>
      )}

      {/* URL */}
      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#0ea5e9", fontSize: 12, wordBreak: "break-all" }}
        >
          {item.url}
        </a>
      )}

      {/* Tags */}
      {item.tags?.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {item.tags.map((tag: string) => (
            <span
              key={tag}
              style={{
                background: "#1e293b",
                color: "#94a3b8",
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 20,
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div
        style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 8 }}
      >
        <button
          onClick={() => onEdit(item)}
          style={{
            flex: 1,
            padding: "6px 0",
            borderRadius: 6,
            border: "1px solid #1e293b",
            background: "transparent",
            color: "#94a3b8",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(item.id)}
          style={{
            flex: 1,
            padding: "6px 0",
            borderRadius: 6,
            border: "1px solid #7f1d1d",
            background: "transparent",
            color: "#ef4444",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  );
}
