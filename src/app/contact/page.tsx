import type { Metadata } from "next";
import { Linkedin, Github, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/shared/contact-form";

export const metadata: Metadata = {
  title: "Contact — Krishn Gohel",
  description: "Get in touch — I usually reply within a day.",
};

export default function ContactPage() {
  return (
    <section className="px-6 pt-32 pb-24 md:px-10 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          label="05 · Contact"
          title="Let's talk."
          description="Hiring, building something, or just want to connect? Drop me a note."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            <a
              href="https://www.linkedin.com/in/krishngohel"
              target="_blank"
              rel="noopener"
              data-cursor="pointer"
              className="group flex items-start justify-between gap-4 rounded-2xl border border-[#2a241c]/12 bg-[#fffdf8] p-8 transition-colors hover:border-[#c2571f]/40"
            >
              <div>
                <Linkedin className="h-7 w-7 text-[#8a63d2]" />
                <h3 className="mt-4 font-display text-xl font-bold">LinkedIn</h3>
                <p className="mt-1 text-sm text-[#6f6557]">linkedin.com/in/krishngohel</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#2a241c]/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>

            <a
              href="https://github.com/krishngohel"
              target="_blank"
              rel="noopener"
              data-cursor="pointer"
              className="group flex items-start justify-between gap-4 rounded-2xl border border-[#2a241c]/12 bg-[#fffdf8] p-8 transition-colors hover:border-[#c2571f]/40"
            >
              <div>
                <Github className="h-7 w-7 text-[#1f8a7c]" />
                <h3 className="mt-4 font-display text-xl font-bold">GitHub</h3>
                <p className="mt-1 text-sm text-[#6f6557]">github.com/krishngohel</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#2a241c]/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>

            <div className="rounded-2xl border border-[#2a241c]/12 bg-[#fffdf8] p-8">
              <p className="text-[#6f6557]">San Antonio &amp; Dallas, TX · open to relocate</p>
              <a href="mailto:gohel.krishn@gmail.com" data-cursor="pointer" className="mt-2 inline-block text-[#c2571f] transition-colors hover:text-[#2a241c]">
                gohel.krishn@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
