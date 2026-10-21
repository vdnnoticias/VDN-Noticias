import { NextResponse } from "next/server";
import { createAuthServerClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createAuthServerClient();
    await supabase.auth.signOut();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error en logout:", err);
    return NextResponse.json({ ok: true });
  }
}
