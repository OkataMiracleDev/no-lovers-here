export async function sendTicketEmail(
  email: string,
  name: string,
  ticketType: string,
  qrCodeData: string,
  ticketId: string
) {
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your NO LOVERS HERE Ticket</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
  <table role="presentation" style="width: 100%; border-collapse: collapse; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0,0,0,0.3);">
          
          <!-- Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 50px 30px; text-align: center; position: relative;">
              <div style="background: rgba(255,255,255,0.1); border-radius: 15px; padding: 30px; backdrop-filter: blur(10px);">
                <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 36px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
                  NO LOVERS HERE
                </h1>
                <div style="width: 60px; height: 4px; background: #ffffff; margin: 15px auto; border-radius: 2px;"></div>
                <p style="margin: 15px 0 0 0; color: #ffffff; font-size: 18px; font-weight: 600; letter-spacing: 1px;">
                  🎉 YOUR TICKET IS READY!
                </p>
              </div>
            </td>
          </tr>

          <!-- QR Code Section with Modern Design -->
          <tr>
            <td style="padding: 50px 30px; text-align: center; background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);">
              <div style="background: #ffffff; padding: 30px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); display: inline-block; border: 3px solid #667eea;">
                <img src="cid:qrcode" alt="Your Ticket QR Code" style="width: 280px; height: 280px; display: block; border-radius: 10px;" />
              </div>
              
              <!-- Ticket Info Cards -->
              <table role="presentation" style="width: 100%; margin-top: 30px; border-collapse: collapse;">
                <tr>
                  <td style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; margin: 10px 0;">
                    <p style="margin: 0; color: rgba(255,255,255,0.9); font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Name</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 20px; font-weight: 700;">${name}</p>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" style="width: 100%; margin-top: 15px; border-collapse: collapse;">
                <tr>
                  <td style="width: 48%; padding: 15px; background: #f8f9fa; border-radius: 12px; vertical-align: top;">
                    <p style="margin: 0; color: #667eea; font-size: 11px; font-weight: 700; text-transform: uppercase;">Ticket Type</p>
                    <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 16px; font-weight: 600;">${ticketType}</p>
                  </td>
                  <td style="width: 4%;"></td>
                  <td style="width: 48%; padding: 15px; background: #f8f9fa; border-radius: 12px; vertical-align: top;">
                    <p style="margin: 0; color: #667eea; font-size: 11px; font-weight: 700; text-transform: uppercase;">Ticket ID</p>
                    <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 14px; font-weight: 600; word-break: break-all;">${ticketId.substring(0, 20)}...</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Event Details with Icons -->
          <tr>
            <td style="padding: 40px 30px; background-color: #ffffff;">
              <h2 style="margin: 0 0 30px 0; color: #1a1a1a; font-size: 28px; font-weight: 800; text-align: center;">Event Details</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 20px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 15px; border-left: 5px solid #667eea;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="width: 50px; vertical-align: top;">
                          <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📅</div>
                        </td>
                        <td style="padding-left: 15px; vertical-align: middle;">
                          <p style="margin: 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Date</p>
                          <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 18px; font-weight: 700;">February 14, 2026</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 15px;"></td></tr>
                <tr>
                  <td style="padding: 20px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 15px; border-left: 5px solid #764ba2;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="width: 50px; vertical-align: top;">
                          <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">⏰</div>
                        </td>
                        <td style="padding-left: 15px; vertical-align: middle;">
                          <p style="margin: 0; color: #764ba2; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Time</p>
                          <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 18px; font-weight: 700;">9:00 PM - 12:00 AM</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr><td style="height: 15px;"></td></tr>
                <tr>
                  <td style="padding: 20px; background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border-radius: 15px; border-left: 5px solid #667eea;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="width: 50px; vertical-align: top;">
                          <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px;">📍</div>
                        </td>
                        <td style="padding-left: 15px; vertical-align: middle;">
                          <p style="margin: 0; color: #667eea; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Venue</p>
                          <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 16px; font-weight: 700;">CJ&J Lounge, Suites and Apartment Ltd</p>
                          <p style="margin: 5px 0 0 0; color: #666666; font-size: 14px; line-height: 1.5;">184 NTA/Choba, Adjacent Open University<br/>Phalga, Port Harcourt 500272</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Important Notice -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); text-align: center;">
              <div style="background: rgba(255,255,255,0.2); border-radius: 15px; padding: 25px; backdrop-filter: blur(10px);">
                <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">⚠️ IMPORTANT</p>
                <p style="margin: 0; color: #ffffff; font-size: 15px; line-height: 1.6; font-weight: 500;">
                  Present this QR code at the entrance • Valid ID required (18+)<br/>
                  Smart casual dress code • Non-transferable ticket
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #1a1a1a; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #999999; font-size: 13px;">Questions? Email us at</p>
              <p style="margin: 0 0 20px 0; color: #667eea; font-size: 14px; font-weight: 600;">noreply.nolovershere@gmail.com</p>
              <div style="width: 40px; height: 2px; background: #333333; margin: 20px auto;"></div>
              <p style="margin: 0; color: #666666; font-size: 12px;">© 2026 NO LOVERS HERE. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Use Brevo REST API directly instead of the problematic SDK
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
          name: 'qrcode.png',
          content: qrCodeData.split(',')[1], // Remove data:image/png;base64, prefix
        },
      ],
      inlineImages: [
        {
          name: 'qrcode.png',
          content: qrCodeData.split(',')[1], // Remove data:image/png;base64, prefix
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
