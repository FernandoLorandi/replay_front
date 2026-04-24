import type { TeamMember } from './member.ts';
import type { NavItem } from './navigation.ts';

export const projectCategories = [
  'Institucionais',
  'Reels',
  'Varejo',
  'Inteligencia Artificial',
  'Motions Graphics',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectSummary = {
  slug: string;
  title: string;
  category: ProjectCategory;
  imageSrc: string;
  imageAlt: string;
  summary: string;
};

export type PartnerLogo = {
  name: string;
  logoSrc: string;
  logoAlt: string;
};

export type HomePageData = {
  featuredProject: ProjectSummary | null;
  navigationItems: NavItem[];
  partners: PartnerLogo[];
  projects: ProjectSummary[];
  projectCategories: readonly ProjectCategory[];
};

export type TeamPageData = {
  members: TeamMember[];
  navigationItems: NavItem[];
};
