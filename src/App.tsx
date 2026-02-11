import { Layout } from "@components/Layout";
import type React from "react";

export const App: React.FC = () => {
  return (
    <Layout>
      <section id="home" className="min-h-[80vh] flex items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Welcome</h1>
      </section>

      <section id="about" className="min-h-screen py-20">
        <h2 className="text-3xl font-bold mb-8">Über mich</h2>
        <p className="text-muted-foreground">Content coming soon...</p>
      </section>

      <section id="projects" className="min-h-screen py-20">
        <h2 className="text-3xl font-bold mb-8">Projekte</h2>
        <p className="text-muted-foreground">Content coming soon...</p>
      </section>

      <section id="contact" className="min-h-screen py-20">
        <h2 className="text-3xl font-bold mb-8">Kontakt</h2>
        <p className="text-muted-foreground">Content coming soon...</p>
      </section>
    </Layout>
  );
};
