import { Hero } from "@components/Hero";
import { Layout } from "@components/Layout";
import type React from "react";

export const App: React.FC = () => {
  return (
    <Layout>
      <Hero>
        <Hero.Watermark>hello</Hero.Watermark>

        <Hero.Desktop>
          <Hero.Greeting>Ich bin</Hero.Greeting>
          <Hero.Name>Florian Rätsch</Hero.Name>
          <Hero.ScriptAccent>FlorianRth</Hero.ScriptAccent>
          <Hero.Tagline>
            Full Stack Web Developer mit Fokus auf React, TypeScript und .NET
          </Hero.Tagline>
          <Hero.Actions>
            <Hero.PrimaryButton href="#contact">Kontakt aufnehmen</Hero.PrimaryButton>
            <Hero.OutlineButton href="#projects">Projekte ansehen</Hero.OutlineButton>
          </Hero.Actions>
        </Hero.Desktop>

        <Hero.Mobile>
          <Hero.Card>
            <Hero.Tape />
            <Hero.Greeting>Ich bin</Hero.Greeting>
            <Hero.Name>Florian Rätsch</Hero.Name>
            <Hero.ScriptAccent>FlorianRth</Hero.ScriptAccent>
            <Hero.Tagline>
              Full Stack Web Developer mit Fokus auf React, TypeScript und .NET
            </Hero.Tagline>
            <Hero.Actions>
              <Hero.PrimaryButton href="#contact">Kontakt aufnehmen</Hero.PrimaryButton>
              <Hero.OutlineButton href="#projects">Projekte ansehen</Hero.OutlineButton>
            </Hero.Actions>
          </Hero.Card>
        </Hero.Mobile>

        <Hero.SectionDivider />
      </Hero>

      <section id="about" className="bg-card min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8">Über mich</h2>
          <p className="text-muted-foreground">Content coming soon...</p>
        </div>
      </section>

      <section id="projects" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8">Projekte</h2>
          <p className="text-muted-foreground">Content coming soon...</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8">Kontakt</h2>
          <p className="text-muted-foreground">Content coming soon...</p>
        </div>
      </section>
    </Layout>
  );
};
