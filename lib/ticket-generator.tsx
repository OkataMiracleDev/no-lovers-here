import satori from 'satori';
import sharp from 'sharp';
import React from 'react';

export async function generateTicketPNG(
  name: string,
  email: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  try {
    // Create the ticket using Satori with JSX
    const svg = await satori(
      <div
        style={{
          width: '800px',
          height: '400px',
          display: 'flex',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Left section with QR code */}
          <div
            style={{
              width: '300px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '30px',
            }}
          >
            <div
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
              }}
            >
              <img
                src={qrCodeDataUrl}
                width={220}
                height={220}
                style={{
                  display: 'block',
                }}
              />
            </div>
            <div
              style={{
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '1px',
              }}
            >
              SCAN AT ENTRANCE
            </div>
          </div>

          {/* Right section with details */}
          <div
            style={{
              flex: 1,
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '10px',
                }}
              >
                NO LOVERS HERE
              </div>
              <div
                style={{
                  width: '100%',
                  height: '3px',
                  background: '#667eea',
                  marginBottom: '20px',
                }}
              />

              {/* Name */}
              <div
                style={{
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    marginBottom: '5px',
                  }}
                >
                  NAME
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                  }}
                >
                  {name.substring(0, 25)}
                </div>
              </div>

              {/* Ticket Type */}
              <div
                style={{
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    marginBottom: '5px',
                  }}
                >
                  TICKET TYPE
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                  }}
                >
                  {ticketType}
                </div>
              </div>

              {/* Date */}
              <div
                style={{
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    marginBottom: '5px',
                  }}
                >
                  DATE
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                  }}
                >
                  February 14, 2026
                </div>
              </div>

              {/* Time */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#667eea',
                    marginBottom: '5px',
                  }}
                >
                  TIME
                </div>
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                  }}
                >
                  9:00 PM - 12:00 AM
                </div>
              </div>
            </div>

            {/* Ticket ID */}
            <div
              style={{
                fontSize: '10px',
                color: '#999999',
                textAlign: 'center',
                marginTop: '10px',
              }}
            >
              Ticket ID: {ticketId.substring(0, 30)}
            </div>
          </div>
        </div>
      </div>,
      {
        width: 800,
        height: 400,
        fonts: [
          {
            name: 'Inter',
            data: await fetch('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff').then(res => res.arrayBuffer()),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: await fetch('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff').then(res => res.arrayBuffer()),
            weight: 600,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: await fetch('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiA.woff').then(res => res.arrayBuffer()),
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );

    // Convert SVG to PNG
    const pngBuffer = await sharp(Buffer.from(svg))
      .png()
      .toBuffer();

    return pngBuffer.toString('base64');
  } catch (error) {
    console.error('Error generating ticket PNG:', error);
    throw error;
  }
}
