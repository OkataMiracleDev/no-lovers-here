import { createCanvas, loadImage, registerFont, CanvasRenderingContext2D as NodeCanvasContext } from 'canvas';
import path from 'path';

// Register Arial font from @canvas-fonts/arial
try {
  const arialPath = path.join(process.cwd(), 'node_modules/@canvas-fonts/arial/Arial.ttf');
  const arialBoldPath = path.join(process.cwd(), 'node_modules/@canvas-fonts/arial/Arial Bold.ttf');
  
  registerFont(arialPath, { family: 'Arial' });
  registerFont(arialBoldPath, { family: 'Arial', weight: 'bold' });
  console.log('Arial fonts registered successfully');
} catch (error) {
  console.error('Failed to register Arial fonts:', error);
}

export async function generateTicketImage(
  name: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  // Create canvas - 800x400px ticket
  const canvas = createCanvas(800, 400);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, 800, 400);
  gradient.addColorStop(0, '#667eea');
  gradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 800, 400);

  // White ticket card with rounded corners
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 20, 20, 760, 360, 16);

  // Left section (QR Code area) - gradient background
  const leftGradient = ctx.createLinearGradient(20, 20, 20, 380);
  leftGradient.addColorStop(0, '#667eea');
  leftGradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = leftGradient;
  roundRect(ctx, 20, 20, 280, 360, 16, true, false);

  // QR Code white box
  ctx.fillStyle = '#ffffff';
  roundRect(ctx, 50, 60, 220, 220, 12);

  // Load and draw QR code
  try {
    const qrImage = await loadImage(qrCodeDataUrl);
    ctx.drawImage(qrImage, 60, 70, 200, 200);
  } catch (error) {
    console.error('Error loading QR code:', error);
  }

  // "SCAN AT ENTRANCE" text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('SCAN AT ENTRANCE', 160, 310);

  // Right section (Ticket details)
  ctx.fillStyle = '#1a1a1a';
  ctx.textAlign = 'left';

  // Title
  ctx.font = 'bold 32px Arial';
  ctx.fillText('NO LOVERS HERE', 330, 70);

  // Divider line
  const dividerGradient = ctx.createLinearGradient(330, 85, 750, 85);
  dividerGradient.addColorStop(0, '#667eea');
  dividerGradient.addColorStop(1, '#764ba2');
  ctx.fillStyle = dividerGradient;
  ctx.fillRect(330, 85, 420, 4);

  // Ticket details
  let yPos = 120;

  // NAME
  ctx.fillStyle = '#667eea';
  ctx.font = 'bold 11px Arial';
  ctx.fillText('NAME', 330, yPos);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 20px Arial';
  ctx.fillText(name, 330, yPos + 20);

  yPos += 50;

  // TICKET TYPE
  ctx.fillStyle = '#667eea';
  ctx.font = 'bold 11px Arial';
  ctx.fillText('TICKET TYPE', 330, yPos);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 20px Arial';
  ctx.fillText(ticketType, 330, yPos + 20);

  yPos += 50;

  // DATE
  ctx.fillStyle = '#667eea';
  ctx.font = 'bold 11px Arial';
  ctx.fillText('DATE', 330, yPos);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('February 14, 2026', 330, yPos + 20);

  yPos += 50;

  // TIME
  ctx.fillStyle = '#667eea';
  ctx.font = 'bold 11px Arial';
  ctx.fillText('TIME', 330, yPos);
  ctx.fillStyle = '#1a1a1a';
  ctx.font = 'bold 20px Arial';
  ctx.fillText('9:00 PM - 12:00 AM', 330, yPos + 20);

  // Ticket ID at bottom
  ctx.fillStyle = '#999999';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(`Ticket ID: ${ticketId}`, 540, 360);

  // Convert to base64 PNG
  const buffer = canvas.toBuffer('image/png');
  return buffer.toString('base64');
}

// Helper function to draw rounded rectangles
function roundRect(
  ctx: NodeCanvasContext,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  leftOnly = false,
  fill = true
) {
  ctx.beginPath();
  if (leftOnly) {
    // Only round left corners
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  } else {
    // Round all corners
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
  }
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
}
