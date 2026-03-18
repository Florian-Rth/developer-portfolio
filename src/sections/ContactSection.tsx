import { ScrollReveal } from "@components/ui/ScrollReveal";
import { SectionHeader } from "@components/ui/SectionHeader";
import type React from "react";

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen py-20">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <ScrollReveal delay={0}>
          <SectionHeader title="Contact." subtitle="Get in touch" />
        </ScrollReveal>
        <p className="text-muted-foreground text-center mt-10">Content coming soon...</p>
      </div>
    </section>
  );
};
