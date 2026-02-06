import sharp from 'sharp';

export async function generateTicketPNG(
  name: string,
  email: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  // Escape special characters in text
  const escapeName = (text: string) => text.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });

  const safeName = escapeName(name.substring(0, 25));
  const safeTicketType = escapeName(ticketType);
  const safeTicketId = escapeName(ticketId.substring(0, 30));

  // Create SVG ticket with proper text encoding
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    <style type="text/css">
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&amp;display=swap');
      text { font-family: 'Inter', 'Arial', sans-serif; }
    </style>
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
  <image x="60" y="90" width="220" height="220" xlink:href="${qrCodeDataUrl}"/>
  
  <!-- Scan text -->
  <text x="170" y="340" font-size="14" font-weight="700" fill="white" text-anchor="middle">SCAN AT ENTRANCE</text>
  
  <!-- Event title -->
  <text x="340" y="70" font-size="32" font-weight="800" fill="#1a1a1a">NO LOVERS HERE</text>
  
  <!-- Divider line -->
  <line x1="340" y1="85" x2="760" y2="85" stroke="#667eea" stroke-width="3"/>
  
  <!-- Name section -->
  <text x="340" y="120" font-size="14" font-weight="700" fill="#667eea">NAME</text>
  <text x="340" y="145" font-size="20" font-weight="600" fill="#1a1a1a">${safeName}</text>
  
  <!-- Ticket Type section -->
  <text x="340" y="185" font-size="14" font-weight="700" fill="#667eea">TICKET TYPE</text>
  <text x="340" y="210" font-size="20" font-weight="600" fill="#1a1a1a">${safeTicketType}</text>
  
  <!-- Date section -->
  <text x="340" y="250" font-size="14" font-weight="700" fill="#667eea">DATE</text>
  <text x="340" y="275" font-size="20" font-weight="600" fill="#1a1a1a">February 14, 2026</text>
  
  <!-- Time section -->
  <text x="340" y="315" font-size="14" font-weight="700" fill="#667eea">TIME</text>
  <text x="340" y="340" font-size="20" font-weight="600" fill="#1a1a1a">9:00 PM - 12:00 AM</text>
  
  <!-- Ticket ID -->
  <text x="560" y="370" font-size="10" font-weight="400" fill="#999999" text-anchor="middle">Ticket ID: ${safeTicketId}</text>
</svg>
  `;
  
  try {
    // Convert SVG to PNG using sharp
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();
    
    // Convert to base64
    return pngBuffer.toString('base64');
  } catch (error) {
    console.error('Error generating ticket PNG:', error);
    throw error;
  }
}
