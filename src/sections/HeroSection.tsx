import { Hero } from "@components/Hero";
import type React from "react";

export const HeroSection: React.FC = () => {
  return (
    <Hero>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,180,160,0.26),transparent_38%),radial-gradient(circle_at_78%_26%,rgba(184,169,212,0.25),transparent_28%),radial-gradient(circle_at_68%_72%,rgba(212,146,155,0.18),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(232,180,160,0.14),transparent_38%),radial-gradient(circle_at_78%_26%,rgba(184,169,212,0.16),transparent_28%),radial-gradient(circle_at_68%_72%,rgba(212,146,155,0.1),transparent_30%)]" />
        <div className="absolute inset-x-0 top-[18%] h-40 bg-[linear-gradient(90deg,transparent_0%,rgba(232,180,160,0.24)_14%,rgba(212,146,155,0.16)_38%,rgba(184,169,212,0.22)_70%,transparent_100%)] blur-3xl opacity-80 dark:opacity-50" />
        <div className="absolute inset-x-[-6%] top-[44%] h-[28rem] rounded-[50%] border border-white/15 bg-[linear-gradient(90deg,rgba(232,180,160,0.12),rgba(212,146,155,0.07),rgba(184,169,212,0.12))] blur-3xl dark:border-white/6 dark:bg-[linear-gradient(90deg,rgba(232,180,160,0.05),rgba(212,146,155,0.04),rgba(184,169,212,0.07))]" />
      </div>

      <Hero.Desktop>
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-12 lg:gap-16 xl:gap-20">
          <div className="relative max-w-2xl text-left">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-4 py-1.5 text-sm font-medium tracking-[0.02em] text-foreground/72 shadow-[0_12px_30px_rgba(45,42,38,0.04)] backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-dusty-rose" />
              Full Stack Web Developer
            </span>

            <Hero.Name className="max-w-[11ch]">
              <span className="block text-[0.82em] font-semibold tracking-[-0.05em] text-foreground/92">
                Ich bin
              </span>
              <span className="mt-2 block bg-gradient-to-r from-gradient-peach via-gradient-dusty-rose to-gradient-lavender bg-clip-text font-serif text-transparent tracking-[-0.055em]">
                Florian Rätsch
              </span>
            </Hero.Name>

            <Hero.Tagline className="max-w-xl text-lg leading-8 text-foreground/72 xl:text-[1.34rem] xl:leading-9">
              Ich entwickle moderne Web-Oberflächen und robuste Backend-Systeme mit Fokus auf
              React, TypeScript und .NET — klar strukturiert, performant und mit Liebe zum
              Detail.
            </Hero.Tagline>

            <Hero.Actions>
              <Hero.PrimaryButton href="#contact">Kontakt aufnehmen</Hero.PrimaryButton>
              <Hero.OutlineButton href="#projects">Projekte ansehen</Hero.OutlineButton>
            </Hero.Actions>
          </div>

          <div className="relative flex min-h-[34rem] items-center justify-center">
            <Hero.Monogram />
          </div>
        </div>
      </Hero.Desktop>

      <Hero.Mobile className="relative z-10 px-5 pt-[calc(var(--appbar-height-mobile)+2rem)] pb-16">
        <div className="mx-auto flex w-full max-w-xl flex-col items-start rounded-[2rem] border border-foreground/8 bg-background/72 px-6 py-7 text-left shadow-[0_18px_50px_rgba(45,42,38,0.06)] backdrop-blur-sm dark:border-white/8 dark:bg-card/72">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/70 px-3 py-1 text-xs font-medium tracking-[0.02em] text-foreground/70">
            <span className="h-2 w-2 rounded-full bg-gradient-dusty-rose" />
            Full Stack Web Developer
          </span>

          <Hero.Name className="text-left text-[2.85rem] leading-[0.95] tracking-[-0.05em]">
            <span className="block text-[0.78em] font-semibold text-foreground/90">Ich bin</span>
            <span className="mt-2 block bg-gradient-to-r from-gradient-peach via-gradient-dusty-rose to-gradient-lavender bg-clip-text font-serif text-transparent tracking-[-0.055em]">
              Florian Rätsch
            </span>
          </Hero.Name>

          <Hero.Tagline className="mt-5 max-w-none text-left text-base leading-7 text-foreground/70">
            Ich entwickle moderne Web-Oberflächen und robuste Backend-Systeme mit Fokus auf
            React, TypeScript und .NET.
          </Hero.Tagline>

          <Hero.Actions className="mt-7 w-full">
            <Hero.PrimaryButton href="#contact" className="w-full">
              Kontakt aufnehmen
            </Hero.PrimaryButton>
            <Hero.OutlineButton href="#projects" className="w-full">
              Projekte ansehen
            </Hero.OutlineButton>
          </Hero.Actions>

          <div className="relative mt-8 flex w-full items-center justify-center overflow-hidden rounded-[1.75rem] border border-foreground/8 bg-[linear-gradient(135deg,rgba(232,180,160,0.18),rgba(212,146,155,0.1),rgba(184,169,212,0.18))] dark:border-white/8 dark:bg-[linear-gradient(135deg,rgba(232,180,160,0.1),rgba(212,146,155,0.07),rgba(184,169,212,0.12))]">
            <Hero.Monogram compact className="py-4" />
          </div>
        </div>
      </Hero.Mobile>

      <Hero.SectionDivider className="top-auto bottom-0" />
    </Hero>
  );
};
