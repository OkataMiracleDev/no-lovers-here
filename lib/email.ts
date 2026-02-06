export async function sendTicketEmail(
  email: string,
  name: string,
  ticketType: string,
  qrCodeData: string,
  ticketId: string
) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://no-lovers-here.vercel.app';
  const downloadUrl = `${appUrl}/api/ticket-image/${ticketId}`;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #fff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 40px; text-align: center;">
              <h1 style="margin: 0 0 10px 0; color: #fff; font-size: 36px; font-weight: 900; letter-spacing: 3px;">NO LOVERS HERE</h1>
              <div style="width: 60px; height: 4px; background: #fff; margin: 0 auto 15px; border-radius: 2px;"></div>
              <p style="margin: 0; color: #fff; font-size: 18px; font-weight: 600;">🎉 Your Ticket is Ready!</p>
            </td>
          </tr>

          <!-- QR Code -->
          <tr>
            <td style="padding: 50px 40px; text-align: center; background: #fafafa;">
              <div style="background: #fff; padding: 30px; border-radius: 20px; display: inline-block; box-shadow: 0 4px 20px rgba(102,126,234,0.15);">
                <img src="${qrCodeData}" alt="QR Code" width="250" height="250" style="display: block; border-radius: 10px;" />
              </div>
              <p style="margin: 25px 0 0 0; color: #667eea; font-size: 16px; font-weight: 700; letter-spacing: 1px;">SCAN THIS AT ENTRANCE</p>
            </td>
          </tr>

          <!-- Ticket Details -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea10 0%, #764ba210 100%); border-radius: 16px; padding: 30px; border: 2px solid #667eea20;">
                <tr>
                  <td style="padding-bottom: 20px; border-bottom: 2px solid #667eea20;">
                    <p style="margin: 0 0 8px 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">👤 Name</p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 22px; font-weight: 700;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0; border-bottom: 2px solid #667eea20;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="50%" style="padding-right: 10px;">
                          <p style="margin: 0 0 8px 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase;">🎫 Type</p>
                          <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 700;">${ticketType}</p>
                        </td>
                        <td width="50%" style="padding-left: 10px;">
                          <p style="margin: 0 0 8px 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase;">📅 Date</p>
                          <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 700;">Feb 14, 2026</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <p style="margin: 0 0 8px 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase;">⏰ Time</p>
                    <p style="margin: 0; color: #1a1a1a; font-size: 18px; font-weight: 700;">9:00 PM - 12:00 AM</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Download Button -->
          <tr>
            <td style="padding: 0 40px 40px 40px; text-align: center;">
              <a href="${downloadUrl}" target="_blank" style="display: inline-block; padding: 18px 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 700; box-shadow: 0 8px 20px rgba(102,126,234,0.3); letter-spacing: 0.5px;">
                🎫 VIEW & SAVE TICKET
              </a>
              <p style="margin: 15px 0 0 0; color: #999; font-size: 13px;">Opens your ticket - save as PDF or screenshot</p>
            </td>
          </tr>

          <!-- Venue Info -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background: #fff3cd; padding: 25px; border-radius: 16px; border-left: 5px solid #ffc107;">
                <p style="margin: 0 0 12px 0; color: #856404; font-size: 16px; font-weight: 700;">📍 Venue</p>
                <p style="margin: 0 0 8px 0; color: #856404; font-size: 15px; font-weight: 600;">CJ&J Lounge, Suites and Apartment Ltd</p>
                <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">184 NTA/Choba, Adjacent Open University<br/>Phalga, Port Harcourt 500272</p>
              </div>
            </td>
          </tr>

          <!-- Important -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background: #ffe5e5; padding: 25px; border-radius: 16px; border-left: 5px solid #ff6b6b;">
                <p style="margin: 0 0 12px 0; color: #c92a2a; font-size: 16px; font-weight: 700;">⚠️ Important</p>
                <p style="margin: 0; color: #c92a2a; font-size: 14px; line-height: 1.8;">
                  • Present QR code at entrance<br/>
                  • Valid ID required (18+)<br/>
                  • Smart casual dress code<br/>
                  • Non-transferable
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 40px; background: #f8f9fa; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; color: #999; font-size: 13px;">Questions?</p>
              <p style="margin: 0 0 20px 0; color: #667eea; font-size: 15px; font-weight: 600;">noreply.nolovershere@gmail.com</p>
              <p style="margin: 0; color: #ccc; font-size: 12px;">© 2026 NO LOVERS HERE</p>
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
