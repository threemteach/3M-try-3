import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivateRoute = pathname === "/login" || pathname.startsWith("/admin");
  const isArabicRoute = pathname === "/ar" || pathname.startsWith("/ar/");
  const preferredLanguage = request.cookies.get("3m-language")?.value;

  // Arabic is the default for first-time visitors. Keep the unprefixed English
  // routes only after the visitor has explicitly selected English.
  if (!isPrivateRoute && !isArabicRoute && preferredLanguage !== "en") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ar" : `/ar${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set("3m-language", "ar", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  if (isPrivateRoute && isSupabaseConfigured()) return updateSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2|txt|xml)$).*)"],
};
