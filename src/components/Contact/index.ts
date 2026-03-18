import { Body } from "./Body";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { Contact as ContactComponent } from "./Contact";
import { Headline } from "./Headline";
import { PrimaryAction } from "./PrimaryAction";
import { ScriptAccent } from "./ScriptAccent";
import { SecondaryAction } from "./SecondaryAction";
import { SocialLink } from "./SocialLink";
import { SocialLinks } from "./SocialLinks";
import { Title } from "./Title";
import { TopicChips } from "./TopicChips";

type ContactType = typeof ContactComponent & {
  Headline: typeof Headline;
  Body: typeof Body;
  ScriptAccent: typeof ScriptAccent;
  Card: typeof Card;
  CardTitle: typeof Title;
  TopicChips: typeof TopicChips;
  Chip: typeof Chip;
  PrimaryAction: typeof PrimaryAction;
  SecondaryAction: typeof SecondaryAction;
  SocialLinks: typeof SocialLinks;
  SocialLink: typeof SocialLink;
};

const Contact = ContactComponent as ContactType;
Contact.Headline = Headline;
Contact.Body = Body;
Contact.ScriptAccent = ScriptAccent;
Contact.Card = Card;
Contact.CardTitle = Title;
Contact.TopicChips = TopicChips;
Contact.Chip = Chip;
Contact.PrimaryAction = PrimaryAction;
Contact.SecondaryAction = SecondaryAction;
Contact.SocialLinks = SocialLinks;
Contact.SocialLink = SocialLink;

export { Contact };
