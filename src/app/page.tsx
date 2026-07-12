import { Hero } from "@/components/home/hero";
import { Showreel } from "@/components/home/showreel";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ServicesPreview } from "@/components/home/services-preview";
import { ProcessPreview } from "@/components/home/process-preview";
import { Testimonials } from "@/components/home/testimonials";
import { CtaSection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <Hero />
      <Showreel />
      <FeaturedProjects />
      <ServicesPreview />
      <ProcessPreview />
      <Testimonials />
      <CtaSection />
    </>
  );
}
