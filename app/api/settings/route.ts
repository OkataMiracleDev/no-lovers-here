import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.upsert({
      where: { id: 'settings' },
      update: {},
      create: { id: 'settings' },
    });

    return NextResponse.json({ 
      menTicketPrice: settings.menTicketPrice,
      womenTicketPrice: settings.womenTicketPrice,
      maxTickets: settings.maxTickets,
      menTicketsSold: settings.menTicketsSold,
      womenTicketsSold: settings.womenTicketsSold
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
