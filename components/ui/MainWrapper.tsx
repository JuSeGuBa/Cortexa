"use client";

import { usePathname } from "next/navigation";

const NO_SIDEBAR_ROUTES = ["/login", "/register", "/"];

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hasSidebar = !NO_SIDEBAR_ROUTES.includes(pathname);

  return (
    <main style={{
      marginLeft: hasSidebar ? 240 : 0,
      flex: 1, minHeight: "100vh",
      position: "relative", zIndex: 1,
      color: "#f1f5f9",
      transition: "margin-left 0.3s ease",
    }}>
      {children}
    </main>
  );
}