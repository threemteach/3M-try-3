import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivateRoute = pathname === "/login" || pathname.startsWith("/admin");

  if (pathname === "/" && request.cookies.get("3m-language")?.value !== "en") {
    const target = request.nextUrl.clone();
    target.pathname = "/ar";
    const response = NextResponse.redirect(target);
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Vary", "Cookie");
    return response;
  }

  if (isPrivateRoute && isSupabaseConfigured()) return updateSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2|txt|xml)$).*)"],
};
