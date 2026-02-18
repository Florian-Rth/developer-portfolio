import { Hero } from "@components/Hero";
import type React from "react";

export const HeroSection: React.FC = () => {
  return (
    <Hero>
      <Hero.Desktop>
        <Hero.Watermark>hello</Hero.Watermark>
        <Hero.Name>
          Ich bin <Hero.ScriptAccent>Florian Rätsch</Hero.ScriptAccent>
        </Hero.Name>
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
          <Hero.Name>
            Ich bin <Hero.ScriptAccent>Florian Rätsch</Hero.ScriptAccent>
          </Hero.Name>
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
  );
};
