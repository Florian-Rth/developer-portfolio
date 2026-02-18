import { Actions } from "./Actions";
import { Card } from "./Card";
import { Desktop } from "./Desktop";
import { Greeting } from "./Greeting";
import { Hero as HeroComponent } from "./Hero";
import { Mobile } from "./Mobile";
import { Name } from "./Name";
import { OutlineButton } from "./OutlineButton";
import { PrimaryButton } from "./PrimaryButton";
import { ScriptAccent } from "./ScriptAccent";
import { SectionDivider } from "./SectionDivider";
import { Tagline } from "./Tagline";
import { Tape } from "./Tape";
import { Watermark } from "./Watermark";

type HeroType = typeof HeroComponent & {
  Watermark: typeof Watermark;
  Card: typeof Card;
  Tape: typeof Tape;
  Greeting: typeof Greeting;
  Name: typeof Name;
  ScriptAccent: typeof ScriptAccent;
  Tagline: typeof Tagline;
  Actions: typeof Actions;
  PrimaryButton: typeof PrimaryButton;
  OutlineButton: typeof OutlineButton;
  SectionDivider: typeof SectionDivider;
  Desktop: typeof Desktop;
  Mobile: typeof Mobile;
};

const Hero = HeroComponent as HeroType;
Hero.Watermark = Watermark;
Hero.Card = Card;
Hero.Tape = Tape;
Hero.Greeting = Greeting;
Hero.Name = Name;
Hero.ScriptAccent = ScriptAccent;
Hero.Tagline = Tagline;
Hero.Actions = Actions;
Hero.PrimaryButton = PrimaryButton;
Hero.OutlineButton = OutlineButton;
Hero.SectionDivider = SectionDivider;
Hero.Desktop = Desktop;
Hero.Mobile = Mobile;

export { Hero };
