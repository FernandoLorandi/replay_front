export const STRAPI_TAGS = {
  home: 'home',
  members: 'members',
  navigation: 'navigation',
  partners: 'partners',
  projects: 'projects',
} as const;

export type RevalidationPath = {
  path: string;
  type?: 'layout' | 'page';
};

export type CmsWebhookPayload = {
  model?: string;
  paths?: Array<RevalidationPath | string>;
  secret?: string;
  slug?: string;
  tags?: string[];
};

function normalizePathEntry(entry: RevalidationPath | string) {
  return typeof entry === 'string' ? { path: entry } : entry;
}

export function resolveRevalidationTargets(payload: CmsWebhookPayload) {
  const tags = new Set<string>(payload.tags ?? []);
  const pathMap = new Map<string, RevalidationPath>();

  for (const entry of payload.paths ?? []) {
    const normalized = normalizePathEntry(entry);
    pathMap.set(`${normalized.path}:${normalized.type ?? 'literal'}`, normalized);
  }

  switch (payload.model) {
    case 'navigation':
      tags.add(STRAPI_TAGS.navigation);
      pathMap.set('/', { path: '/' });
      break;
    case 'partner':
    case 'partners':
      tags.add(STRAPI_TAGS.partners);
      pathMap.set('/', { path: '/' });
      break;
    case 'member':
    case 'team-member':
      tags.add(STRAPI_TAGS.members);
      pathMap.set('/equipe', { path: '/equipe' });
      break;
    case 'project':
      tags.add(STRAPI_TAGS.projects);
      pathMap.set('/', { path: '/' });
      pathMap.set('/projetos', { path: '/projetos' });

      if (payload.slug) {
        pathMap.set(`/projetos/${payload.slug}`, {
          path: `/projetos/${payload.slug}`,
        });
      } else {
        pathMap.set('/projetos/[slug]:page', {
          path: '/projetos/[slug]',
          type: 'page',
        });
      }
      break;
    default:
      break;
  }

  return {
    paths: [...pathMap.values()],
    tags: [...tags],
  };
}
