import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateQRCode } from '@/lib/qrcode';

export async function GET(
  request: Request,
  { params }: { params: { ticketId: string } }
) {
  try {
    const ticketId = params.ticketId;

    // Find ticket
    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      return new NextResponse('Ticket not found', { status: 404 });
    }

    // Generate QR code
    const qrCodeDataUrl = await generateQRCode(ticket.qrCode);

    // Create HTML page with ticket that can be saved as image
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NO LOVERS HERE - Ticket</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .ticket-container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.15);
      overflow: hidden;
      max-width: 900px;
      width: 100%;
    }
    .ticket {
      display: flex;
      background: white;
    }
    .ticket-left {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 350px;
    }
    .qr-container {
      background: white;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    }
    .qr-container img {
      display: block;
      width: 250px;
      height: 250px;
    }
    .scan-text {
      color: white;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 2px;
      margin-top: 30px;
      text-align: center;
    }
    .ticket-right {
      padding: 50px;
      flex: 1;
    }
    .event-title {
      font-size: 42px;
      font-weight: 900;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
      letter-spacing: 3px;
    }
    .divider {
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
      margin-bottom: 40px;
      width: 100%;
    }
    .detail-section {
      margin-bottom: 30px;
    }
    .detail-label {
      color: #667eea;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 8px;
    }
    .detail-value {
      color: #1a1a1a;
      font-size: 24px;
      font-weight: 700;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      margin-bottom: 30px;
    }
    .ticket-id {
      color: #999;
      font-size: 11px;
      margin-top: 40px;
      text-align: center;
      font-family: monospace;
    }
    .download-btn {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 30px;
      border-radius: 50px;
      font-weight: 700;
      text-decoration: none;
      box-shadow: 0 8px 20px rgba(102,126,234,0.3);
      cursor: pointer;
      border: none;
      font-size: 16px;
      z-index: 1000;
    }
    .download-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(102,126,234,0.4);
    }
    @media print {
      body { background: white; }
      .download-btn { display: none; }
    }
    @media (max-width: 768px) {
      .ticket { flex-direction: column; }
      .ticket-left { min-width: 100%; }
      .ticket-right { padding: 30px; }
      .event-title { font-size: 32px; }
    }
  </style>
</head>
<body>
  <button class="download-btn" onclick="window.print()">📥 Save as PDF</button>
  
  <div class="ticket-container">
    <div class="ticket">
      <div class="ticket-left">
        <div class="qr-container">
          <img src="${qrCodeDataUrl}" alt="QR Code" />
        </div>
        <div class="scan-text">SCAN AT ENTRANCE</div>
      </div>
      
      <div class="ticket-right">
        <div class="event-title">NO LOVERS HERE</div>
        <div class="divider"></div>
        
        <div class="detail-section">
          <div class="detail-label">👤 NAME</div>
          <div class="detail-value">${ticket.name || 'Guest'}</div>
        </div>
        
        <div class="detail-grid">
          <div class="detail-section">
            <div class="detail-label">🎫 TICKET TYPE</div>
            <div class="detail-value">${ticket.ticketType}</div>
          </div>
          
          <div class="detail-section">
            <div class="detail-label">📅 DATE</div>
            <div class="detail-value">Feb 14, 2026</div>
          </div>
        </div>
        
        <div class="detail-section">
          <div class="detail-label">⏰ TIME</div>
          <div class="detail-value">9:00 PM - 12:00 AM</div>
        </div>
        
        <div class="detail-section">
          <div class="detail-label">📍 VENUE</div>
          <div class="detail-value" style="font-size: 16px; line-height: 1.5;">
            CJ&J Lounge, Suites and Apartment Ltd<br>
            <span style="font-size: 14px; color: #666;">184 NTA/Choba, Port Harcourt</span>
          </div>
        </div>
        
        <div class="ticket-id">TICKET ID: ${ticket.qrCode}</div>
      </div>
    </div>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating ticket:', error);
    return new NextResponse('Error generating ticket', { status: 500 });
  }
}
