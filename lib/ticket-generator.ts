export async function generateTicketHTML(
  name: string,
  email: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  // Create an HTML-based ticket that will be converted to image
  // Using simple HTML/CSS that renders well as an image
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      width: 800px;
      height: 400px;
      overflow: hidden;
    }
    
    .ticket-container {
      width: 800px;
      height: 400px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      display: flex;
    }
    
    .ticket-inner {
      width: 100%;
      height: 100%;
      background: white;
      border-radius: 16px;
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
      padding: 30px 20px;
    }
    
    .qr-box {
      background: white;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
    }
    
    .qr-box img {
      width: 220px;
      height: 220px;
      display: block;
    }
    
    .scan-text {
      color: white;
      font-size: 14px;
      font-weight: 700;
      text-align: center;
      letter-spacing: 1.5px;
    }
    
    .right-section {
      flex: 1;
      padding: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .event-title {
      font-size: 36px;
      font-weight: 900;
      color: #1a1a1a;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    
    .divider {
      width: 100%;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 2px;
      margin-bottom: 25px;
    }
    
    .info-row {
      margin-bottom: 22px;
    }
    
    .info-label {
      font-size: 12px;
      font-weight: 700;
      color: #667eea;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 6px;
    }
    
    .info-value {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
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
  <div class="ticket-container">
    <div class="ticket-inner">
      <div class="left-section">
        <div class="qr-box">
          <img src="${qrCodeDataUrl}" alt="QR Code">
        </div>
        <div class="scan-text">SCAN AT ENTRANCE</div>
      </div>
      <div class="right-section">
        <div>
          <div class="event-title">NO LOVERS HERE</div>
          <div class="divider"></div>
          
          <div class="info-row">
            <div class="info-label">NAME</div>
            <div class="info-value">${name}</div>
          </div>
          
          <div class="info-row">
            <div class="info-label">TICKET TYPE</div>
            <div class="info-value">${ticketType}</div>
          </div>
          
          <div class="info-row">
            <div class="info-label">DATE</div>
            <div class="info-value">February 14, 2026</div>
          </div>
          
          <div class="info-row">
            <div class="info-label">TIME</div>
            <div class="info-value">9:00 PM - 12:00 AM</div>
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

// For email attachment, we'll just use the QR code with text overlay
export async function generateSimpleTicketImage(
  name: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  // Return the QR code data URL as-is
  // The email will handle the display
  return qrCodeDataUrl;
}
