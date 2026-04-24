function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getStrapiUrl() {
  return process.env.STRAPI_URL?.replace(/\/$/, '');
}

export function toAbsoluteMediaUrl(url: string | null | undefined) {
  if (!url) {
    return null;
  }

  if (/^https?:\/\//.test(url)) {
    return url;
  }

  const baseUrl = getStrapiUrl();

  if (!baseUrl) {
    return url;
  }

  return new URL(url, `${baseUrl}/`).toString();
}

export function getResponseData(payload: unknown) {
  if (!isRecord(payload) || !('data' in payload)) {
    return null;
  }

  return payload.data;
}
