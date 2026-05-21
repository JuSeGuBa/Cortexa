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

async function fetchItems(): Promise<Item[]> {
  const res = await fetch("/api/items");
  return res.json();
}

export default function BrainPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    const data = await fetchItems();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    let ignore = false;

    fetchItems().then((data) => {
      if (ignore) {
        return;
      }

      setItems(data);
      setLoading(false);
    });

    return () => {
      ignore = true;
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
        <h1
          style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 700, margin: 0 }}
        >
          🧠 Brain
        </h1>
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

      {/* Filtros */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}
      >
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border: "1px solid",
              borderColor: filter === t ? "#0ea5e9" : "#1e293b",
              background: filter === t ? "#0ea5e9" : "transparent",
              color: filter === t ? "#fff" : "#94a3b8",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <p style={{ color: "#475569" }}>Cargando...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "#475569" }}>No hay items aún.</p>
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
            {filtered.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Modal */}
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
