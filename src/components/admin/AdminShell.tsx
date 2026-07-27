import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/app/login/actions";

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f3f0f3] text-[#302451]">
      <header className="sticky top-0 z-40 border-b border-white/50 bg-[#302451]/95 px-4 py-3 text-white shadow-lg backdrop-blur-xl sm:px-7">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Link href="/admin" aria-label="Admin dashboard">
              <Image src="/logo.png" alt="3M tech" width={72} height={44} className="h-9 w-auto" />
            </Link>
            <span className="hidden h-7 w-px bg-white/20 sm:block" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold">Project Dashboard</p>
              <p className="text-[10px] text-white/60">{email}</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/" target="_blank" className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold transition hover:bg-white/10">
              View website
            </Link>
            <form action={logoutAction}>
              <button className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#302451] transition hover:bg-white/90">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-7 sm:py-10">
        {children}
      </main>
    </div>
  );
}
