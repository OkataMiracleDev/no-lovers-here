import satori from 'satori';
import sharp from 'sharp';

export async function generateTicketPNG(
  name: string,
  email: string,
  ticketType: string,
  ticketId: string,
  qrCodeDataUrl: string
): Promise<string> {
  try {
    // Create the ticket using Satori (React-like JSX to SVG)
    const svg = await satori(
      {
        type: 'div',
        props: {
          style: {
            width: '800px',
            height: '400px',
            display: 'flex',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px',
          },
          children: [
            {
              type: 'div',
              props: {
                style: {
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                },
                children: [
                  // Left section with QR code
                  {
                    type: 'div',
                    props: {
                      style: {
                        width: '300px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '30px',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              background: 'white',
                              padding: '20px',
                              borderRadius: '12px',
                              marginBottom: '20px',
                            },
                            children: [
                              {
                                type: 'img',
                                props: {
                                  src: qrCodeDataUrl,
                                  width: 220,
                                  height: 220,
                                  style: {
                                    display: 'block',
                                  },
                                },
                              },
                            ],
                          },
                        },
                        {
                          type: 'div',
                          props: {
                            style: {
                              color: 'white',
                              fontSize: '14px',
                              fontWeight: 'bold',
                              letterSpacing: '1px',
                            },
                            children: 'SCAN AT ENTRANCE',
                          },
                        },
                      ],
                    },
                  },
                  // Right section with details
                  {
                    type: 'div',
                    props: {
                      style: {
                        flex: 1,
                        padding: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      },
                      children: [
                        {
                          type: 'div',
                          props: {
                            style: {
                              display: 'flex',
                              flexDirection: 'column',
                            },
                            children: [
                              {
                                type: 'div',
                                props: {
                                  style: {
                                    fontSize: '32px',
                                    fontWeight: 'bold',
                                    color: '#1a1a1a',
                                    marginBottom: '10px',
                                  },
                                  children: 'NO LOVERS HERE',
                                },
                              },
                              {
                                type: 'div',
                                props: {
                                  style: {
                                    width: '100%',
                                    height: '3px',
                                    background: '#667eea',
                                    marginBottom: '20px',
                                  },
                                },
                              },
                              // Name
                              {
                                type: 'div',
                                props: {
                                  style: {
                                    marginBottom: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                  },
                                  children: [
                                    {
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 'bold',
                                          color: '#667eea',
                                          marginBottom: '5px',
                                        },
                                        children: 'NAME',
                                      },
                                    },
                                    {
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: '20px',
                                          fontWeight: '600',
                                          color: '#1a1a1a',
                                        },
                                        children: name.substring(0, 25),
                                      },
                                    },
                                  ],
                                },
                              },
                              // Ticket Type
                              {
                                type: 'div',
                                props: {
                                  style: {
                                    marginBottom: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                  },
                                  children: [
                                    {
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 'bold',
                                          color: '#667eea',
                                          marginBottom: '5px',
                                        },
                                        children: 'TICKET TYPE',
                                      },
                                    },
                                    {
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: '20px',
                                          fontWeight: '600',
                                          color: '#1a1a1a',
                                        },
                                        children: ticketType,
                                      },
                                    },
                                  ],
                                },
                              },
                              // Date
                              {
                                type: 'div',
                                props: {
                                  style: {
                                    marginBottom: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                  },
                                  children: [
                                    {
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 'bold',
                                          color: '#667eea',
                                          marginBottom: '5px',
                                        },
                                        children: 'DATE',
                                      },
                                    },
                                    {
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: '20px',
                                          fontWeight: '600',
                                          color: '#1a1a1a',
                                        },
                                        children: 'February 14, 2026',
                                      },
                                    },
                                  ],
                                },
                              },
                              // Time
                              {
                                type: 'div',
                                props: {
                                  style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                  },
                                  children: [
                                    {
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: '14px',
                                          fontWeight: 'bold',
                                          color: '#667eea',
                                          marginBottom: '5px',
                                        },
                                        children: 'TIME',
                                      },
                                    },
                                    {
                                      type: 'div',
                                      props: {
                                        style: {
                                          fontSize: '20px',
                                          fontWeight: '600',
                                          color: '#1a1a1a',
                                        },
                                        children: '9:00 PM - 12:00 AM',
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                        // Ticket ID
                        {
                          type: 'div',
                          props: {
                            style: {
                              fontSize: '10px',
                              color: '#999999',
                              textAlign: 'center',
                              marginTop: '10px',
                            },
                            children: `Ticket ID: ${ticketId.substring(0, 30)}`,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
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
