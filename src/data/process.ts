export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Audit",
    description:
      "We dig into your goals, audience and competitors to find the angle nobody else is using.",
  },
  {
    number: "02",
    title: "Prototype",
    description:
      "Fast, clickable concepts so you feel the direction before a single line of production code.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Hand-coded in Next.js with motion baked in. Pixel-tight, fast, and built to last.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Deployed, tested across devices, and tuned for performance, SEO and accessibility.",
  },
  {
    number: "05",
    title: "Maintain",
    description:
      "We stay on. New sections, refinements and improvements every single month.",
  },
];
