// Generate a ticket HTML that can be converted to image on the client side
export function generateTicketHTML(
  name: string,
  email: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; }
    .ticket {
      width: 800px;
      height: 400px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      position: relative;
    }
    .ticket-inner {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 12px;
      display: flex;
      overflow: hidden;
    }
    .left-section {
      width: 300px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
    }
    .qr-container {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
    }
    .qr-container img {
      width: 220px;
      height: 220px;
      display: block;
    }
    .scan-text {
      color: white;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      letter-spacing: 1px;
    }
    .right-section {
      flex: 1;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .event-title {
      font-size: 32px;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 10px;
    }
    .divider {
      width: 100%;
      height: 3px;
      background: #667eea;
      margin-bottom: 20px;
    }
    .detail-row {
      margin-bottom: 20px;
    }
    .detail-label {
      font-size: 14px;
      font-weight: bold;
      color: #667eea;
      text-transform: uppercase;
      margin-bottom: 5px;
    }
    .detail-value {
      font-size: 18px;
      color: #1a1a1a;
      font-weight: 600;
    }
    .ticket-id {
      font-size: 10px;
      color: #999;
      text-align: center;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="ticket">
    <div class="ticket-inner">
      <div class="left-section">
        <div class="qr-container">
          <img src="${qrCodeDataUrl}" alt="QR Code" />
        </div>
        <div class="scan-text">SCAN AT ENTRANCE</div>
      </div>
      <div class="right-section">
        <div>
          <div class="event-title">NO LOVERS HERE</div>
          <div class="divider"></div>
          
          <div class="detail-row">
            <div class="detail-label">Name</div>
            <div class="detail-value">${name}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Ticket Type</div>
            <div class="detail-value">${ticketType}</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Date</div>
            <div class="detail-value">February 14, 2026</div>
          </div>
          
          <div class="detail-row">
            <div class="detail-label">Time</div>
            <div class="detail-value">9:00 PM - 12:00 AM</div>
          </div>
        </div>
        
        <div class="ticket-id">Ticket ID: ${ticketId}</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// For server-side, we'll embed the ticket as a data URL in the email
export async function generateTicketDataURL(
  name: string,
  email: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  // Since we can't use canvas in serverless, we'll create a simple SVG ticket
  const svg = `
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="400" fill="url(#grad1)"/>
  
  <!-- White content area -->
  <rect x="20" y="20" width="760" height="360" fill="white" rx="12"/>
  
  <!-- Left section (purple) -->
  <rect x="20" y="20" width="300" height="360" fill="url(#grad1)" rx="12"/>
  
  <!-- QR Code background -->
  <rect x="50" y="80" width="240" height="240" fill="white" rx="8"/>
  
  <!-- QR Code -->
  <image x="60" y="90" width="220" height="220" href="${qrCodeDataUrl}"/>
  
  <!-- Scan text -->
  <text x="170" y="340" font-family="Arial" font-size="14" font-weight="bold" fill="white" text-anchor="middle">SCAN AT ENTRANCE</text>
  
  <!-- Event title -->
  <text x="340" y="70" font-family="Arial" font-size="32" font-weight="bold" fill="#1a1a1a">NO LOVERS HERE</text>
  
  <!-- Divider line -->
  <line x1="340" y1="85" x2="760" y2="85" stroke="#667eea" stroke-width="3"/>
  
  <!-- Name label -->
  <text x="340" y="120" font-family="Arial" font-size="14" font-weight="bold" fill="#667eea">NAME</text>
  <text x="340" y="145" font-family="Arial" font-size="20" fill="#1a1a1a">${name}</text>
  
  <!-- Ticket Type label -->
  <text x="340" y="185" font-family="Arial" font-size="14" font-weight="bold" fill="#667eea">TICKET TYPE</text>
  <text x="340" y="210" font-family="Arial" font-size="20" fill="#1a1a1a">${ticketType}</text>
  
  <!-- Date label -->
  <text x="340" y="250" font-family="Arial" font-size="14" font-weight="bold" fill="#667eea">DATE</text>
  <text x="340" y="275" font-family="Arial" font-size="20" fill="#1a1a1a">February 14, 2026</text>
  
  <!-- Time label -->
  <text x="340" y="315" font-family="Arial" font-size="14" font-weight="bold" fill="#667eea">TIME</text>
  <text x="340" y="340" font-family="Arial" font-size="20" fill="#1a1a1a">9:00 PM - 12:00 AM</text>
  
  <!-- Ticket ID -->
  <text x="560" y="370" font-family="Arial" font-size="10" fill="#999999" text-anchor="middle">Ticket ID: ${ticketId.substring(0, 30)}</text>
</svg>
  `;
  
  // Convert SVG to base64 data URL
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}
