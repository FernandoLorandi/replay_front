import 'server-only';

import { cache } from 'react';
import type { HomePageData, TeamPageData } from '@/types/cms';
import type { NavItem } from '@/types/navigation';
import { members as memberFixtures } from '@/data/fixtures/members';
import { navigationItems as navigationFixtures } from '@/data/fixtures/navigation';
import { partners as partnerFixtures } from '@/data/fixtures/partners';
import { projects as projectFixtures } from '@/data/fixtures/projects';
import { projectCategories } from '@/types/cms';
import { fetchStrapiJson } from '@/lib/strapi/client';
import {
  mapMembersResponse,
  mapNavigationResponse,
  mapPartnersResponse,
  mapProjectResponse,
  mapProjectsResponse,
} from '@/lib/strapi/mappers';
import { STRAPI_TAGS } from '@/lib/strapi/revalidation';

const PROJECT_QUERY = {
  'populate[coverImage]': '*',
  'sort[0]': 'title:asc',
};

const PROJECT_BY_SLUG_QUERY = (slug: string) => ({
  ...PROJECT_QUERY,
  'filters[slug][$eq]': slug,
});

const TEAM_QUERY = {
  'populate[photo]': '*',
  'sort[0]': 'name:asc',
};

const PARTNER_QUERY = {
  'populate[logo]': '*',
  'sort[0]': 'name:asc',
};

function sortNavigationItems(items: NavItem[]) {
  return [...items];
}

export const getNavigationItems = cache(async () => {
  const payload = await fetchStrapiJson<unknown>('/api/navigation', {
    tags: [STRAPI_TAGS.navigation],
  });

  return sortNavigationItems(
    mapNavigationResponse(payload) ?? navigationFixtures
  );
});

export const getProjects = cache(async () => {
  const payload = await fetchStrapiJson<unknown>('/api/projects', {
    query: PROJECT_QUERY,
    tags: [STRAPI_TAGS.projects],
  });

  return mapProjectsResponse(payload) ?? projectFixtures;
});

export const getProjectBySlug = cache(async (slug: string) => {
  const payload = await fetchStrapiJson<unknown>('/api/projects', {
    query: PROJECT_BY_SLUG_QUERY(slug),
    tags: [STRAPI_TAGS.projects],
  });

  const project = mapProjectResponse(payload);

  if (project) {
    return project;
  }

  return projectFixtures.find((entry) => entry.slug === slug) ?? null;
});

export const getPartners = cache(async () => {
  const payload = await fetchStrapiJson<unknown>('/api/partners', {
    query: PARTNER_QUERY,
    tags: [STRAPI_TAGS.home, STRAPI_TAGS.partners],
  });

  return mapPartnersResponse(payload) ?? partnerFixtures;
});

export const getMembers = cache(async () => {
  const payload = await fetchStrapiJson<unknown>('/api/team-members', {
    query: TEAM_QUERY,
    tags: [STRAPI_TAGS.members],
  });

  return mapMembersResponse(payload) ?? memberFixtures;
});

export async function getHomePageData(): Promise<HomePageData> {
  const [navigationItems, partners, projects] = await Promise.all([
    getNavigationItems(),
    getPartners(),
    getProjects(),
  ]);

  const featuredProject =
    projects.find((project) => project.category === 'Institucionais') ??
    projects[0] ??
    null;

  return {
    featuredProject,
    navigationItems,
    partners,
    projectCategories,
    projects,
  };
}

export async function getTeamPageData(): Promise<TeamPageData> {
  const [members, navigationItems] = await Promise.all([
    getMembers(),
    getNavigationItems(),
  ]);

  return {
    members,
    navigationItems,
  };
}
