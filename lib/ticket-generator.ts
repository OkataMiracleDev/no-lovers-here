import { createCanvas, loadImage } from 'canvas';

export async function generateTicketImage(
  name: string,
  email: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  // Create canvas (ticket size: 800x400)
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 800, 400);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 400);

  // White content area
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(20, 20, 760, 360);

  // Left section (QR Code area) - Purple background
  const leftGradient = ctx.createLinearGradient(20, 20, 320, 380);
  leftGradient.addColorStop(0, '#667eea');
  leftGradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = leftGradient;
  ctx.fillRect(20, 20, 300, 360);

  // Load and draw QR code
  try {
    const qrImage = await loadImage(qrCodeDataUrl);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(50, 80, 240, 240);
    ctx.drawImage(qrImage, 60, 90, 220, 220);
  } catch (error) {
    console.error('Error loading QR code:', error);
  }

  // "SCAN ME" text below QR
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN AT ENTRANCE', 170, 340);

  // Right section (Details)
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'left';

  // Event title
  ctx.font = 'bold 32px Arial';
  ctx.fillText('NO LOVERS HERE', 340, 70);

  // Divider line
  ctx.strokeStyle = '#667eea';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(340, 85);
  ctx.lineTo(760, 85);
  ctx.stroke();

  // Name
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#667eea';
  ctx.fillText('NAME', 340, 120);
  ctx.font = '20px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.fillText(name, 340, 145);

  // Ticket Type
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#667eea';
  ctx.fillText('TICKET TYPE', 340, 185);
  ctx.font = '20px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.fillText(ticketType, 340, 210);

  // Date
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#667eea';
  ctx.fillText('DATE', 340, 250);
  ctx.font = '20px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.fillText('February 14, 2026', 340, 275);

  // Time
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = '#667eea';
  ctx.fillText('TIME', 340, 315);
  ctx.font = '20px Arial';
  ctx.fillStyle = '#1a1a1a';
  ctx.fillText('9:00 PM - 12:00 AM', 340, 340);

  // Ticket ID at bottom
  ctx.font = '10px Arial';
  ctx.fillStyle = '#999999';
  ctx.textAlign = 'center';
  ctx.fillText(`Ticket ID: ${ticketId}`, 560, 370);

  // Convert to base64
  return canvas.toDataURL('image/png');
}
