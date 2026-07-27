import type { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export function assertSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    throw new Error("Invalid request origin.");
  }
}

export async function requireAdminApi(request: NextRequest) {
  assertSameOrigin(request);
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { error: "Authentication required.", status: 401 as const };
  }
  if (user.app_metadata?.role !== "admin") {
    return { error: "Administrator access required.", status: 403 as const };
  }
  return { supabase, user };
}
