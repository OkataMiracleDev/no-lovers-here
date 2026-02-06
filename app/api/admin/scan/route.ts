import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Scan Request Started ===');
    
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      console.log('Unauthorized scan attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { qrCode, scannedBy } = await request.json();
    console.log('Scanning QR code:', qrCode);
    console.log('Scanned by:', scannedBy);

    if (!qrCode) {
      return NextResponse.json(
        { error: 'QR code is required', valid: false },
        { status: 400 }
      );
    }

    // Find ticket by qrCode
    const ticket = await prisma.ticket.findFirst({
      where: { qrCode: qrCode.trim() },
    }).catch(err => {
      console.error('Database error finding ticket:', err);
      throw new Error(`Database error: ${err.message}`);
    });

    console.log('Ticket found:', ticket ? 'Yes' : 'No');

    if (!ticket) {
      return NextResponse.json(
        { error: 'Ticket not found', valid: false },
        { status: 404 }
      );
    }

    console.log('Ticket status:', ticket.status);

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
    console.log('Marking ticket as used...');
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        status: 'used',
        scannedAt: new Date(),
        scannedBy: scannedBy || 'Admin',
      },
    }).catch(err => {
      console.error('Database error updating ticket:', err);
      throw new Error(`Failed to update ticket: ${err.message}`);
    });

    console.log('Ticket validated successfully');
    return NextResponse.json({
      valid: true,
      ticket: updatedTicket,
      message: 'Ticket validated successfully',
    });
  } catch (error) {
    console.error('=== Scan Error ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        valid: false
      },
      { status: 500 }
    );
  }
}
