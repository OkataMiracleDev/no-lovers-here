// @ts-ignore - sib-api-v3-sdk has module resolution issues in Next.js
import * as SibApiV3Sdk from 'sib-api-v3-sdk';

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export async function sendTicketEmail(
  email: string,
  name: string,
  ticketType: string,
  qrCode: string,
  ticketId: string
) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = "Your NO LOVERS HERE Ticket 🔥";
  sendSmtpEmail.to = [{ email, name }];
  sendSmtpEmail.sender = {
    name: process.env.BREVO_SENDER_NAME || 'NO LOVERS HERE',
    email: process.env.BREVO_SENDER_EMAIL || 'noreply@nolovershere.com'
  };

  sendSmtpEmail.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your NO LOVERS HERE Ticket</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #000000;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #000000; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #FF006B 0%, #A855F7 100%);">
                  <h1 style="margin: 0; color: #ffffff; font-size: 36px; font-weight: 900; letter-spacing: -1px;">
                    NO LOVERS HERE
                  </h1>
                  <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 600;">
                    The Anti-Valentine's Experience
                  </p>
                </td>
              </tr>

              <!-- Welcome -->
              <tr>
                <td style="padding: 40px;">
                  <h2 style="margin: 0 0 16px; color: #ffffff; font-size: 28px; font-weight: 700;">
                    Welcome, ${name}! 🎉
                  </h2>
                  <p style="margin: 0 0 24px; color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1.6;">
                    Your <strong style="color: #FF006B; font-size: 18px; text-transform: uppercase;">${ticketType} TICKET</strong> is confirmed! 
                    Get ready for an unforgettable night where boundaries blur, connections ignite, and Valentine's Day gets the celebration it truly deserves.
                  </p>
                </td>
              </tr>

              <!-- Event Details -->
              <tr>
                <td style="padding: 0 40px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.05); border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
                    <tr>
                      <td style="padding: 24px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                              <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📅 Date</p>
                              <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px; font-weight: 600;">Friday, February 14, 2026</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                              <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">⏰ Time</p>
                              <p style="margin: 4px 0 0; color: #ffffff; font-size: 16px; font-weight: 600;">9:00 PM - 12:00 AM</p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                              <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📍 Venue</p>
                              <p style="margin: 4px 0 0; color: #FF006B; font-size: 16px; font-weight: 600; line-height: 1.5;">
                                CJ&J Lounge, Suites and Apartment Ltd<br/>
                                184 NTA/Choba, Adjacent Open University<br/>
                                Phalga, Port Harcourt 500272
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 12px 0;">
                              <p style="margin: 0; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">🎫 Ticket Type</p>
                              <p style="margin: 4px 0 0; color: #FF006B; font-size: 18px; font-weight: 700; text-transform: uppercase;">${ticketType}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- QR Code -->
              <tr>
                <td style="padding: 0 40px 40px; text-align: center;">
                  <div style="background: #ffffff; border-radius: 16px; padding: 24px; display: inline-block;">
                    <img src="${qrCode}" alt="Your Ticket QR Code" style="width: 200px; height: 200px; display: block;" />
                    <p style="margin: 16px 0 4px; color: #000000; font-size: 14px; font-weight: 700; letter-spacing: 1px;">
                      ${name.toUpperCase()}
                    </p>
                    <p style="margin: 4px 0; color: #666666; font-size: 12px;">
                      ${email}
                    </p>
                    <p style="margin: 8px 0 0; color: #FF006B; font-size: 12px; font-weight: 600; letter-spacing: 1px;">
                      TICKET #${ticketId.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <p style="margin: 16px 0 0; color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 600;">
                    📱 Show this QR code at entry
                  </p>
                  <p style="margin: 8px 0 0; color: rgba(255,255,255,0.5); font-size: 12px;">
                    Save this email or take a screenshot
                  </p>
                </td>
              </tr>

              <!-- Important Info -->
              <tr>
                <td style="padding: 0 40px 40px;">
                  <div style="background: rgba(255,0,107,0.1); border: 1px solid rgba(255,0,107,0.3); border-radius: 12px; padding: 20px;">
                    <h3 style="margin: 0 0 12px; color: #FF006B; font-size: 16px; font-weight: 700;">
                      ⚠️ Entry Requirements
                    </h3>
                    <ul style="margin: 0; padding-left: 20px; color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.8;">
                      <li><strong>Valid ID required</strong> - Must be 18+ to enter</li>
                      <li><strong>This QR code is your ticket</strong> - No code, no entry</li>
                      <li><strong>Dress to impress</strong> - Provocative & elegant attire</li>
                      <li><strong>Arrive on time</strong> - Doors open at 9:00 PM sharp</li>
                      <li><strong>Respect & consent</strong> - Non-negotiable house rules</li>
                    </ul>
                  </div>
                </td>
              </tr>

              <!-- What to Expect -->
              <tr>
                <td style="padding: 0 40px 40px;">
                  <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 20px; font-weight: 700;">
                    What Awaits You ✨
                  </h3>
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding: 12px 0;">
                        <p style="margin: 0; color: #FF006B; font-size: 16px; font-weight: 600;">🎧 DJ Eros</p>
                        <p style="margin: 4px 0 0; color: rgba(255,255,255,0.6); font-size: 14px;">Hypnotic beats that move your body and soul</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <p style="margin: 0; color: #FF006B; font-size: 16px; font-weight: 600;">🍸 Premium Bar</p>
                        <p style="margin: 4px 0 0; color: rgba(255,255,255,0.6); font-size: 14px;">Curated cocktails to set the mood</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0;">
                        <p style="margin: 0; color: #FF006B; font-size: 16px; font-weight: 600;">✨ Intimate Spaces</p>
                        <p style="margin: 4px 0 0; color: rgba(255,255,255,0.6); font-size: 14px;">Connection zones for those special moments</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 40px; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
                  <p style="margin: 0 0 16px; color: rgba(255,255,255,0.5); font-size: 14px;">
                    Questions or need assistance?
                  </p>
                  <p style="margin: 0; color: #FF006B; font-size: 16px; font-weight: 600;">
                    📞 0903 439 9874
                  </p>
                  <p style="margin: 24px 0 0; color: rgba(255,255,255,0.4); font-size: 12px;">
                    © 2026 NO LOVERS HERE. All rights reserved.<br/>
                    This is your official ticket confirmation.
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

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}

export async function sendBulkEmail(
  recipients: { email: string; name: string }[],
  subject: string,
  htmlContent: string
) {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.to = recipients;
  sendSmtpEmail.sender = {
    name: process.env.BREVO_SENDER_NAME || 'NO LOVERS HERE',
    email: process.env.BREVO_SENDER_EMAIL || 'noreply@nolovershere.com'
  };
  sendSmtpEmail.htmlContent = htmlContent;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true };
  } catch (error) {
    console.error('Bulk email error:', error);
    return { success: false, error };
  }
}
