"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

interface Insights {
  message: string;
  currentCompleted: number;
  lastCompleted: number;
  diff: number;
}

interface MetricCardProps {
  title: string;
  value: number | string;
}

export default function DashboardPage() {
  const [insights, setInsights] = useState<Insights | null>(null);

  useEffect(() => {
    fetch("/api/insights")
      .then((res) => res.json())
      .then((data: Insights) => setInsights(data));
  }, []);

  if (!insights) return <p>Cargando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          padding: 20,
          border: "1px solid #1e293b",
          marginBottom: 20,
          borderRadius: 8,
        }}
      >
        <h2 style={{ color: "#f1f5f9" }}>{insights.message}</h2>
      </motion.div>

      <div style={{ display: "flex", gap: 20 }}>
        <MetricCard title="Esta semana" value={insights.currentCompleted} />
        <MetricCard title="Semana pasada" value={insights.lastCompleted} />
        <MetricCard title="Diferencia" value={insights.diff} />
      </div>

      <Heatmap />
      <ActivityFeed />
    </div>
  );
}

function MetricCard({ title, value }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        padding: 20,
        border: "1px solid #1e293b",
        flex: 1,
        borderRadius: 8,
        background: "#0f172a",
      }}
    >
      <h4 style={{ color: "#94a3b8", margin: 0 }}>{title}</h4>
      <p
        style={{
          color: "#f1f5f9",
          fontSize: 28,
          fontWeight: 700,
          margin: "8px 0 0",
        }}
      >
        {value}
      </p>
    </motion.div>
  );
}
