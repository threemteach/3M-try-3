import Image from "next/image";
import Link from "next/link";
import { logoutAction } from "@/app/login/actions";
import AdminNavigation from "./AdminNavigation";
import { ExternalLink, LogOut } from "lucide-react";

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  return (
    <div dir="ltr" className="admin-workspace min-h-screen bg-[#f6f7f9] text-[#24232a] lg:pl-[232px]">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[232px] flex-col border-r border-[#e3e5e9] bg-white lg:flex">
        <Link href="/admin" className="flex h-[72px] items-center gap-3 border-b border-[#e3e5e9] px-6"><Image src="/logo.png" alt="3M tech" width={52} height={34} className="h-8 w-auto rounded bg-[#302451] p-1"/><span className="text-sm font-bold">Workspace</span></Link>
        <p className="px-6 pb-3 pt-7 text-[11px] font-semibold uppercase text-[#85848e]">Manage content</p>
        <AdminNavigation />
        <div className="mt-auto border-t border-[#e3e5e9] p-5"><p className="text-xs font-semibold">Administrator</p><p className="mt-1 break-all text-xs leading-5 text-[#777580]">{email}</p></div>
      </aside>
      <header className="sticky top-0 z-40 border-b border-[#e3e5e9] bg-white px-4 py-4 sm:px-7">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-5">
            <Link href="/admin" aria-label="Admin dashboard">
              <Image src="/logo.png" alt="3M tech" width={72} height={44} className="h-9 w-auto rounded bg-[#302451] p-1 lg:hidden" />
            </Link>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold">Content management</p>
              <p className="mt-1 text-xs text-[#85848e]">3M tech / Dashboard</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-md border border-[#dedfe5] px-3 py-2 text-xs font-semibold hover:bg-[#f6f7f9]">
              <ExternalLink size={14}/> View website
            </Link>
            <form action={logoutAction}>
              <button className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold text-[#706d79] hover:bg-[#f6f7f9]">
                <LogOut size={14}/> Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <div className="border-b border-[#e3e5e9] bg-white p-2 lg:hidden"><AdminNavigation /></div>
      <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-7 sm:py-10">
        {children}
      </main>
    </div>
  );
}
