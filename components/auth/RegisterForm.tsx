"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Si el email no requiere confirmación, redirige directo
    if (data.session) {
      router.push("/dashboard");
      return;
    }

    // Si requiere confirmación de email
    setSuccess(true);
    setLoading(false);
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

  if (success) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            textAlign: "center",
            padding: 48,
            background: "linear-gradient(145deg, #0d1424, #080f1e)",
            border: "1px solid rgba(34,197,94,0.25)",
            borderRadius: 24,
            maxWidth: 400,
            boxShadow: "0 0 60px rgba(34,197,94,0.08)",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
          <h2
            style={{
              color: "#f1f5f9",
              margin: "0 0 12px",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Revisa tu email
          </h2>
          <p
            style={{
              color: "#475569",
              fontSize: 14,
              margin: "0 0 28px",
              lineHeight: 1.6,
            }}
          >
            Te enviamos un link de confirmación a{" "}
            <span style={{ color: "#a5b4fc" }}>{email}</span>
          </p>
          <Link href="/login">
            <motion.button
              whileHover={{ boxShadow: "0 0 24px rgba(99,102,241,0.4)" }}
              style={{
                padding: "12px 32px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Ir al login →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

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
            "radial-gradient(circle, rgba(99,102,241,0.1), transparent 70%)",
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
          maxWidth: 420,
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
              fontSize: 24,
              fontWeight: 700,
              margin: "0 0 6px",
              letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #f1f5f9, #94a3b8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Crear cuenta
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
            {"// únete a Cortexa"}
          </p>
        </motion.div>

        <form
          onSubmit={handleRegister}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          <div>
            <label style={labelStyle}>Email</label>
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
            <label style={labelStyle}>Contraseña</label>
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <div>
            <label style={labelStyle}>Confirmar contraseña</label>
            <input
              type="password"
              style={inputStyle}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repite tu contraseña"
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
            {loading ? "Creando cuenta..." : "Crear cuenta →"}
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
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            style={{
              color: "#6366f1",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Inicia sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
