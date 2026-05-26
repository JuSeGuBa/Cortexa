"use client";

import { motion, type MotionProps } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

const FEATURES = [
  {
    icon: "🧠",
    title: "Brain",
    desc: "Captura notas, ideas, tareas y recursos en un solo lugar. Tu memoria externa.",
    color: "#8b5cf6",
  },
  {
    icon: "🎯",
    title: "Hábitos",
    desc: "Construye rutinas con seguimiento de rachas. Visualiza tu progreso diario.",
    color: "#6366f1",
  },
  {
    icon: "⚡",
    title: "Insights",
    desc: "El sistema analiza tu actividad y genera insights automáticos sobre tu productividad.",
    color: "#0ea5e9",
  },
  {
    icon: "📊",
    title: "Dashboard",
    desc: "Heatmap de actividad, métricas semanales y feed en tiempo real.",
    color: "#10b981",
  },
];

const STACK = [
  "Next.js",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Framer Motion",
  "Zustand",
];

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "#f1f5f9",
        overflowX: "hidden",
        fontFamily: "var(--font-display), sans-serif",
      }}
    >
      {/* Ambient background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "20%",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            width: 400,
            height: 400,
            background:
              "radial-gradient(circle, rgba(139,92,246,0.07), transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            left: "60%",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(14,165,233,0.06), transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "20px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(2,6,23,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              boxShadow: "0 0 16px rgba(99,102,241,0.4)",
            }}
          >
            ⚡
          </div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Cortexa
          </span>
        </div>
        {/* 
        <Link href="/login">
          <motion.button
            whileHover={{ boxShadow: "0 0 24px rgba(99,102,241,0.5)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "10px 24px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "-0.2px",
            }}
          >
            Entrar →
          </motion.button>
        </Link> */}
      </motion.nav>

      {/* Hero */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <motion.div {...fadeUp(0.1)}>
            <span
              style={{
                display: "inline-block",
                fontSize: 11,
                color: "#6366f1",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontFamily: "var(--font-mono)",
                background: "rgba(99,102,241,0.1)",
                border: "1px solid rgba(99,102,241,0.25)",
                padding: "6px 16px",
                borderRadius: 20,
                marginBottom: 32,
              }}
            >
              ⚡ Intelligent Productivity System
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            style={{
              fontSize: "clamp(48px, 8vw, 80px)",
              fontWeight: 800,
              margin: "0 0 24px",
              letterSpacing: "-3px",
              lineHeight: 1.05,
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 50%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tu segundo
            </span>
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              cerebro digital
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            style={{
              fontSize: 18,
              color: "#64748b",
              margin: "0 0 48px",
              lineHeight: 1.7,
              maxWidth: 520,
              marginInline: "auto",
            }}
          >
            Organiza tu información, construye hábitos y recibe insights
            automáticos basados en tu comportamiento real.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/login">
              <motion.button
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 0 40px rgba(99,102,241,0.6)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "16px 36px",
                  borderRadius: 14,
                  border: "none",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: "-0.3px",
                  boxShadow: "0 0 30px rgba(99,102,241,0.4)",
                }}
              >
                Empezar gratis →
              </motion.button>
            </Link>
            {/* <Link href="/dashboard">
              <motion.button
                whileHover={{
                  borderColor: "rgba(99,102,241,0.5)",
                  background: "rgba(99,102,241,0.06)",
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "16px 36px",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "#94a3b8",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "-0.3px",
                  transition: "all 0.2s",
                }}
              >
                Ver dashboard
              </motion.button>
            </Link> */}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "80px 48px 120px",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 64 }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#4f46e5",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              marginBottom: 16,
            }}
          >
            Funcionalidades
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-1.5px",
              background: "linear-gradient(135deg, #f1f5f9, #64748b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Todo lo que necesitas
          </h2>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, borderColor: `${f.color}40` }}
              style={{
                padding: "28px 24px",
                background: "linear-gradient(145deg, #0d1424, #080f1e)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 18,
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: `linear-gradient(90deg, ${f.color}80, transparent)`,
                }}
              />
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  margin: "0 0 10px",
                  color: "#e2e8f0",
                  letterSpacing: "-0.3px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "#475569",
                  fontSize: 14,
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section
        style={{
          padding: "0 48px 80px",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            padding: "40px",
            borderRadius: 20,
            background: "linear-gradient(145deg, #0d1424, #080f1e)",
            border: "1px solid rgba(99,102,241,0.15)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#334155",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              marginBottom: 24,
            }}
          >
            Built with
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {STACK.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  padding: "8px 18px",
                  borderRadius: 20,
                  background: "rgba(99,102,241,0.08)",
                  border: "1px solid rgba(99,102,241,0.2)",
                  color: "#a5b4fc",
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "0 48px 120px",
          maxWidth: 700,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              margin: "0 0 20px",
              letterSpacing: "-2px",
              background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Empieza hoy
          </h2>
          <p
            style={{
              color: "#475569",
              fontSize: 16,
              margin: "0 0 40px",
              lineHeight: 1.7,
            }}
          >
            Organiza tu mente, construye hábitos y alcanza tu máximo potencial.
          </p>
          <Link href="/login">
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 50px rgba(99,102,241,0.6)",
              }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "18px 48px",
                borderRadius: 14,
                border: "none",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                fontSize: 17,
                fontWeight: 700,
                cursor: "pointer",
                letterSpacing: "-0.3px",
                boxShadow: "0 0 40px rgba(99,102,241,0.35)",
              }}
            >
              Acceder a Cortexa →
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.04)",
          padding: "24px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "#1e293b",
            fontFamily: "var(--font-mono)",
          }}
        >
          © 2025 Cortexa
        </span>
        <span
          style={{
            fontSize: 12,
            color: "#1e293b",
            fontFamily: "var(--font-mono)",
          }}
        >
          {"// built with Next.js + Supabase"}
        </span>
      </footer>
    </div>
  );
}
