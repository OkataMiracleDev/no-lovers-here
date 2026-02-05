import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateQRCode } from '@/lib/qrcode';
import { sendTicketEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { email, name, ticketType } = await request.json();

    // Check ticket limits
    const settings = await prisma.settings.upsert({
      where: { id: 'settings' },
      update: {},
      create: { id: 'settings' },
    });

    const totalSold = settings.menTicketsSold + settings.womenTicketsSold;
    if (totalSold >= settings.maxTickets) {
      return NextResponse.json(
        { error: 'Event is sold out' },
        { status: 400 }
      );
    }

    // Create ticket
    const ticketId = `NLH-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    const qrCodeData = await generateQRCode(ticketId);

    const ticket = await prisma.ticket.create({
      data: {
        email,
        name,
        ticketType,
        amount: 0, // Complimentary
        paymentRef: `COMP-${ticketId}`,
        qrCode: ticketId,
      },
    });

    // Update ticket count
    await prisma.settings.update({
      where: { id: 'settings' },
      data: {
        menTicketsSold: ticketType === 'Men' ? { increment: 1 } : undefined,
        womenTicketsSold: ticketType === 'Women' ? { increment: 1 } : undefined,
      },
    });

    // Send email with ticket
    await sendTicketEmail(email, name || email.split('@')[0], ticketType, qrCodeData, ticket.id);

    return NextResponse.json({ ticket, success: true });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
