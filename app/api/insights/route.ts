import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

interface ActivityLog {
  completed: boolean;
}

function getWeekRange(offset = 0) {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);

  const start = new Date(now.setDate(diff + offset * 7));
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: "No auth" }, { status: 401 });

  const currentWeek = getWeekRange(0);
  const lastWeek = getWeekRange(-1);

  const { data: currentLogs } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", currentWeek.start.toISOString())
    .lte("created_at", currentWeek.end.toISOString());

  const { data: lastLogs } = await supabase
    .from("activity_logs")
    .select("*")
    .eq("user_id", user.id)
    .gte("created_at", lastWeek.start.toISOString())
    .lte("created_at", lastWeek.end.toISOString());

  const currentCompleted = ((currentLogs as ActivityLog[]) ?? []).filter(
    (l) => l.completed,
  ).length;
  const lastCompleted = ((lastLogs as ActivityLog[]) ?? []).filter(
    (l) => l.completed,
  ).length;

  const diff = currentCompleted - lastCompleted;
  const pattern = diff > 2 ? "improving" : diff < -2 ? "declining" : "neutral";

  const message =
    pattern === "improving"
      ? "Vas mejor que la semana pasada 🚀"
      : pattern === "declining"
        ? "Bajaste el ritmo, puedes retomar 💪"
        : "Te mantienes constante 👍";

  return NextResponse.json({
    currentCompleted,
    lastCompleted,
    diff,
    pattern,
    message,
  });
}
