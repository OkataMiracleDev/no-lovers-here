import sharp from 'sharp';

export async function generateTicketPNG(
  name: string,
  email: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  // Create SVG ticket
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
  <text x="170" y="340" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white" text-anchor="middle">SCAN AT ENTRANCE</text>
  
  <!-- Event title -->
  <text x="340" y="70" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#1a1a1a">NO LOVERS HERE</text>
  
  <!-- Divider line -->
  <line x1="340" y1="85" x2="760" y2="85" stroke="#667eea" stroke-width="3"/>
  
  <!-- Name label -->
  <text x="340" y="120" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#667eea">NAME</text>
  <text x="340" y="145" font-family="Arial, sans-serif" font-size="20" fill="#1a1a1a">${name.substring(0, 25)}</text>
  
  <!-- Ticket Type label -->
  <text x="340" y="185" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#667eea">TICKET TYPE</text>
  <text x="340" y="210" font-family="Arial, sans-serif" font-size="20" fill="#1a1a1a">${ticketType}</text>
  
  <!-- Date label -->
  <text x="340" y="250" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#667eea">DATE</text>
  <text x="340" y="275" font-family="Arial, sans-serif" font-size="20" fill="#1a1a1a">February 14, 2026</text>
  
  <!-- Time label -->
  <text x="340" y="315" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#667eea">TIME</text>
  <text x="340" y="340" font-family="Arial, sans-serif" font-size="20" fill="#1a1a1a">9:00 PM - 12:00 AM</text>
  
  <!-- Ticket ID -->
  <text x="560" y="370" font-family="Arial, sans-serif" font-size="10" fill="#999999" text-anchor="middle">Ticket ID: ${ticketId.substring(0, 30)}</text>
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
    // Fallback: return SVG as base64
    return Buffer.from(svg).toString('base64');
  }
}
