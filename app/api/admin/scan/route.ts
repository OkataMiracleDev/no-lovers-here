import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { qrCode, scannedBy } = await request.json();

    const ticket = await prisma.ticket.findUnique({
      where: { qrCode },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found', valid: false },
        { status: 404 }
      );
    }

    if (ticket.status === 'used') {
      return NextResponse.json({
        error: 'Ticket already used',
        valid: false,
        ticket,
        scannedAt: ticket.scannedAt,
      });
    }

    if (ticket.status === 'cancelled') {
      return NextResponse.json({
        error: 'Ticket cancelled',
        valid: false,
        ticket,
      });
    }

    // Mark ticket as used
    const updatedTicket = await prisma.ticket.update({
      where: { qrCode },
      data: {
        status: 'used',
        scannedAt: new Date(),
        scannedBy,
      },
    });

    return NextResponse.json({
      valid: true,
      ticket: updatedTicket,
      message: 'Ticket validated successfully',
    });
  } catch (error) {
    console.error('Error scanning ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
