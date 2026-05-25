import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabase
    .from("habits")
    .insert({ ...body, user_id: user.id, streak: 0 })
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  await supabase.from("activity_logs").insert({
    user_id: user.id,
    habit_id: data.id,
    action: "created_habit",
    entity_type: "habit",
    completed: false,
  });

  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { id, ...rest } = body;

  if (rest.completed === true) {
    const { data: habit } = await supabase
      .from("habits")
      .select("streak, last_completed")
      .eq("id", id)
      .single();

    const today = new Date().toISOString().split("T")[0];
    const lastCompleted = habit?.last_completed;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const newStreak =
      lastCompleted === yesterdayStr
        ? (habit?.streak ?? 0) + 1
        : lastCompleted === today
          ? (habit?.streak ?? 1)
          : 1;

    rest.streak = newStreak;
    rest.last_completed = today;

    await supabase.from("activity_logs").insert({
      user_id: user.id,
      habit_id: id,
      action: "completed_habit",
      entity_type: "habit",
      completed: true,
    });
  }

  const { completed, ...updatePayload } = rest;

  const { data, error } = await supabase
    .from("habits")
    .update(updatePayload)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  const { error } = await supabase
    .from("habits")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
