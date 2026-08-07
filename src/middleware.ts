import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivateRoute = pathname === "/login" || pathname.startsWith("/admin");
  const isArabicRoute = pathname === "/ar" || pathname.startsWith("/ar/");
  const preferredLanguage = request.cookies.get("3m-language")?.value;

  // Redirect only when the visitor explicitly chose Arabic. A missing cookie
  // should not make first visits or cached navigations leave the English URL.
  if (!isPrivateRoute && !isArabicRoute && preferredLanguage === "ar") {
    const url = request.nextUrl.clone();
    url.pathname = pathname === "/" ? "/ar" : `/ar${pathname}`;
    return NextResponse.redirect(url);
  }

  if (isPrivateRoute && isSupabaseConfigured()) return updateSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|woff2|txt|xml)$).*)"],
};
