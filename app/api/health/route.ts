import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    const settingsCount = await prisma.settings.count();
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: {
        hasPaystackSecret: !!process.env.PAYSTACK_SECRET_KEY,
        hasPaystackPublic: !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        hasBrevoKey: !!process.env.BREVO_API_KEY,
        hasBrevoEmail: !!process.env.BREVO_SENDER_EMAIL,
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasAdminSecret: !!process.env.ADMIN_SECRET,
      },
      database: {
        connected: true,
        settingsCount,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        environment: {
          hasPaystackSecret: !!process.env.PAYSTACK_SECRET_KEY,
          hasPaystackPublic: !!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
          hasBrevoKey: !!process.env.BREVO_API_KEY,
          hasBrevoEmail: !!process.env.BREVO_SENDER_EMAIL,
          hasDatabaseUrl: !!process.env.DATABASE_URL,
          hasAdminSecret: !!process.env.ADMIN_SECRET,
        },
        database: {
          connected: false,
        },
      },
      { status: 500 }
    );
  }
}
