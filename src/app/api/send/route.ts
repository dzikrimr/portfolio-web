import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { contactSubmissions } from '@/db/schema';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await db.insert(contactSubmissions).values({ name, email, message }).catch(() => {});

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM!,
      to: [process.env.CONTACT_TO!], 
      subject: `New Message from ${name}`,
      replyTo: email, 
        html: `
        <div style="font-family: 'Courier New', Courier, monospace; background-color: #050505; color: #ffffff; padding: 20px; border-radius: 8px;">
            <h3 style="color: #ffffff; border-bottom: 1px solid #333; padding-bottom: 10px;">[INCOMING_TRANSMISSION]</h3>
            <p><strong>SENDER_NAME:</strong> ${name}</p>
            <p><strong>SENDER_EMAIL:</strong> ${email}</p>
            <div style="margin-top: 20px; border-left: 2px solid #ffffff; padding-left: 15px;">
            <p style="color: #888;">// MESSAGE_BODY</p>
            <p style="color: #e0e0e0;">${message}</p>
            </div>
            <hr style="border: 0; border-top: 1px solid #333; margin-top: 30px;" />
            <p style="font-size: 10px; color: #555;">Sent from dzikrimrdev.web.id portal</p>
        </div>
        `,
    });

    if (error) return NextResponse.json({ error }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}