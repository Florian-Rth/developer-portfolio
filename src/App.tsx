import type React from "react";
import { Layout } from "./components/layout";

const Section: React.FC<{
  id: string;
  title: string;
  className?: string;
}> = ({ id, title, className = "" }) => (
  <section
    id={id}
    className={`min-h-screen flex items-center justify-center ${className}`}
  >
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground">
        This section will be implemented in a future phase.
      </p>
    </div>
  </section>
);

export const App: React.FC = () => {
  return (
    <Layout>
      <Section id="about" title="About" className="bg-background" />
      <Section id="career" title="Career Timeline" className="bg-muted/30" />
      <Section id="skills" title="Skills & Technologies" className="bg-background" />
      <Section id="projects" title="Projects" className="bg-muted/30" />
      <Section id="contact" title="Contact" className="bg-background" />
    </Layout>
  );
};
