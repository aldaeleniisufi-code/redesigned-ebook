"use client";

import { useActionState } from "react";
import { registerAction } from "./actions";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-md">
      {state?.error && (
        <p className="rounded-xl bg-red-100 px-4 py-3 text-center text-sm font-semibold text-red-700">
          {state.error}
        </p>
      )}
      <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
        Όνομα
        <input
          type="text"
          name="name"
          required
          className="rounded-xl border-2 border-brand-purple/20 px-4 py-2 outline-none focus:border-brand-purple"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
        Email
        <input
          type="email"
          name="email"
          required
          className="rounded-xl border-2 border-brand-purple/20 px-4 py-2 outline-none focus:border-brand-purple"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold text-foreground/80">
        Κωδικός (τουλάχιστον 6 χαρακτήρες)
        <input
          type="password"
          name="password"
          required
          minLength={6}
          className="rounded-xl border-2 border-brand-purple/20 px-4 py-2 outline-none focus:border-brand-purple"
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-brand-orange px-6 py-3 font-bold text-white shadow transition hover:brightness-110 disabled:opacity-60"
      >
        {pending ? "Δημιουργία..." : "Δημιουργία λογαριασμού"}
      </button>
    </form>
  );
}
