import { CardScene } from "./CardScene";
import { CarouselDots } from "./CarouselDots";
import { SkillCard } from "./SkillCard";
import { SkillCardGrid } from "./SkillCardGrid";
import { SkillTag } from "./SkillTag";
import { Skills as SkillsComponent } from "./Skills";
import { SkillsWatermark } from "./SkillsWatermark";

type SkillsType = typeof SkillsComponent & {
  Watermark: typeof SkillsWatermark;
  CardGrid: typeof SkillCardGrid;
  Card: typeof SkillCard;
  Scene: typeof CardScene;
  Tag: typeof SkillTag;
  CarouselDots: typeof CarouselDots;
};

const Skills = SkillsComponent as SkillsType;
Skills.Watermark = SkillsWatermark;
Skills.CardGrid = SkillCardGrid;
Skills.Card = SkillCard;
Skills.Scene = CardScene;
Skills.Tag = SkillTag;
Skills.CarouselDots = CarouselDots;

export { Skills };
