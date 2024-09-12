import { supabase } from "@/utils/supabase";
import { AuthError, Session } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
  
    const {
      data,
      error,
    }: { data: { session: Session | null }; error: AuthError | null } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
  
  
    return NextResponse.json({
      message: "Login successful",
      token: data?.session?.access_token,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
