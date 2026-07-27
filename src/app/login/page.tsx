import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#302451] px-4 py-16">
      <Image
        src="/rectangles.png"
        alt=""
        fill
        className="pointer-events-none object-cover opacity-20"
        priority
      />
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-[#8e80ae]/35 blur-3xl" />

      <div className="relative w-full max-w-[470px] rounded-[32px] border border-white/65 bg-white/85 p-6 shadow-[0_32px_90px_rgba(12,6,31,.4)] backdrop-blur-2xl sm:p-9">
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Back to home">
            <Image src="/logo.png" alt="3M tech" width={84} height={52} className="h-10 w-auto brightness-0" />
          </Link>
          <span className="rounded-full border border-[#302451]/10 bg-[#302451]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#302451]/70">
            Secure admin
          </span>
        </div>
        <div className="mt-8">
          <h1 style={{ fontFamily: '"MedulaOne", serif' }} className="text-[52px] leading-none text-[#302451]">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#5f5870]">
            Sign in to manage the projects displayed across your website.
          </p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-[11px] leading-5 text-[#6d6679]">
          Access is restricted to approved administrator accounts.
        </p>
      </div>
    </div>
  );
}
