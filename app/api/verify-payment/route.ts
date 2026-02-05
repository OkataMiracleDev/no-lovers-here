import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateQRCode } from '@/lib/qrcode';
import { sendTicketEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Payment Verification Started ===');
    console.log('Environment check:', {
      hasPaystackKey: !!process.env.PAYSTACK_SECRET_KEY,
      hasBrevoKey: !!process.env.BREVO_API_KEY,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
    });

    const { reference } = await request.json();
    console.log('Payment reference:', reference);

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
    console.log('Paystack response:', JSON.stringify(paystackData, null, 2));

    if (!paystackData.status || paystackData.data.status !== 'success') {
      console.error('Payment not successful:', paystackData);
      return NextResponse.json(
        { error: 'Payment verification failed', details: paystackData },
        { status: 400 }
      );
    }

    // Extract data from Paystack response
    const paymentData = paystackData.data;
    const email = paymentData.customer?.email || paymentData.email;
    const amount = paymentData.amount;
    const metadata = paymentData.metadata || {};
    
    console.log('Extracted payment data:', {
      email,
      amount,
      metadata,
      customer: paymentData.customer,
    });

    if (!email) {
      console.error('Email not found in Paystack response');
      return NextResponse.json(
        { error: 'Email not found in payment data', details: paymentData },
        { status: 400 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ticketType = metadata.custom_fields?.find((f: any) => f.variable_name === 'ticket')?.value || metadata.ticket_type || 'Unknown';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const customerName = metadata.custom_fields?.find((f: any) => f.variable_name === 'name')?.value || metadata.customer_name || paymentData.customer?.first_name || email.split('@')[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const quantity = parseInt(metadata.custom_fields?.find((f: any) => f.variable_name === 'quantity')?.value || metadata.quantity || '1');

    console.log('Ticket details:', { email, ticketType, customerName, quantity });

    console.log('Checking for existing ticket...');
    // Check if ticket already exists
    const existingTicket = await prisma.ticket.findFirst({
      where: { 
        paymentRef: {
          startsWith: reference
        }
      },
    }).catch(err => {
      console.error('Database query error (findFirst):', err);
      throw new Error(`Database error: ${err.message}`);
    });

    if (existingTicket) {
      console.log('Ticket already exists, returning existing tickets');
      // Return all tickets for this payment reference
      const allTickets = await prisma.ticket.findMany({
        where: {
          paymentRef: {
            startsWith: reference
          }
        }
      }).catch(err => {
        console.error('Database query error (findMany):', err);
        throw new Error(`Database error: ${err.message}`);
      });
      return NextResponse.json({ tickets: allTickets, success: true });
    }

    console.log('Fetching settings...');
    // Check ticket limits
    const settings = await prisma.settings.upsert({
      where: { settingsId: 'settings' },
      update: {},
      create: { 
        settingsId: 'settings',
        maxTickets: 500,
        maxMenTickets: 250,
        maxWomenTickets: 250,
        menTicketsSold: 0,
        womenTicketsSold: 0,
        menTicketPrice: 18000,
        womenTicketPrice: 8000
      },
    }).catch(err => {
      console.error('Database upsert error (settings):', err);
      throw new Error(`Database error: ${err.message}`);
    });

    console.log('Settings:', settings);

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
      console.log(`Generating QR for ticket ${i + 1}/${quantity}:`, ticketId);
      
      let qrCodeData;
      try {
        qrCodeData = await generateQRCode(ticketId);
      } catch (err) {
        console.error('QR code generation error:', err);
        throw new Error(`QR generation failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }

      console.log(`Creating ticket ${i + 1}/${quantity} in database`);
      const ticket = await prisma.ticket.create({
        data: {
          email,
          name: customerName,
          ticketType,
          amount: amount / 100 / quantity,
          paymentRef: `${reference}-${i + 1}`,
          qrCode: ticketId,
        },
      }).catch(err => {
        console.error('Database create error (ticket):', err);
        throw new Error(`Failed to create ticket: ${err.message}`);
      });

      tickets.push({ ticket, qrCodeData });
    }

    console.log('Updating ticket counts...');
    // Update ticket count
    await prisma.settings.update({
      where: { settingsId: 'settings' },
      data: {
        menTicketsSold: ticketType === 'Men' ? { increment: quantity } : undefined,
        womenTicketsSold: ticketType === 'Women' ? { increment: quantity } : undefined,
      },
    }).catch(err => {
      console.error('Database update error (ticket counts):', err);
      // Don't throw here, tickets are already created
      console.warn('Failed to update ticket counts, but tickets were created');
    });

    console.log('Sending emails...');
    // Send email with all tickets
    for (const { ticket, qrCodeData } of tickets) {
      try {
        await sendTicketEmail(
          email,
          customerName,
          ticketType,
          qrCodeData,
          ticket.id
        );
        console.log(`Email sent for ticket ${ticket.id}`);
      } catch (err) {
        console.error(`Email sending error for ticket ${ticket.id}:`, err);
        // Don't throw, ticket is created, just log the error
        console.warn('Email failed but ticket was created successfully');
      }
    }

    console.log('Payment verification complete');
    return NextResponse.json({ tickets, success: true, quantity });
  } catch (error) {
    console.error('=== Payment Verification Error ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: error instanceof Error ? error.message : 'Unknown error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
