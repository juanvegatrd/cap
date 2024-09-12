import { supabase } from "@/utils/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const data = await supabase.auth.signOut();

    if (data.error !== null) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
