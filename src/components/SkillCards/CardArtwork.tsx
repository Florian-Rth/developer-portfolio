import type { Skill } from "@/data/skills";
import type React from "react";
import { CSharpArtwork } from "./artworks/CSharpArtwork";
import { CiCdArtwork } from "./artworks/CiCdArtwork";
import { DockerArtwork } from "./artworks/DockerArtwork";
import { DotnetArtwork } from "./artworks/DotnetArtwork";
import { FallbackArtwork } from "./artworks/FallbackArtwork";
import { GitArtwork } from "./artworks/GitArtwork";
import { GithubActionsArtwork } from "./artworks/GithubActionsArtwork";
import { GitopsArtwork } from "./artworks/GitopsArtwork";
import { HtmlCssArtwork } from "./artworks/HtmlCssArtwork";
import { JavaScriptArtwork } from "./artworks/JavaScriptArtwork";
import { KubernetesArtwork } from "./artworks/KubernetesArtwork";
import { ReactArtwork } from "./artworks/ReactArtwork";
import { RestApiArtwork } from "./artworks/RestApiArtwork";
import { TailwindArtwork } from "./artworks/TailwindArtwork";
import { TypeScriptArtwork } from "./artworks/TypeScriptArtwork";
import { ViteArtwork } from "./artworks/ViteArtwork";

type CardArtworkProps = {
  skill: Skill;
  className?: string;
};

const artworkMap: Record<string, React.FC> = {
  react: ReactArtwork,
  typescript: TypeScriptArtwork,
  javascript: JavaScriptArtwork,
  tailwind: TailwindArtwork,
  csharp: CSharpArtwork,
  dotnet: DotnetArtwork,
  "rest-apis": RestApiArtwork,
  docker: DockerArtwork,
  kubernetes: KubernetesArtwork,
  cicd: CiCdArtwork,
  "github-actions": GithubActionsArtwork,
  gitops: GitopsArtwork,
  git: GitArtwork,
  vite: ViteArtwork,
  "html-css": HtmlCssArtwork,
};

export const CardArtwork: React.FC<CardArtworkProps> = ({ skill, className }) => {
  const ArtworkComponent = artworkMap[skill.id];

  if (ArtworkComponent) {
    return (
      <div className={className}>
        <ArtworkComponent />
      </div>
    );
  }

  return (
    <div className={className}>
      <FallbackArtwork initial={skill.name[0]} category={skill.category} />
    </div>
  );
};
