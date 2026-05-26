"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) {
      router.push("/dashboard");
    } else {
      setError(error.message);
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "13px 16px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    color: "#f1f5f9",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "var(--font-display), sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#020617",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "20%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 40,
          background: "linear-gradient(145deg, #0d1424, #080f1e)",
          border: "1px solid rgba(99,102,241,0.2)",
          borderRadius: 24,
          position: "relative",
          overflow: "hidden",
          boxShadow:
            "0 0 80px rgba(99,102,241,0.1), 0 32px 64px rgba(0,0,0,0.5)",
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
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, transparent)",
          }}
        />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              margin: "0 auto 16px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              boxShadow: "0 0 30px rgba(99,102,241,0.5)",
            }}
          >
            ⚡
          </div>
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              margin: "0 0 6px",
              letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Cortexa
          </h1>
          <p
            style={{
              color: "#334155",
              fontSize: 12,
              margin: 0,
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.1em",
            }}
          >
            {"// intelligent productivity system"}
          </p>
        </motion.div>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div>
            <label
              style={{
                color: "#475569",
                fontSize: 11,
                marginBottom: 6,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
              }}
            >
              Email
            </label>
            <input
              type="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label
              style={{
                color: "#475569",
                fontSize: 11,
                marginBottom: 6,
                display: "block",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: "var(--font-mono)",
              }}
            >
              Password
            </label>
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: "#ef4444",
                fontSize: 12,
                margin: 0,
                padding: "10px 14px",
                borderRadius: 8,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.2)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ boxShadow: "0 0 40px rgba(99,102,241,0.6)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 12,
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.2px",
              marginTop: 4,
              boxShadow: "0 0 24px rgba(99,102,241,0.35)",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.15s",
            }}
          >
            {loading ? "Entrando..." : "Entrar al sistema"}
          </motion.button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: 24,
            color: "#334155",
            fontSize: 13,
          }}
        >
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            style={{
              color: "#6366f1",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Regístrate
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
