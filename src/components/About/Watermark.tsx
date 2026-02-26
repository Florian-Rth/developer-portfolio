import { SectionWatermark } from "@components/ui/SectionWatermark";
import type React from "react";

type WatermarkProps = {
  className?: string;
};

export const Watermark: React.FC<WatermarkProps> = ({ className }) => {
  return <SectionWatermark text="about" className={className} />;
};
