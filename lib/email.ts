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
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #000000;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #1a1a1a; border-radius: 10px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                NO LOVERS HERE
              </h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">
                Your Ticket is Ready!
              </p>
            </td>
          </tr>

          <!-- QR Code Section -->
          <tr>
            <td style="padding: 40px 20px; text-align: center; background-color: #ffffff;">
              <div style="background-color: #ffffff; padding: 20px; border-radius: 10px; display: inline-block;">
                <img src="${qrCodeData}" alt="QR Code" style="width: 250px; height: 250px; display: block;" />
              </div>
              <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin: 5px 0; color: #333333; font-size: 16px;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0; color: #333333; font-size: 16px;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 5px 0; color: #333333; font-size: 16px;"><strong>Ticket Type:</strong> ${ticketType}</p>
                <p style="margin: 5px 0; color: #666666; font-size: 14px;"><strong>Ticket ID:</strong> ${ticketId}</p>
              </div>
            </td>
          </tr>

          <!-- Event Details -->
          <tr>
            <td style="padding: 30px 20px; background-color: #2a2a2a;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 24px; text-align: center;">Event Details</h2>
              
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px; background-color: #333333; border-radius: 8px; margin-bottom: 10px;">
                    <p style="margin: 0; color: #667eea; font-size: 14px; font-weight: bold;">📅 DATE</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px;">February 14, 2026</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 15px; background-color: #333333; border-radius: 8px;">
                    <p style="margin: 0; color: #667eea; font-size: 14px; font-weight: bold;">⏰ TIME</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px;">9:00 PM - 12:00 AM</p>
                  </td>
                </tr>
                <tr><td style="height: 10px;"></td></tr>
                <tr>
                  <td style="padding: 15px; background-color: #333333; border-radius: 8px;">
                    <p style="margin: 0; color: #667eea; font-size: 14px; font-weight: bold;">📍 VENUE</p>
                    <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px;">CJ&J Lounge, Suites and Apartment Ltd</p>
                    <p style="margin: 5px 0 0 0; color: #cccccc; font-size: 14px;">184 NTA/Choba, Adjacent Open University</p>
                    <p style="margin: 0; color: #cccccc; font-size: 14px;">Phalga, Port Harcourt 500272</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What Awaits You -->
          <tr>
            <td style="padding: 30px 20px; background-color: #1a1a1a;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 24px; text-align: center;">What Awaits You</h2>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #cccccc; font-size: 16px; line-height: 1.8;">
                <li>Premium DJ sets spinning the hottest tracks</li>
                <li>Exclusive cocktails and premium drinks</li>
                <li>Vibrant atmosphere with like-minded singles</li>
                <li>Photo booth moments to capture the night</li>
                <li>Surprise performances and entertainment</li>
              </ul>
            </td>
          </tr>

          <!-- Entry Requirements -->
          <tr>
            <td style="padding: 30px 20px; background-color: #2a2a2a;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 24px; text-align: center;">Entry Requirements</h2>
              <div style="background-color: #333333; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
                <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px;">✓ Present this QR code at the entrance</p>
                <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px;">✓ Valid ID required (18+ event)</p>
                <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px;">✓ Dress code: Smart casual / Party attire</p>
                <p style="margin: 0; color: #ffffff; font-size: 16px;">✓ Arrive early to avoid queues</p>
              </div>
            </td>
          </tr>

          <!-- Important Notice -->
          <tr>
            <td style="padding: 30px 20px; background-color: #1a1a1a; text-align: center;">
              <div style="background-color: #ff6b6b; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; color: #ffffff; font-size: 14px; font-weight: bold;">⚠️ IMPORTANT</p>
                <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 14px;">This ticket is non-transferable and valid for single entry only. Screenshot or print this email for entry.</p>
              </div>
              
              <p style="margin: 20px 0 10px 0; color: #999999; font-size: 14px;">Questions? Contact us:</p>
              <p style="margin: 0; color: #667eea; font-size: 14px;">noreply.nolovershere@gmail.com</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px; background-color: #000000; text-align: center;">
              <p style="margin: 0; color: #666666; font-size: 12px;">
                © 2026 NO LOVERS HERE. All rights reserved.
              </p>
              <p style="margin: 10px 0 0 0; color: #666666; font-size: 12px;">
                This is an automated email. Please do not reply.
              </p>
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
