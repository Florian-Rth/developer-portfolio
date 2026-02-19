import { About } from "@components/About";
import { ScrollReveal } from "@components/ui/ScrollReveal";
import type React from "react";

export const AboutSection: React.FC = () => {
  return (
    <About>
      <About.Watermark />
      <ScrollReveal delay={0}>
        <About.PhotoCard src="placeholder" alt="Florian Rätsch">
          {/* Annotation 1: "This is me! 👋" - bottom-left, all screens */}
          <About.Annotation
            text="This is me! 👋"
            rotation={-6}
            arrowDirection="up"
            className="-bottom-8 -left-5"
            animationDelay={600}
          />
          {/* Annotation 2: "Headshot!" - top-right, desktop only */}
          <About.Annotation
            text="Headshot!"
            rotation={5}
            arrowDirection="down"
            className="-top-10 -right-6 hidden lg:block"
            animationDelay={650}
          />
        </About.PhotoCard>
      </ScrollReveal>
      {/* Wrap PullQuote for annotation positioning */}
      <ScrollReveal delay={150} className="relative col-span-full">
        <About.PullQuote>Code is my canvas, pixels are my paint.</About.PullQuote>
        {/* Annotation 3: "Love this font!" - left side, all screens */}
        <About.Annotation
          text="Love this font!"
          rotation={-4}
          arrowDirection="right"
          className="top-6 -left-2 lg:-left-6"
          animationDelay={700}
        />
      </ScrollReveal>
      <ScrollReveal delay={300}>
        <About.Story>
          I'm a passionate <About.TextHighlight>creative developer</About.TextHighlight> based in
          Leipzig, crafting <About.TextHighlight>digital experiences</About.TextHighlight> that
          blend design and functionality. My journey started with a curiosity for how things work,
          leading me to explore both visual arts and programming. I believe in building{" "}
          <About.TextHighlight>intuitive interfaces</About.TextHighlight> that tell a story and
          connect with users on a deeper level.
        </About.Story>
      </ScrollReveal>
      {/* Wrap CodeSnippet for annotation positioning */}
      <ScrollReveal delay={450} className="relative">
        <About.CodeSnippet />
        {/* Annotation 4: "Playful self-intro code 😄" - bottom center, desktop only */}
        <About.Annotation
          text="Playful self-intro code 😄"
          rotation={3}
          arrowDirection="up"
          className="-bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
          animationDelay={750}
        />
        {/* Annotation 5: "My tech stack & personality!" - right side, all screens */}
        <About.Annotation
          text="My tech stack & personality!"
          rotation={7}
          arrowDirection="left"
          className="top-1/2 -translate-y-1/2 -right-4 lg:-right-10"
          animationDelay={800}
        />
      </ScrollReveal>
      {/* Wrap Counter for annotation positioning */}
      <ScrollReveal delay={550} className="relative">
        <About.Counter value={3} label="Jahre Experience" />
        {/* Annotation 6: "Growing fact! 🌱" - top-right, all screens */}
        <About.Annotation
          text="Growing fact! 🌱"
          rotation={-5}
          arrowDirection="down"
          className="-top-10 -right-4 lg:-right-8"
          animationDelay={850}
        />
      </ScrollReveal>
      <About.BrushDivider />
    </About>
  );
};
