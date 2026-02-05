# NO LOVERS HERE - Event Management System

A complete event ticketing and management platform for the exclusive "NO LOVERS HERE" Valentine's Day experience.

## 🎯 Features

### 🎫 Customer Features
- Modern, bold landing page design
- Secure Paystack payment integration
- Instant ticket delivery via email
- Unique QR code for each ticket
- Event details and reminders
- Mobile-responsive design

### 👨‍💼 Admin Features
- Complete admin dashboard at `/admin`
- Real-time ticket sales statistics
- Email all attendees or specific groups
- QR code scanner for entry validation
- Create complimentary tickets
- Set ticket capacity limits
- View all purchases and statuses
- Revenue tracking

### 📧 Email System
- Beautifully designed ticket emails
- Powered by Brevo (Sendinblue)
- QR code embedded in email
- Event details and reminders
- Bulk email capability

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Initialize database
npm run db:push

# Run development server
npm run dev
```

Visit:
- Main site: http://localhost:3000
- Admin: http://localhost:3000/admin

## 📋 Requirements

- Node.js 18+
- PostgreSQL database
- Paystack account (for payments)
- Brevo account (for emails)

## 🔧 Configuration

### 1. Database Setup

Use any PostgreSQL provider:
- **Neon** (recommended, free tier)
- **Supabase**
- **Railway**
- Local PostgreSQL

Add connection string to `.env`:
```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### 2. Paystack Setup

1. Sign up at [Paystack](https://paystack.com)
2. Get API keys from Settings > API Keys
3. Add to `.env`:
```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_xxxxxxxxxxxx"
PAYSTACK_SECRET_KEY="sk_test_xxxxxxxxxxxx"
```

### 3. Brevo Email Setup

1. Sign up at [Brevo](https://www.brevo.com)
2. Get API key from Settings > SMTP & API
3. Verify sender email
4. Add to `.env`:
```
BREVO_API_KEY="xkeysib-xxxxxxxxxxxx"
BREVO_SENDER_EMAIL="noreply@yourdomain.com"
BREVO_SENDER_NAME="NO LOVERS HERE"
```

### 4. Admin Password

Set in `.env`:
```
ADMIN_SECRET="your-secure-password"
NEXT_PUBLIC_ADMIN_PASSWORD="admin123"
```

## 💳 Ticket Pricing

- **Men:** ₦18,000
- **Women:** ₦8,000

## 🎨 Tech Stack

- **Framework:** Next.js 16
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL + Prisma ORM
- **Payments:** Paystack
- **Emails:** Brevo (Sendinblue)
- **QR Codes:** qrcode library
- **Language:** TypeScript

## 📁 Project Structure

```
├── app/
│   ├── page.tsx              # Main landing page
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── api/
│   │   ├── verify-payment/   # Payment verification
│   │   └── admin/            # Admin API routes
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── lib/
│   ├── prisma.ts             # Database client
│   ├── email.ts              # Email service
│   └── qrcode.ts             # QR code generator
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## 🎫 How It Works

### Customer Journey

1. Visit homepage
2. Click "Buy Now" on ticket card
3. Enter email address
4. Complete payment via Paystack
5. Receive email with ticket and QR code
6. Show QR code at event entry

### Admin Workflow

1. Login at `/admin`
2. View real-time statistics
3. Manage tickets and attendees
4. Send email updates
5. Scan QR codes at entry
6. Create complimentary tickets

## 🧪 Testing

### Test Payments (Paystack Test Mode)

- **Card:** 4084084084084081
- **CVV:** 408
- **Expiry:** Any future date
- **PIN:** 0000
- **OTP:** 123456

### Test Admin Access

1. Go to http://localhost:3000/admin
2. Enter password from `.env`
3. Test all features

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in dashboard
vercel --prod
```

### Environment Variables

Add all `.env` variables to your hosting platform:
- DATABASE_URL
- NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
- PAYSTACK_SECRET_KEY
- BREVO_API_KEY
- BREVO_SENDER_EMAIL
- BREVO_SENDER_NAME
- ADMIN_SECRET
- NEXT_PUBLIC_ADMIN_PASSWORD
- NEXT_PUBLIC_APP_URL

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Complete setup instructions
- [Installation](INSTALLATION.md) - Step-by-step installation
- [Design System](DESIGN_SYSTEM.md) - Design specifications
- [Paystack Setup](PAYSTACK_SETUP.md) - Payment configuration

## 🔐 Security

- Password-protected admin area
- Secure API endpoints with Bearer auth
- Paystack payment verification
- QR code uniqueness validation
- SQL injection protection (Prisma)
- Environment variable protection

## 📊 Admin Dashboard Features

### Statistics
- Total tickets sold
- Men vs Women breakdown
- Revenue tracking
- Capacity monitoring

### Ticket Management
- View all purchases
- Filter by status
- Export data
- Track scans

### Email System
- Send to all attendees
- Send to specific groups
- HTML email composer
- Bulk sending

### QR Scanner
- Real-time validation
- Mark tickets as used
- Prevent duplicate entry
- Show ticket details

### Ticket Creation
- Create complimentary tickets
- Send to specific emails
- Choose ticket type
- Automatic delivery

### Settings
- Set maximum capacity
- Update limits
- Control availability

## 🐛 Troubleshooting

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed troubleshooting.

## 📞 Support

- **Phone:** 0903 439 9874
- **WhatsApp:** +234 903 439 9874

## 📝 License

© 2026 NO LOVERS HERE. All rights reserved.

## 🙏 Credits

Built with Next.js, Tailwind CSS, Prisma, Paystack, and Brevo.
"# no-lovers-here" 
