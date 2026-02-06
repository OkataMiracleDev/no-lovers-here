import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const settings = await prisma.settings.upsert({
      where: { settingsId: 'settings' },
      update: {},
      create: { settingsId: 'settings' },
    });

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { maxTickets, maxMenTickets, maxWomenTickets, menTicketPrice, womenTicketPrice } = await request.json();

    console.log('Updating settings with:', { maxTickets, maxMenTickets, maxWomenTickets, menTicketPrice, womenTicketPrice });

    // Ensure we use the provided values, even if they're 0
    const updateData = {
      maxTickets: maxTickets ?? 500,
      maxMenTickets: maxMenTickets ?? 250,
      maxWomenTickets: maxWomenTickets ?? 250,
      menTicketPrice: menTicketPrice ?? 18000,
      womenTicketPrice: womenTicketPrice ?? 8000,
    };

    console.log('Update data:', updateData);

    const settings = await prisma.settings.upsert({
      where: { settingsId: 'settings' },
      update: updateData,
      create: { 
        settingsId: 'settings',
        ...updateData
      },
    });

    console.log('Settings updated:', settings);

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
