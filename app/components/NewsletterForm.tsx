"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstname: firstname || undefined,
          lastname: lastname || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        const msg = data.error || "Something went wrong.";
        setMessage(data.hint ? `${msg} ${data.hint}` : msg);
        return;
      }

      setStatus("success");
      setMessage("Thank you for subscribing.");
      setFirstname("");
      setLastname("");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="flex-1 min-w-[120px] bg-transparent border-b border-neutral-300 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          disabled={status === "loading"}
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="flex-1 min-w-[120px] bg-transparent border-b border-neutral-300 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          disabled={status === "loading"}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 min-w-[120px] bg-transparent border-b border-neutral-300 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
          disabled={status === "loading"}
        />
      </div>
      {message && (
        <p
          className={`text-sm ${
            status === "success" ? "text-neutral-700" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="text-md font-medium text-neutral-900 hover:text-neutral-600 disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing…" : "Subscribe"}
      </button>
    </form>
  );
}
