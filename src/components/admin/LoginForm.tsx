"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/login/actions";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-bold text-[#302451]">
          Admin email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          autoFocus
          className="h-13 w-full rounded-2xl border border-[#302451]/15 bg-white/75 px-4 text-sm text-[#302451] outline-none transition focus:border-[#302451]/50 focus:ring-4 focus:ring-[#302451]/10"
          placeholder="admin@example.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-bold text-[#302451]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          className="h-13 w-full rounded-2xl border border-[#302451]/15 bg-white/75 px-4 text-sm text-[#302451] outline-none transition focus:border-[#302451]/50 focus:ring-4 focus:ring-[#302451]/10"
          placeholder="Enter your password"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-13 w-full items-center justify-center rounded-full bg-[#302451] px-6 text-sm font-bold text-white shadow-[0_14px_30px_rgba(48,36,81,.25)] transition hover:-translate-y-0.5 hover:bg-[#43346d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in securely"}
      </button>
    </form>
  );
}
