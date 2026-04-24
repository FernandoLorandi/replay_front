import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

function getSafeRedirectTarget(nextPath: string | null) {
  if (!nextPath || !nextPath.startsWith('/')) {
    return '/';
  }

  return nextPath;
}

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const slug = request.nextUrl.searchParams.get('slug');

  if (!secret || secret !== process.env.STRAPI_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(
    new URL(getSafeRedirectTarget(slug), request.nextUrl.origin)
  );
}
