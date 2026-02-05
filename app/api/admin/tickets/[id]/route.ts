import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Get ticket to update counts
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Delete ticket
    await prisma.ticket.delete({
      where: { id },
    });

    // Update ticket count
    await prisma.settings.update({
      where: { settingsId: 'settings' },
      data: {
        menTicketsSold: ticket.ticketType === 'Men' ? { decrement: 1 } : undefined,
        womenTicketsSold: ticket.ticketType === 'Women' ? { decrement: 1 } : undefined,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
