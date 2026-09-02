import { NextResponse } from 'next/server';
import { db } from '@/db';
import { requestLogs } from '@/db/schema';

export async function POST(req: Request) {
  try {
    const { path, statusCode, durationMs } = await req.json();

    if (typeof path !== 'string' || typeof statusCode !== 'number' || typeof durationMs !== 'number') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await db.insert(requestLogs).values({
      path,
      statusCode,
      durationMs: Math.round(durationMs),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to log request' }, { status: 500 });
  }
}
