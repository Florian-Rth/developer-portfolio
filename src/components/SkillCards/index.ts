import { SectionWatermark } from "@/components/ui/SectionWatermark";
import { CardArtwork } from "./CardArtwork";
import { CategoryBadge } from "./CategoryBadge";
import { DetailDrawer } from "./DetailDrawer";
import { MobileCardStack } from "./MobileCardStack";
import { PackTheater } from "./PackTheater/PackTheater";
import { RarityBadge } from "./RarityBadge";
import { Section } from "./Section";
import { SkillCard } from "./SkillCard";
import { SkillCardSection as SkillCardSectionComponent } from "./SkillCardSection";
import { SkillStatsList } from "./SkillStatsList";
import { StatBar } from "./StatBar";

type SkillCardSectionType = typeof SkillCardSectionComponent & {
  Section: typeof Section;
  MobileStack: typeof MobileCardStack;
  Theater: typeof PackTheater;
  Card: typeof SkillCard;
  Artwork: typeof CardArtwork;
  StatBar: typeof StatBar;
  StatsList: typeof SkillStatsList;
  RarityBadge: typeof RarityBadge;
  CategoryBadge: typeof CategoryBadge;
  Drawer: typeof DetailDrawer;
  Watermark: typeof SectionWatermark;
};

const SkillCardSection = SkillCardSectionComponent as SkillCardSectionType;
SkillCardSection.Section = Section;
SkillCardSection.MobileStack = MobileCardStack;
SkillCardSection.Theater = PackTheater;
SkillCardSection.Card = SkillCard;
SkillCardSection.Artwork = CardArtwork;
SkillCardSection.StatBar = StatBar;
SkillCardSection.StatsList = SkillStatsList;
SkillCardSection.RarityBadge = RarityBadge;
SkillCardSection.CategoryBadge = CategoryBadge;
SkillCardSection.Drawer = DetailDrawer;
SkillCardSection.Watermark = SectionWatermark;

export { SkillCardSection };
