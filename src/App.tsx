import { Layout } from "@components/Layout";
import type React from "react";
import { AboutSection, ContactSection, HeroSection, ProjectsSection } from "./sections";

export const App: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </Layout>
  );
};
