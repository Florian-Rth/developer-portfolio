import { Copyright } from "./Copyright";
import { Footer as FooterComponent } from "./Footer";
import { SocialLinks } from "./SocialLinks";

type FooterType = typeof FooterComponent & {
  SocialLinks: typeof SocialLinks;
  Copyright: typeof Copyright;
};

const Footer = FooterComponent as FooterType;
Footer.SocialLinks = SocialLinks;
Footer.Copyright = Copyright;

export { Footer };
