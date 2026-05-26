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

const TYPE_CONFIG: Record<string, { emoji: string; color: string }> = {
  note: { emoji: "📝", color: "#8b5cf6" },
  idea: { emoji: "💡", color: "#f59e0b" },
  task: { emoji: "📌", color: "#0ea5e9" },
  link: { emoji: "🔗", color: "#06b6d4" },
  resource: { emoji: "📚", color: "#10b981" },
  insight: { emoji: "🧠", color: "#f43f5e" },
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: "pendiente", color: "#f59e0b" },
  completed: { label: "completado", color: "#22c55e" },
  archived: { label: "archivado", color: "#475569" },
};

export function ItemCard({ item, onDelete, onEdit }: Props) {
  const typeConf = TYPE_CONFIG[item.type] ?? { emoji: "📄", color: "#6366f1" };
  const statusConf = STATUS_CONFIG[item.status] ?? {
    label: item.status,
    color: "#475569",
  };

  return (
    <motion.div
      whileHover={{ y: -4, borderColor: `${typeConf.color}40` }}
      style={{
        background: "linear-gradient(145deg, #0d1424, #080f1e)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.2s, transform 0.2s",
        height: "100%",
      }}
    >
      {/* Glow accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${typeConf.color}80, transparent)`,
          borderRadius: "16px 16px 0 0",
        }}
      />

      {/* Top row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${typeConf.color}15`,
            border: `1px solid ${typeConf.color}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
          }}
        >
          {typeConf.emoji}
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: statusConf.color,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-mono)",
            background: `${statusConf.color}15`,
            padding: "3px 8px",
            borderRadius: 20,
            border: `1px solid ${statusConf.color}30`,
          }}
        >
          {statusConf.label}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          color: "#e2e8f0",
          fontSize: 15,
          fontWeight: 600,
          margin: 0,
          letterSpacing: "-0.3px",
          lineHeight: 1.4,
        }}
      >
        {item.title}
      </h3>

      {/* Content */}
      {item.content && (
        <p
          style={{
            color: "#475569",
            fontSize: 13,
            margin: 0,
            lineHeight: 1.6,
            flex: 1,
          }}
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
          style={{
            color: typeConf.color,
            fontSize: 12,
            wordBreak: "break-all",
            opacity: 0.8,
            textDecoration: "none",
          }}
        >
          {"↗ " + item.url.replace(/^https?:\/\//, "").slice(0, 40)}
        </a>
      )}

      {/* Tags */}
      {item.tags?.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {item.tags.map((tag: string) => (
            <span
              key={tag}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#475569",
                fontSize: 11,
                padding: "2px 8px",
                borderRadius: 20,
                fontFamily: "var(--font-mono)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      <div
        style={{ display: "flex", gap: 8, marginTop: "auto", paddingTop: 4 }}
      >
        <motion.button
          whileHover={{ background: "rgba(99,102,241,0.15)" }}
          onClick={() => onEdit(item)}
          style={{
            flex: 1,
            padding: "8px 0",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent",
            color: "#64748b",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            transition: "all 0.15s",
          }}
        >
          Editar
        </motion.button>
        <motion.button
          whileHover={{
            background: "rgba(239,68,68,0.1)",
            borderColor: "rgba(239,68,68,0.4)",
          }}
          onClick={() => onDelete(item.id)}
          style={{
            flex: 1,
            padding: "8px 0",
            borderRadius: 8,
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
      </div>
    </motion.div>
  );
}
