import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendBulkEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { recipients, subject, htmlContent } = await request.json();

    let emailList: { email: string; name: string }[] = [];

    if (recipients === 'all') {
      const tickets = await prisma.ticket.findMany({
        where: { status: 'active' },
        select: { email: true, name: true },
      });
      emailList = tickets.map((t: { email: string; name: string | null }) => ({
        email: t.email,
        name: t.name || t.email.split('@')[0]
      }));
    } else {
      emailList = recipients;
    }

    const result = await sendBulkEmail(emailList, subject, htmlContent);

    return NextResponse.json({ success: result.success });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
