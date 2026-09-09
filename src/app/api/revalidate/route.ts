import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const REVALIDATABLE_PATHS = ['/', '/private-repo'] as const;

type RevalidatablePath = (typeof REVALIDATABLE_PATHS)[number];

const isRevalidatablePath = (value: unknown): value is RevalidatablePath =>
  REVALIDATABLE_PATHS.includes(value as RevalidatablePath);

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Revalidation is not configured' }, { status: 500 });
  }

  if (req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { paths } = await req.json();

    if (!Array.isArray(paths) || !paths.every(isRevalidatablePath)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    paths.forEach((path) => revalidatePath(path));
    return NextResponse.json({ ok: true, revalidated: paths });
  } catch {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
