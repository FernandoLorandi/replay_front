import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import {
  type CmsWebhookPayload,
  resolveRevalidationTargets,
} from '@/lib/strapi/revalidation';

function isAuthorized(request: NextRequest, payload: CmsWebhookPayload) {
  const secret =
    request.headers.get('x-strapi-webhook-secret') ?? payload.secret ?? '';

  return secret !== '' && secret === process.env.STRAPI_WEBHOOK_SECRET;
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as
    | CmsWebhookPayload
    | null;

  if (!payload || !isAuthorized(request, payload)) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { paths, tags } = resolveRevalidationTargets(payload);

  for (const tag of tags) {
    revalidateTag(tag, 'max');
  }

  for (const entry of paths) {
    if (entry.type) {
      revalidatePath(entry.path, entry.type);
      continue;
    }

    revalidatePath(entry.path);
  }

  return NextResponse.json({
    paths,
    revalidated: true,
    tags,
  });
}
