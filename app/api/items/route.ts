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
    .from("items")
    .select("*")
    .eq("user_id", user.id);

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
    .from("items")
    .insert({ ...body, user_id: user.id })
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  await supabase.from("activity_logs").insert({
    user_id: user.id,
    action: "created_item",
    entity_type: "item",
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

  const { data, error } = await supabase
    .from("items")
    .update(rest)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  if (rest.status === "completed") {
    await supabase.from("activity_logs").insert({
      user_id: user.id,
      action: "completed_item",
      entity_type: "item",
      completed: true,
    });
  }

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
    .from("items")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
