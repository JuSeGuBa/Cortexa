"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ItemCard } from "@/components/brain/ItemCard";
import { CreateItemModal } from "@/components/brain/CreateItemModal";

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

const TYPES = ["all", "note", "idea", "task", "link", "resource", "insight"];

const TYPE_COLORS: Record<string, string> = {
  all: "#6366f1",
  note: "#8b5cf6",
  idea: "#f59e0b",
  task: "#0ea5e9",
  link: "#06b6d4",
  resource: "#10b981",
  insight: "#f43f5e",
};

export default function BrainPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);

  const loadItems = useCallback(async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function fetchItems() {
      const res = await fetch("/api/items");
      const data = await res.json();
      if (!cancelled) {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    }
    fetchItems();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete(id: string) {
    await fetch("/api/items", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleEdit(item: Item) {
    setEditItem(item);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setEditItem(null);
  }

  const filtered =
    filter === "all" ? items : items.filter((i) => i.type === filter);

  return (
    <div style={{ padding: "40px 40px 80px", maxWidth: 1100 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          marginBottom: 40,
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
            {items.length} elementos guardados
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
            Brain
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
            letterSpacing: "-0.2px",
          }}
        >
          + Nuevo
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}
      >
        {TYPES.map((t) => {
          const active = filter === t;
          const color = TYPE_COLORS[t] ?? "#6366f1";
          return (
            <motion.button
              key={t}
              onClick={() => setFilter(t)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "7px 16px",
                borderRadius: 20,
                cursor: "pointer",
                border: `1px solid ${active ? color : "rgba(255,255,255,0.06)"}`,
                background: active ? `${color}18` : "transparent",
                color: active ? color : "#475569",
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                textTransform: "capitalize",
                transition: "all 0.15s ease",
                boxShadow: active ? `0 0 12px ${color}20` : "none",
              }}
            >
              {t}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Grid */}
      {loading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 160,
                borderRadius: 16,
                background: "rgba(255,255,255,0.03)",
                opacity: 1 - i * 0.2,
              }}
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ textAlign: "center", paddingTop: 80 }}
        >
          <p style={{ fontSize: 48, margin: "0 0 16px" }}>🧠</p>
          <p
            style={{
              color: "#334155",
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          >
            {"// sin elementos en esta categoría"}
          </p>
        </motion.div>
      ) : (
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          <AnimatePresence>
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, ease: "easeOut" }}
              >
                <ItemCard
                  item={item}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {showModal && (
        <CreateItemModal
          editItem={editItem}
          onClose={handleCloseModal}
          onSaved={loadItems}
        />
      )}
    </div>
  );
}
