"use client";

import { useActionState } from "react";
import Image from "next/image";
import { loginAction, type ActionState } from "@/lib/actions";

const initial: ActionState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist-light px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image src="/brand/logo-syrdarya-transparent.png" alt="IT Park Sirdaryo" width={1880} height={836} className="h-12 w-auto" />
          <h1 className="mt-6 text-2xl font-extrabold text-ink">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink-muted">IT Park Sirdaryo control panel</p>
        </div>

        <form action={formAction} className="card space-y-4 p-6">
          <div>
            <label htmlFor="username" className="field-label">Username</label>
            <input id="username" name="username" className="field-input" autoComplete="username" required />
          </div>
          <div>
            <label htmlFor="password" className="field-label">Password</label>
            <input id="password" name="password" type="password" className="field-input" autoComplete="current-password" required />
          </div>

          {state?.error && (
            <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600">
              Invalid username or password.
            </p>
          )}

          <button type="submit" disabled={pending} className="btn-primary w-full">
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
