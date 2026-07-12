import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { serviceTiers } from "@/data/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — Krishn Gohel",
  description: "Plans and services built around how you actually grow.",
};

export default function ServicesPage() {
  return (
    <section className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          label="Services"
          title="Plans built around outcomes"
          description="Pick a starting point. We'll tailor the rest to your goals."
        />

        <div className="mt-16 flex flex-col gap-6">
          {serviceTiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "flex flex-col gap-8 rounded-2xl border p-8 md:flex-row md:items-start md:justify-between md:p-12",
                tier.highlighted
                  ? "border-[#c2571f]/40 bg-[#c2571f]/[0.04]"
                  : "border-[#2a241c]/12 bg-[#fffdf8]"
              )}
            >
              <div className="md:max-w-md">
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-2xl font-bold md:text-3xl">
                    {tier.name}
                  </h2>
                  {tier.highlighted && <Badge variant="demo">Most popular</Badge>}
                </div>
                <p className="mt-2 text-[#c2571f]">{tier.tagline}</p>
                <p className="mt-4 text-[#6f6557]">{tier.description}</p>
                <p className="mt-6 text-sm text-[#6f6557]">
                  <span className="uppercase tracking-[0.2em] text-[#2a241c]/35">
                    Ideal for:
                  </span>{" "}
                  {tier.idealFor}
                </p>
              </div>
              <ul className="flex flex-col gap-3 md:min-w-[280px]">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#c2571f]" />
                    <span className="text-[#2a241c]/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <MagneticButton>
            <Button asChild variant="accent" size="lg">
              <Link href="/contact">Get a free consultation</Link>
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
