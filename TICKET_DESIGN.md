# Ticket Design Specification

## Downloadable Ticket Image

The full ticket image that users receive as an email attachment is an **800x400px PNG** with the following design:

```
┌────────────────────────────────────────────────────────────────────────┐
│  GRADIENT BACKGROUND (#667eea → #764ba2)                               │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                                                                  │  │
│  │  ┌─────────────┐  ┌──────────────────────────────────────────┐ │  │
│  │  │   PURPLE    │  │           WHITE BACKGROUND               │ │  │
│  │  │  GRADIENT   │  │                                          │ │  │
│  │  │             │  │  NO LOVERS HERE                          │ │  │
│  │  │  ┌───────┐  │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │ │  │
│  │  │  │       │  │  │                                          │ │  │
│  │  │  │  QR   │  │  │  NAME                                    │ │  │
│  │  │  │ CODE  │  │  │  John Doe                                │ │  │
│  │  │  │       │  │  │                                          │ │  │
│  │  │  └───────┘  │  │  TICKET TYPE                             │ │  │
│  │  │             │  │  Men                                     │ │  │
│  │  │  SCAN AT    │  │                                          │ │  │
│  │  │  ENTRANCE   │  │  DATE                                    │ │  │
│  │  │             │  │  February 14, 2026                       │ │  │
│  │  └─────────────┘  │                                          │ │  │
│  │                   │  TIME                                    │ │  │
│  │                   │  9:00 PM - 12:00 AM                      │ │  │
│  │                   │                                          │ │  │
│  │                   │           Ticket ID: NLH-xxxxx           │ │  │
│  │                   └──────────────────────────────────────────┘ │  │
│  │                                                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

## Design Elements

### Left Section (280px width)
- **Background**: Purple gradient (#667eea → #764ba2)
- **QR Code Box**: 
  - White background with rounded corners
  - 220x220px QR code
  - Centered with padding
- **Text**: "SCAN AT ENTRANCE" in white, bold, centered

### Right Section (480px width)
- **Background**: White
- **Title**: "NO LOVERS HERE" - Large, bold, black
- **Divider**: Gradient line (#667eea → #764ba2)
- **Details**:
  - Labels in purple (#667eea), uppercase, small
  - Values in black (#1a1a1a), larger, bold
  - Fields: NAME, TICKET TYPE, DATE, TIME
- **Footer**: Ticket ID in gray, small, centered

## Colors
- **Primary Gradient**: #667eea → #764ba2
- **Text Dark**: #1a1a1a
- **Text Purple**: #667eea
- **Text Gray**: #999999
- **White**: #ffffff

## Typography
- **Title**: Bold 32px Arial
- **Labels**: Bold 11px Arial
- **Values**: 600 weight 20px Arial
- **Scan Text**: Bold 13px Arial
- **Ticket ID**: 10px Arial

## File Details
- **Format**: PNG
- **Size**: 800x400 pixels
- **Encoding**: Base64 (for email attachment)
- **Filename**: `NO-LOVERS-HERE-Ticket-{ticketId}.png`

## Email Integration
1. **Inline Display**: QR code shown in email body using `cid:qrcode`
2. **Attachment**: Full ticket image attached as downloadable PNG
3. **Instructions**: "Download the attached ticket image or screenshot this email"

## Usage
Users can:
- Download the ticket image from email attachment
- Save it to their phone
- Present it at the event entrance for QR scanning
- Print it if needed
