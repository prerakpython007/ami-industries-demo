"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done">("idle");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) return;
    setStatus("done");
    setEmail("");
  }

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-sage-500/40 bg-neutral-100/60 px-5 py-4 text-sm text-neutral-600">
        <CheckIcon className="size-5" />
        You are on the list. Recipes and launch previews are coming.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@kitchen.com"
        className="w-full rounded-none border border-white/20 bg-white/5 px-5 py-3 text-sm text-white outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-none bg-[#E02027] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black"
      >
        Subscribe
        <ArrowRightIcon className="size-4" />
      </button>
    </form>
  );
}
