import 'server-only';

import { draftMode } from 'next/headers';
import { getResponseData, toAbsoluteMediaUrl } from './shared.ts';

type QueryValue =
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | undefined;

type FetchStrapiOptions = {
  draftMode?: boolean;
  query?: Record<string, QueryValue>;
  revalidate?: number;
  tags?: string[];
};

const DEFAULT_REVALIDATE_SECONDS = 300;

function buildQueryString(query?: Record<string, QueryValue>) {
  const searchParams = new URLSearchParams();

  if (!query) {
    return '';
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const entry of value) {
        searchParams.append(key, String(entry));
      }

      continue;
    }

    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

function getStrapiUrl() {
  return process.env.STRAPI_URL?.replace(/\/$/, '');
}

export function isStrapiConfigured() {
  return Boolean(getStrapiUrl());
}

export async function fetchStrapiJson<T>(
  pathname: string,
  options: FetchStrapiOptions = {}
) {
  const baseUrl = getStrapiUrl();

  if (!baseUrl) {
    return null;
  }

  const isDraftModeEnabled =
    options.draftMode === false ? false : (await draftMode()).isEnabled;
  const token = process.env.STRAPI_API_TOKEN;
  const headers = new Headers({
    Accept: 'application/json',
  });

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const requestInit = isDraftModeEnabled
    ? {
        cache: 'no-store' as const,
        headers,
      }
    : {
        headers,
        next: {
          revalidate: options.revalidate ?? DEFAULT_REVALIDATE_SECONDS,
          tags: options.tags ?? [],
        },
      };

  const response = await fetch(
    `${baseUrl}${pathname}${buildQueryString(options.query)}`,
    requestInit
  ).catch(() => null);

  if (!response || !response.ok) {
    return null;
  }

  const payload = (await response.json().catch(() => null)) as T | null;
  return payload;
}
export { getResponseData, toAbsoluteMediaUrl };
