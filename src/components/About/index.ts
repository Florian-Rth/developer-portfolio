import { About as AboutComponent } from "./About";
import { Annotation } from "./Annotation";
import { BrushDivider } from "./BrushDivider";
import { BrushUnderline } from "./BrushUnderline";
import { CodeSnippet } from "./CodeSnippet";
import { Counter } from "./Counter";
import { InfoText } from "./InfoText";
import { PhotoCard } from "./PhotoCard";
import { PullQuote } from "./PullQuote";
import { Story } from "./Story";
import { TextHighlight } from "./TextHighlight";
import { Watermark } from "./Watermark";

type AboutType = typeof AboutComponent & {
  Watermark: typeof Watermark;
  PhotoCard: typeof PhotoCard;
  Annotation: typeof Annotation;
  PullQuote: typeof PullQuote;
  BrushUnderline: typeof BrushUnderline;
  BrushDivider: typeof BrushDivider;
  Story: typeof Story;
  TextHighlight: typeof TextHighlight;
  CodeSnippet: typeof CodeSnippet;
  Counter: typeof Counter;
  InfoText: typeof InfoText;
};

const About = AboutComponent as AboutType;
About.Watermark = Watermark;
About.PhotoCard = PhotoCard;
About.Annotation = Annotation;
About.PullQuote = PullQuote;
About.BrushUnderline = BrushUnderline;
About.BrushDivider = BrushDivider;
About.Story = Story;
About.TextHighlight = TextHighlight;
About.CodeSnippet = CodeSnippet;
About.Counter = Counter;
About.InfoText = InfoText;

export { About };
