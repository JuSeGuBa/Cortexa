import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = req.nextUrl.searchParams.get("limit");

  let query = supabase
    .from("activity_logs")
    .select("*, habits(name), items(title)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(Number(limit));

  const { data, error } = await query;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}
