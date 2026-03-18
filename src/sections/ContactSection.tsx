import { Contact } from "@components/Contact";
import { GitHubIcon } from "@components/icons/GitHubIcon";
import { LinkedInIcon } from "@components/icons/LinkedInIcon";
import { MailIcon } from "@components/icons/MailIcon";
import { ScrollReveal } from "@components/ui/ScrollReveal";
import type React from "react";

export const ContactSection: React.FC = () => {
  return (
    <Contact>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-24 md:py-36">
        {/* Two-column editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 xl:gap-x-24 items-start">
          {/* Left column: headline + body + script accent */}
          <ScrollReveal
            delay={0}
            className="flex flex-col gap-5 text-center lg:text-left mb-12 lg:mb-0"
          >
            <Contact.Headline>
              Let's Build
              <br />
              Something
              <br />
              Together.
            </Contact.Headline>

            <Contact.Body>
              Ready to collaborate on your next project or discuss potential opportunities. I'm
              always open to new conversations and ideas.
            </Contact.Body>

            <Contact.ScriptAccent>let's talk</Contact.ScriptAccent>
          </ScrollReveal>

          {/* Right column: contact card — sits slightly lower for editorial feel */}
          <ScrollReveal delay={150} className="lg:translate-y-6">
            <Contact.Card>
              {/* Card title */}
              <Contact.CardTitle>Send a Message</Contact.CardTitle>

              {/* Quick-action topic chips */}
              <Contact.TopicChips>
                <Contact.Chip variant="rose">Project Inquiry</Contact.Chip>
                <Contact.Chip variant="peach">Collaboration</Contact.Chip>
                <Contact.Chip variant="lavender">General Chat</Contact.Chip>
              </Contact.TopicChips>

              {/* Side-by-side action buttons */}
              <div className="flex flex-row gap-3">
                <Contact.PrimaryAction href="mailto:hello@florian-raetsch.dev">
                  <MailIcon size={14} />
                  Get in Touch via Email
                </Contact.PrimaryAction>
                <Contact.SecondaryAction href="/cv.pdf">Download CV</Contact.SecondaryAction>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-border/60" aria-hidden="true" />

              {/* Social links — GitHub + LinkedIn only */}
              <Contact.SocialLinks>
                <Contact.SocialLink href="https://github.com/Florian-Rth" label="GitHub">
                  <GitHubIcon size={18} />
                </Contact.SocialLink>
                <Contact.SocialLink href="https://linkedin.com/in/florian-raetsch" label="LinkedIn">
                  <LinkedInIcon size={18} />
                </Contact.SocialLink>
              </Contact.SocialLinks>
            </Contact.Card>
          </ScrollReveal>
        </div>
      </div>
    </Contact>
  );
};
