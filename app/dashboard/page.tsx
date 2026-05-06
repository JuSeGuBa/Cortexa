"use client";

import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Dashboard (Privado)</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
