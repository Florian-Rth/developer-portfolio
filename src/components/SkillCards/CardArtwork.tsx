import type { Skill } from "@/data/skills";
import type React from "react";
import { Suspense, lazy } from "react";
import { FallbackArtwork } from "./artworks/FallbackArtwork";
import { GitArtwork } from "./artworks/GitArtwork";
import { JavaScriptArtwork } from "./artworks/JavaScriptArtwork";
import { TailwindArtwork } from "./artworks/TailwindArtwork";
import { TypeScriptArtwork } from "./artworks/TypeScriptArtwork";
import { ViteArtwork } from "./artworks/ViteArtwork";

const ReactArtwork = lazy(() =>
  import("./artworks/ReactArtwork").then((m) => ({ default: m.ReactArtwork })),
);
const CSharpArtwork = lazy(() =>
  import("./artworks/CSharpArtwork").then((m) => ({ default: m.CSharpArtwork })),
);
const DockerArtwork = lazy(() =>
  import("./artworks/DockerArtwork").then((m) => ({ default: m.DockerArtwork })),
);

type CardArtworkProps = {
  skill: Skill;
  className?: string;
};

const R3FFallback: React.FC<{ skill: Skill }> = ({ skill }) => (
  <FallbackArtwork initial={skill.name[0]} category={skill.category} />
);

const artworkMap: Record<string, React.FC> = {
  typescript: TypeScriptArtwork,
  javascript: JavaScriptArtwork,
  tailwind: TailwindArtwork,
  git: GitArtwork,
  vite: ViteArtwork,
};

const r3fArtworkIds = new Set(["react", "csharp", "docker"]);

export const CardArtwork: React.FC<CardArtworkProps> = ({ skill, className }) => {
  const ArtworkComponent = artworkMap[skill.id];

  if (ArtworkComponent) {
    return (
      <div className={className}>
        <ArtworkComponent />
      </div>
    );
  }

  if (r3fArtworkIds.has(skill.id)) {
    const R3FComponent =
      skill.id === "react" ? ReactArtwork : skill.id === "csharp" ? CSharpArtwork : DockerArtwork;

    return (
      <div className={className}>
        <Suspense fallback={<R3FFallback skill={skill} />}>
          <R3FComponent />
        </Suspense>
      </div>
    );
  }

  return (
    <div className={className}>
      <FallbackArtwork initial={skill.name[0]} category={skill.category} />
    </div>
  );
};
