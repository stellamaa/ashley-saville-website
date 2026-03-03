"use client";

import { useSearchParams } from "next/navigation";
import { useState, useTransition, Suspense } from "react";
import { useRouter } from "next/navigation";

function UnlockForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectTo = searchParams.get("from") || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, redirect: redirectTo }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setError(data.error || "Incorrect password");
      return;
    }
    startTransition(() => {
      router.push(redirectTo);
      router.refresh();
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] px-16">
      <h2 className="text-base mb-8">Ashley Saville site coming soon</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <label htmlFor="password" className="text-neutral-900 text-sm">
          Enter password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-600"
          autoFocus
          autoComplete="current-password"
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3 bg-neutral-900 text-white text-sm hover:bg-neutral-700 transition-colors disabled:opacity-70"
        >
          {isPending ? "Entering…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

export default function UnlockPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
          <div className="animate-pulse text-neutral-400 text-sm">Loading…</div>
        </div>
      }
    >
      <UnlockForm />
    </Suspense>
  );
}
