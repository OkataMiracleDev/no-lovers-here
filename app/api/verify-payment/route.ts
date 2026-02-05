import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateQRCode } from '@/lib/qrcode';
import { sendTicketEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    // Verify payment with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paystackData = await paystackResponse.json();

    if (!paystackData.status || paystackData.data.status !== 'success') {
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 400 }
      );
    }

    const { email, amount, metadata } = paystackData.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ticketType = metadata.custom_fields.find((f: any) => f.variable_name === 'ticket')?.value || 'Unknown';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customerName = metadata.custom_fields.find((f: any) => f.variable_name === 'name')?.value || email.split('@')[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quantity = parseInt(metadata.custom_fields.find((f: any) => f.variable_name === 'quantity')?.value || '1');

    // Check if ticket already exists
    const existingTicket = await prisma.ticket.findFirst({
      where: { 
        paymentRef: {
          startsWith: reference
        }
      },
    });

    if (existingTicket) {
      // Return all tickets for this payment reference
      const allTickets = await prisma.ticket.findMany({
        where: {
          paymentRef: {
            startsWith: reference
          }
        }
      });
      return NextResponse.json({ tickets: allTickets, success: true });
    }

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

    // Create tickets (one or multiple)
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const ticketId = `NLH-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const qrCodeData = await generateQRCode(ticketId);

      const ticket = await prisma.ticket.create({
        data: {
          email,
          name: customerName,
          ticketType,
          amount: amount / 100 / quantity,
          paymentRef: `${reference}-${i + 1}`,
          qrCode: ticketId,
        },
      });

      tickets.push({ ticket, qrCodeData });
    }

    // Update ticket count
    await prisma.settings.update({
      where: { id: 'settings' },
      data: {
        menTicketsSold: ticketType === 'Men' ? { increment: quantity } : undefined,
        womenTicketsSold: ticketType === 'Women' ? { increment: quantity } : undefined,
      },
    });

    // Send email with all tickets
    for (const { ticket, qrCodeData } of tickets) {
      await sendTicketEmail(
        email,
        customerName,
        ticketType,
        qrCodeData,
        ticket.id
      );
    }

    return NextResponse.json({ tickets, success: true, quantity });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
