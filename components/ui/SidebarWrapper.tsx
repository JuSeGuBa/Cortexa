"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

const NO_SIDEBAR_ROUTES = ["/login", "/register", "/"];

export function SidebarWrapper() {
  const pathname = usePathname();
  const showSidebar = !NO_SIDEBAR_ROUTES.includes(pathname);
  return showSidebar ? <Sidebar /> : null;
}
