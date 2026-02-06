import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { settingsId: 'settings' },
    });

    if (!settings) {
      return NextResponse.json({
        menAvailable: 0,
        womenAvailable: 0,
        menPrice: 18000,
        womenPrice: 8000,
      });
    }

    const menAvailable = Math.max(0, settings.maxMenTickets - settings.menTicketsSold);
    const womenAvailable = Math.max(0, settings.maxWomenTickets - settings.womenTicketsSold);

    return NextResponse.json({
      menAvailable,
      womenAvailable,
      menPrice: settings.menTicketPrice,
      womenPrice: settings.womenTicketPrice,
      menSold: settings.menTicketsSold,
      womenSold: settings.womenTicketsSold,
      maxMenTickets: settings.maxMenTickets,
      maxWomenTickets: settings.maxWomenTickets,
    });
  } catch (error) {
    console.error('Error fetching ticket availability:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ticket availability' },
      { status: 500 }
    );
  }
}
