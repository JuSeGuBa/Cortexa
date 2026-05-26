"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/brain",
    label: "Brain",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M9.5 2a2.5 2.5 0 0 1 2.5 2.5v.5h.5a2.5 2.5 0 0 1 0 5H12v.5a2.5 2.5 0 0 1-5 0V10h-.5a2.5 2.5 0 0 1 0-5H7V4.5A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v.5h-.5a2.5 2.5 0 0 0 0 5H12v.5a2.5 2.5 0 0 0 5 0V10h.5a2.5 2.5 0 0 0 0-5H17V4.5A2.5 2.5 0 0 0 14.5 2z" />
        <path d="M12 13v9" />
        <path d="M8 17H5a2 2 0 0 1-2-2v-1" />
        <path d="M16 17h3a2 2 0 0 0 2-2v-1" />
      </svg>
    ),
  },
  {
    href: "/habits",
    label: "Hábitos",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="M12 6v6l4 2" />
        <circle
          cx="19"
          cy="5"
          r="3"
          fill="currentColor"
          stroke="none"
          opacity="0.5"
        />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        width: 240,
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        background: "linear-gradient(180deg, #0d1424 0%, #080f1e 100%)",
        borderRight: "1px solid rgba(99,102,241,0.15)",
        display: "flex",
        flexDirection: "column",
        padding: "28px 16px",
        zIndex: 50,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: 48, paddingLeft: 8 }}
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
              boxShadow: "0 0 20px rgba(99,102,241,0.4)",
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
        <div
          style={{
            marginTop: 6,
            paddingLeft: 42,
            fontSize: 11,
            color: "#334155",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}
        >
          v1.0 · productivity
        </div>
      </motion.div>

      {/* Nav label */}
      <div
        style={{
          fontSize: 10,
          color: "#334155",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)",
          paddingLeft: 12,
          marginBottom: 8,
        }}
      >
        Navigation
      </div>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV_ITEMS.map(({ href, label, icon }, i) => {
          const active = pathname === href;
          return (
            <motion.div
              key={href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
            >
              <Link href={href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    borderRadius: 10,
                    position: "relative",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    background: active
                      ? "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.1))"
                      : "transparent",
                    border: active
                      ? "1px solid rgba(99,102,241,0.3)"
                      : "1px solid transparent",
                    color: active ? "#a5b4fc" : "#475569",
                    boxShadow: active
                      ? "0 0 20px rgba(99,102,241,0.15)"
                      : "none",
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 3,
                        height: 20,
                        borderRadius: 2,
                        background: "linear-gradient(180deg, #6366f1, #8b5cf6)",
                        boxShadow: "0 0 8px rgba(99,102,241,0.8)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                  <span style={{ opacity: active ? 1 : 0.5 }}>{icon}</span>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: active ? 600 : 400,
                      letterSpacing: "-0.2px",
                    }}
                  >
                    {label}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Bottom status */}
      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            background: "rgba(99,102,241,0.06)",
            border: "1px solid rgba(99,102,241,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22c55e",
                boxShadow: "0 0 6px rgba(34,197,94,0.8)",
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: "#475569",
                fontFamily: "var(--font-mono)",
              }}
            >
              sistema activo
            </span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
