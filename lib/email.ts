export async function sendTicketEmail(
  email: string,
  name: string,
  ticketType: string,
  qrCodeData: string,
  ticketId: string
) {
  // Generate ticket PNG with QR code
  const { generateTicketPNG } = await import('./ticket-generator');
  const ticketImageBase64 = await generateTicketPNG(name, email, ticketType, ticketId, qrCodeData);
  
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

          <!-- Ticket Image -->
          <tr>
            <td style="padding: 40px 30px; text-align: center; background-color: #fafafa;">
              <p style="margin: 0 0 20px 0; color: #333333; font-size: 18px; font-weight: 600;">Your Digital Ticket</p>
              <div style="background: #ffffff; padding: 20px; border-radius: 12px; display: inline-block; box-shadow: 0 2px 10px rgba(0,0,0,0.08);">
                <img src="cid:ticket" alt="Your Ticket" style="max-width: 100%; height: auto; display: block; border-radius: 8px;" />
              </div>
              <p style="margin: 20px 0 10px 0; color: #666666; font-size: 14px;">Save this ticket to your phone or print it</p>
              <a href="#" style="display: inline-block; margin-top: 10px; padding: 12px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Download Ticket</a>
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
                  • Present this ticket at the entrance<br/>
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
          name: 'NO-LOVERS-HERE-Ticket.png',
          content: ticketImageBase64,
        },
      ],
      inlineImages: [
        {
          name: 'ticket.png',
          content: ticketImageBase64,
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
