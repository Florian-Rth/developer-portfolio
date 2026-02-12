import { GitHubIcon, LinkedInIcon, MailIcon } from "@components/icons";
import { cn } from "@lib/utils";
import type React from "react";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Florian-Rth",
    icon: <GitHubIcon size={20} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/florian-raetsch",
    icon: <LinkedInIcon size={20} />,
  },
  {
    label: "Email",
    href: "mailto:contact@florianraetsch.com",
    icon: <MailIcon size={20} />,
  },
];

type SocialLinksProps = {
  className?: string;
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ className }) => {
  return (
    <nav className={cn("flex items-center gap-4", className)} aria-label="Social links">
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={link.label}
        >
          {link.icon}
        </a>
      ))}
    </nav>
  );
};
