"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      business: (form.elements.namedItem("business") as HTMLInputElement).value,
      siteUrl: (form.elements.namedItem("siteUrl") as HTMLInputElement).value,
      need: (form.elements.namedItem("need") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-start gap-4 rounded-2xl border border-[#c2571f]/30 bg-[#c2571f]/[0.06] p-8"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c2571f] text-black">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="font-display text-2xl font-bold text-[#c2571f]">
          Message sent.
        </h3>
        <p className="text-[#2a241c]/65">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name *</Label>
        <Input id="name" name="name" placeholder="Your name" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="business">Business *</Label>
        <Input
          id="business"
          name="business"
          placeholder="Company or studio name"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="siteUrl">Current site URL</Label>
        <Input id="siteUrl" name="siteUrl" placeholder="https://" type="url" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="need">What do you need? *</Label>
        <Textarea
          id="need"
          name="need"
          placeholder="Tell us about the project..."
          required
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
