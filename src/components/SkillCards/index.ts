import { CardArtwork } from "./CardArtwork";
import { CardDeck } from "./CardDeck";
import { CardScatterA } from "./CardScatterA";
import { CategoryBadge } from "./CategoryBadge";
import { DetailDrawer } from "./DetailDrawer";
import { RarityBadge } from "./RarityBadge";
import { SectionWatermark } from "./SectionWatermark";
import { SkillCard } from "./SkillCard";
import { SkillCardSection as SkillCardSectionComponent } from "./SkillCardSection";
import { StatBar } from "./StatBar";

type SkillCardSectionType = typeof SkillCardSectionComponent & {
  CardDeck: typeof CardDeck;
  CardScatterA: typeof CardScatterA;
  SkillCard: typeof SkillCard;
  CardArtwork: typeof CardArtwork;
  StatBar: typeof StatBar;
  RarityBadge: typeof RarityBadge;
  CategoryBadge: typeof CategoryBadge;
  DetailDrawer: typeof DetailDrawer;
  SectionWatermark: typeof SectionWatermark;
};

const SkillCardSection = SkillCardSectionComponent as SkillCardSectionType;
SkillCardSection.CardDeck = CardDeck;
SkillCardSection.CardScatterA = CardScatterA;
SkillCardSection.SkillCard = SkillCard;
SkillCardSection.CardArtwork = CardArtwork;
SkillCardSection.StatBar = StatBar;
SkillCardSection.RarityBadge = RarityBadge;
SkillCardSection.CategoryBadge = CategoryBadge;
SkillCardSection.DetailDrawer = DetailDrawer;
SkillCardSection.SectionWatermark = SectionWatermark;

export { SkillCardSection };
