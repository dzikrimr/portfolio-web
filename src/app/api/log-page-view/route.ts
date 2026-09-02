import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { pageViews } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { visitorId, path, durationMs, viewId } = body;

    if (typeof viewId === 'number') {
      if (typeof durationMs !== 'number') {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
      }
      await db.update(pageViews).set({ durationMs: Math.round(durationMs) }).where(eq(pageViews.id, viewId));
      return NextResponse.json({ ok: true });
    }

    if (typeof visitorId !== 'string' || typeof path !== 'string') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const [row] = await db.insert(pageViews).values({ visitorId, path }).returning({ id: pageViews.id });
    return NextResponse.json({ ok: true, viewId: row.id });
  } catch {
    return NextResponse.json({ error: 'Failed to log page view' }, { status: 500 });
  }
}
