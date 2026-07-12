export interface ServicePreview {
  number: string;
  title: string;
  description: string;
}

export const servicePreviews: ServicePreview[] = [
  {
    number: "01",
    title: "Brand & Identity",
    description:
      "Logos, systems and visual language that make studios and startups look inevitable.",
  },
  {
    number: "02",
    title: "UX/UI Design",
    description:
      "Interfaces engineered around real behaviour — clear, fast, and quietly premium.",
  },
  {
    number: "03",
    title: "Custom Development",
    description:
      "Hand-built Next.js front-ends and APIs. No page builders, no bloat, no shortcuts.",
  },
  {
    number: "04",
    title: "Growth & Maintenance",
    description:
      "We don't disappear at launch. Ongoing iteration, performance and care.",
  },
];

export interface ServiceTier {
  name: string;
  tagline: string;
  description: string;
  idealFor: string;
  features: string[];
  highlighted?: boolean;
}

export const serviceTiers: ServiceTier[] = [
  {
    name: "Showcase & Leads",
    tagline: "Your storefront that actually converts",
    description:
      "A fast, cinematic marketing site built to turn visitors into qualified enquiries.",
    idealFor: "Studios, agencies, founders and service businesses",
    features: [
      "Up to 6 custom-designed pages",
      "Motion & micro-interactions throughout",
      "Lead capture + contact integration",
      "SEO foundation & analytics",
      "Mobile-perfect responsive build",
    ],
    highlighted: true,
  },
  {
    name: "E-Commerce",
    tagline: "Sell beautifully, scale calmly",
    description:
      "Conversion-focused storefronts with the polish of a flagship brand site.",
    idealFor: "Product brands ready to sell direct",
    features: [
      "Custom storefront & product pages",
      "Cart, checkout & payment integration",
      "Inventory & order workflows",
      "Performance-tuned for scale",
    ],
  },
  {
    name: "Redesigns",
    tagline: "From dated to definitive",
    description:
      "Take an existing site and rebuild it into something that earns trust on sight.",
    idealFor: "Businesses outgrowing their current site",
    features: [
      "Full UX & content audit",
      "Rebuilt design system",
      "Content migration",
      "Zero-downtime relaunch",
    ],
  },
  {
    name: "Maintenance Plans",
    tagline: "A partner, not a vendor",
    description:
      "Monthly care so your site keeps improving long after it ships.",
    idealFor: "Anyone who wants their site to keep getting better",
    features: [
      "Ongoing updates & new sections",
      "Performance & uptime monitoring",
      "Priority support",
      "Monthly improvement roadmap",
    ],
  },
];
