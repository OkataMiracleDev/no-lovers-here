export async function sendTicketEmail(
  email: string,
  name: string,
  ticketType: string,
  qrCodeData: string,
  ticketId: string
) {
  // Generate full ticket image with QR code
  const { generateTicketImage } = await import('./ticket-generator');
  const ticketImageBase64 = await generateTicketImage(name, ticketType, ticketId, qrCodeData);
  
  // Read logo file and convert to base64
  const fs = await import('fs');
  const path = await import('path');
  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = logoBuffer.toString('base64');
  
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your NO LOVERS HERE Ticket</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 2px;">NO LOVERS HERE</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Your Ticket is Ready 🎉</p>
            </td>
          </tr>

          <!-- Ticket Card -->
          <tr>
            <td style="padding: 40px 40px; background-color: #fafafa;">
              <!-- Ticket Container -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; overflow: hidden;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <!-- Left: Logo -->
                        <td width="250" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center; vertical-align: middle;">
                          <div style="background: white; padding: 20px; border-radius: 12px; display: inline-block; margin-bottom: 15px;">
                            <h2 style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 28px; font-weight: 900; letter-spacing: 1px;">NO LOVERS HERE</h2>
                          </div>
                          <p style="margin: 0; color: white; font-size: 13px; font-weight: bold; letter-spacing: 1.5px;">DOWNLOAD YOUR TICKET</p>
                        </td>
                        
                        <!-- Right: Ticket Details -->
                        <td style="background: white; padding: 30px; vertical-align: top;">
                          <h2 style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 28px; font-weight: 900; letter-spacing: 1px;">NO LOVERS HERE</h2>
                          <div style="width: 100%; height: 3px; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); border-radius: 2px; margin-bottom: 20px;"></div>
                          
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="margin: 0 0 4px 0; color: #667eea; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">NAME</p>
                                <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">${name}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="margin: 0 0 4px 0; color: #667eea; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">TICKET TYPE</p>
                                <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">${ticketType}</p>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 15px;">
                                <p style="margin: 0 0 4px 0; color: #667eea; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">DATE</p>
                                <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">February 14, 2026</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="margin: 0 0 4px 0; color: #667eea; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">TIME</p>
                                <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 600;">9:00 PM - 12:00 AM</p>
                              </td>
                            </tr>
                          </table>
                          
                          <p style="margin: 15px 0 0 0; color: #999999; font-size: 10px; text-align: center;">Ticket ID: ${ticketId}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Save Instructions -->
              <p style="margin: 25px 0 15px 0; color: #666666; font-size: 14px; text-align: center; font-weight: 600;">
                📱 Download the attached ticket image - it contains your QR code for entry
              </p>
            </td>
          </tr>

          <!-- Event Details -->
          <tr>
            <td style="padding: 30px;">
              <div style="background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); padding: 25px; border-radius: 12px; border-left: 4px solid #667eea;">
                <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 20px; font-weight: 700;">Event Details</h2>
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <p style="margin: 0 0 5px 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase;">📅 Date</p>
                      <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">February 14, 2026</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 15px;">
                      <p style="margin: 0 0 5px 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase;">⏰ Time</p>
                      <p style="margin: 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">9:00 PM - 12:00 AM</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 0 0 5px 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase;">📍 Venue</p>
                      <p style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">CJ&J Lounge, Suites and Apartment Ltd</p>
                      <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">184 NTA/Choba, Adjacent Open University<br/>Phalga, Port Harcourt 500272</p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Important Notice -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: #fff3cd; padding: 20px; border-radius: 12px; border-left: 4px solid #ffc107;">
                <p style="margin: 0 0 10px 0; color: #856404; font-size: 14px; font-weight: 700;">⚠️ IMPORTANT</p>
                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                  • Present this QR code at the entrance<br/>
                  • Valid ID required (18+ event)<br/>
                  • Smart casual dress code<br/>
                  • Non-transferable ticket
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 13px;">Questions? Contact us at</p>
              <p style="margin: 0 0 15px 0; color: #667eea; font-size: 14px; font-weight: 600;">noreply.nolovershere@gmail.com</p>
              <p style="margin: 0; color: #999999; font-size: 12px;">© 2026 NO LOVERS HERE. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Use Brevo REST API directly
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY || '',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || 'NO LOVERS HERE',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@example.com',
      },
      to: [
        {
          email: email,
          name: name,
        },
      ],
      subject: '🎉 Your NO LOVERS HERE Ticket - February 14, 2026',
      htmlContent: emailHtml,
      attachment: [
        {
          name: `NO-LOVERS-HERE-Ticket-${ticketId}.png`,
          content: ticketImageBase64,
        },
      ],
      inlineImages: [
        {
          name: 'logo.png',
          content: logoBase64,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send email: ${error}`);
  }

  return response.json();
}

export async function sendBulkEmail(
  recipients: { email: string; name: string }[],
  subject: string,
  htmlContent: string
) {
  // Use Brevo REST API to send bulk emails
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY || '',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: process.env.BREVO_SENDER_NAME || 'NO LOVERS HERE',
        email: process.env.BREVO_SENDER_EMAIL || 'noreply@example.com',
      },
      to: recipients,
      subject: subject,
      htmlContent: htmlContent,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to send bulk email: ${error}`);
  }

  const result = await response.json();
  return { success: true, result };
}
