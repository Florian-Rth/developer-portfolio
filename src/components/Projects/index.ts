import { CategoryBadge } from "./CategoryBadge";
import { MeshGradient } from "./MeshGradient";
import { ProjectArtwork } from "./ProjectArtwork";
import { ProjectCard } from "./ProjectCard";
import { ProjectDetailWrapper } from "./ProjectDetail";
import { Projects as ProjectsComponent } from "./Projects";
import { ProjectsGrid } from "./ProjectsGrid";
import { TechPills } from "./TechPills";

type ProjectsType = typeof ProjectsComponent & {
  Grid: typeof ProjectsGrid;
  Card: typeof ProjectCard;
  Detail: typeof ProjectDetailWrapper;
  MeshGradient: typeof MeshGradient;
  Artwork: typeof ProjectArtwork;
  CategoryBadge: typeof CategoryBadge;
  TechPills: typeof TechPills;
};

const Projects = ProjectsComponent as ProjectsType;
Projects.Grid = ProjectsGrid;
Projects.Card = ProjectCard;
Projects.Detail = ProjectDetailWrapper;
Projects.MeshGradient = MeshGradient;
Projects.Artwork = ProjectArtwork;
Projects.CategoryBadge = CategoryBadge;
Projects.TechPills = TechPills;

export { Projects };
