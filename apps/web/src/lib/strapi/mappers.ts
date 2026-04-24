import type { TeamMember } from '../../types/member.ts';
import type { NavItem } from '../../types/navigation.ts';
import type { PartnerLogo, ProjectSummary } from '../../types/cms.ts';
import { projectCategories } from '../../types/cms.ts';
import { toAbsoluteMediaUrl, getResponseData } from './shared.ts';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function unwrapEntity(entity: unknown) {
  if (!isRecord(entity)) {
    return null;
  }

  const attributes = isRecord(entity.attributes) ? entity.attributes : entity;
  return attributes;
}

function getTextField(
  record: Record<string, unknown>,
  ...keys: string[]
): string | null {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }

  return null;
}

function getMediaField(record: Record<string, unknown>, key: string) {
  const mediaValue = record[key];

  if (!mediaValue) {
    return null;
  }

  const mediaEntity =
    isRecord(mediaValue) && 'data' in mediaValue ? mediaValue.data : mediaValue;
  const mediaRecord = unwrapEntity(mediaEntity);

  if (!mediaRecord) {
    return null;
  }

  const url = getTextField(mediaRecord, 'url');
  const alt = getTextField(mediaRecord, 'alternativeText', 'name');

  return {
    alt,
    url: toAbsoluteMediaUrl(url),
  };
}

function toProjectCategory(value: string | null) {
  if (!value) {
    return projectCategories[0];
  }

  return projectCategories.includes(value as (typeof projectCategories)[number])
    ? (value as (typeof projectCategories)[number])
    : projectCategories[0];
}

function toProjectSummary(entity: unknown): ProjectSummary | null {
  const record = unwrapEntity(entity);

  if (!record) {
    return null;
  }

  const slug = getTextField(record, 'slug');
  const title = getTextField(record, 'title', 'name');
  const media =
    getMediaField(record, 'image') ??
    getMediaField(record, 'cover') ??
    getMediaField(record, 'coverImage');

  if (!slug || !title) {
    return null;
  }

  return {
    slug,
    title,
    category: toProjectCategory(getTextField(record, 'category')),
    imageAlt: media?.alt ?? title,
    imageSrc: media?.url ?? '/continentalImage.png',
    summary: getTextField(record, 'summary', 'excerpt', 'description') ?? '',
  };
}

function toPartnerLogo(entity: unknown): PartnerLogo | null {
  const record = unwrapEntity(entity);

  if (!record) {
    return null;
  }

  const name = getTextField(record, 'name', 'title');
  const media = getMediaField(record, 'logo');

  if (!name) {
    return null;
  }

  return {
    logoAlt: media?.alt ?? `Logo ${name}`,
    logoSrc: media?.url ?? '/continentalLogo.png',
    name,
  };
}

function toTeamMember(entity: unknown): TeamMember | null {
  const record = unwrapEntity(entity);

  if (!record) {
    return null;
  }

  const memberName = getTextField(record, 'memberName', 'name');
  const position = getTextField(record, 'position', 'role');
  const media =
    getMediaField(record, 'photo') ?? getMediaField(record, 'image');

  if (!memberName || !position) {
    return null;
  }

  return {
    alt: media?.alt ?? `Foto de ${memberName}`,
    memberName,
    position,
    src: media?.url ?? '/image01.png',
  };
}

export function mapProjectsResponse(payload: unknown) {
  const data = getResponseData(payload);

  if (!Array.isArray(data)) {
    return null;
  }

  const projects = data
    .map((entry) => toProjectSummary(entry))
    .filter((entry): entry is ProjectSummary => entry !== null);

  return projects.length > 0 ? projects : null;
}

export function mapProjectResponse(payload: unknown) {
  const data = getResponseData(payload);
  const record = Array.isArray(data) ? data[0] : data;

  return record ? toProjectSummary(record) : null;
}

export function mapPartnersResponse(payload: unknown) {
  const data = getResponseData(payload);

  if (!Array.isArray(data)) {
    return null;
  }

  const partners = data
    .map((entry) => toPartnerLogo(entry))
    .filter((entry): entry is PartnerLogo => entry !== null);

  return partners.length > 0 ? partners : null;
}

export function mapMembersResponse(payload: unknown) {
  const data = getResponseData(payload);

  if (!Array.isArray(data)) {
    return null;
  }

  const members = data
    .map((entry) => toTeamMember(entry))
    .filter((entry): entry is TeamMember => entry !== null);

  return members.length > 0 ? members : null;
}

export function mapNavigationResponse(payload: unknown) {
  const data = getResponseData(payload);
  const record = Array.isArray(data) ? data[0] : data;
  const navigationRecord = unwrapEntity(record);

  if (!navigationRecord) {
    return null;
  }

  const items = navigationRecord.items;

  if (!Array.isArray(items)) {
    return null;
  }

  const navigationItems: NavItem[] = items
    .map((item): NavItem | null => {
      const navigationItem = unwrapEntity(item);

      if (!navigationItem) {
        return null;
      }

      const href = getTextField(navigationItem, 'href', 'url');
      const label = getTextField(navigationItem, 'label', 'title');

      if (!href || !label) {
        return null;
      }

      return {
        external: Boolean(navigationItem.external),
        href,
        label,
      };
    })
    .filter((item): item is NavItem => item !== null);

  return navigationItems.length > 0 ? navigationItems : null;
}
