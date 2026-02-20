import { About } from "@components/About";
import { ScrollReveal } from "@components/ui/ScrollReveal";
import type React from "react";

export const AboutSection: React.FC = () => {
  return (
    <About>
      {/* Watermark is position: absolute, not in grid flow */}
      <About.Watermark />

      {/* Row 1, Column 1: PhotoCard */}
      <ScrollReveal delay={0} className="relative justify-self-center lg:justify-self-start">
        <About.PhotoCard
          src="placeholder"
          alt="Florian Rätsch"
          className="lg:translate-x-[2%] lg:-translate-y-[1%]"
        >
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
            className="-top-4 -right-20 hidden lg:block"
            animationDelay={650}
          />
        </About.PhotoCard>
      </ScrollReveal>

      {/* Row 1, Column 2: InfoText + Counter */}
      <ScrollReveal
        delay={100}
        className="flex flex-col gap-6 items-center lg:items-start lg:translate-x-[3%] lg:translate-y-[2%]"
      >
        <About.InfoText>
          When I'm not coding or designing, you can find me exploring art galleries, hiking in the
          mountains, or brewing the perfect cup of pour-over coffee. I believe in continuous
          learning and staying curious.
        </About.InfoText>

        {/* Counter with annotation */}
        <div className="relative mt-4">
          <About.Counter value={3} label="Jahre Experience" />
          {/* Annotation 6: "Growing fact! 🌱" - top-right */}
          <About.Annotation
            text="Growing fact! 🌱"
            rotation={-5}
            arrowDirection="down"
            className="-top-10 -right-4 lg:-right-8"
            animationDelay={700}
          />
        </div>
      </ScrollReveal>

      {/* Row 2: PullQuote - spans full width */}
      <ScrollReveal delay={150} className="relative col-span-full lg:-translate-x-[1%]">
        <About.PullQuote attribution="Steve Jobs">
          Design is not just what it looks like. Design is how it works.
        </About.PullQuote>
        {/* Annotation 3: "Love this font!" - left side, all screens */}
        <About.Annotation
          text="Love this font!"
          rotation={-4}
          arrowDirection="right"
          className="top-6 -left-2 lg:-left-6"
          animationDelay={750}
        />
      </ScrollReveal>

      {/* Row 3, Column 1: Story */}
      <ScrollReveal
        delay={300}
        className="justify-self-center lg:justify-self-start lg:translate-x-[1%] lg:translate-y-[2%]"
      >
        <About.Story>
          I'm a passionate <About.TextHighlight>creative developer</About.TextHighlight> based in
          Leipzig, crafting <About.TextHighlight>digital experiences</About.TextHighlight> that
          blend design and functionality. My journey started with a curiosity for how things work,
          leading me to explore both visual arts and programming. I believe in building{" "}
          <About.TextHighlight>intuitive interfaces</About.TextHighlight> that tell a story and
          connect with users on a deeper level.
        </About.Story>
      </ScrollReveal>

      {/* Row 3, Column 2: CodeSnippet */}
      <ScrollReveal
        delay={450}
        className="relative w-full justify-self-center lg:justify-self-end lg:-translate-x-[2%] lg:-translate-y-[1%]"
      >
        <About.CodeSnippet className="lg:rotate-[2deg]" />
        {/* Annotation 4: "Playful self-intro code 😄" - bottom center, desktop only */}
        <About.Annotation
          text="Playful self-intro code 😄"
          rotation={3}
          arrowDirection="up"
          className="-bottom-10 left-1/2 -translate-x-1/2 hidden lg:block"
          animationDelay={800}
        />
        {/* Annotation 5: "My tech stack & personality!" - right side, desktop only */}
        <About.Annotation
          text="My tech stack & personality!"
          rotation={7}
          arrowDirection="left"
          className="-bottom-12 left-4 hidden lg:block"
          animationDelay={850}
        />
      </ScrollReveal>

      {/* BrushDivider removed */}
    </About>
  );
};
