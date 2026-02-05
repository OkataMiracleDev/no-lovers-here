# NO LOVERS HERE - Complete Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a PostgreSQL database and add the connection string to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and add your database URL:
```
DATABASE_URL="postgresql://user:password@localhost:5432/nolovershere"
```

Push the schema to your database:
```bash
npm run db:push
```

### 3. Configure Paystack

1. Sign up at [Paystack](https://paystack.com)
2. Get your API keys from Settings > API Keys
3. Add to `.env`:

```
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_xxxxxxxxxxxx"
PAYSTACK_SECRET_KEY="sk_test_xxxxxxxxxxxx"
```

### 4. Configure Brevo (Email Service)

1. Sign up at [Brevo](https://www.brevo.com) (formerly Sendinblue)
2. Go to Settings > SMTP & API > API Keys
3. Create a new API key
4. Add to `.env`:

```
BREVO_API_KEY="your-brevo-api-key"
BREVO_SENDER_EMAIL="noreply@yourdomain.com"
BREVO_SENDER_NAME="NO LOVERS HERE"
```

5. Verify your sender email in Brevo dashboard

### 5. Set Admin Password

Add to `.env`:
```
ADMIN_SECRET="your-super-secret-password"
NEXT_PUBLIC_ADMIN_PASSWORD="admin123"
```

### 6. Set App URL

```
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

For production, use your actual domain.

### 7. Run Development Server

```bash
npm run dev
```

Visit:
- Main site: http://localhost:3000
- Admin dashboard: http://localhost:3000/admin

---

## 📋 Features Implemented

### ✅ Main Landing Page
- Modern, bold design with gradient effects
- Hero section with event details
- Experience showcase with images
- Ticket purchase cards (Men: ₦18,000 / Women: ₦8,000)
- Integrated Paystack payment
- Rules section
- Contact information

### ✅ Payment System
- Paystack integration for secure payments
- Automatic payment verification
- Ticket generation with unique QR codes
- Email delivery with ticket and QR code

### ✅ Email System (Brevo)
- Beautifully designed ticket emails
- QR code embedded in email
- Event details and important reminders
- Bulk email capability for admin

### ✅ Admin Dashboard (`/admin`)

**Authentication:**
- Password-protected access
- Persistent login with localStorage

**Dashboard Features:**

1. **Statistics Overview**
   - Total tickets sold
   - Men vs Women breakdown
   - Total revenue
   - Capacity tracking

2. **Tickets Tab**
   - View all purchased tickets
   - Filter by status (active, used, cancelled)
   - See payment details
   - Export capability

3. **Email Tab**
   - Send emails to all ticket holders
   - Send to selected recipients
   - HTML email composer
   - Subject and content fields

4. **Scan Tab**
   - QR code scanner for entry validation
   - Real-time ticket verification
   - Mark tickets as used
   - Prevent duplicate entry
   - Show ticket details on scan

5. **Create Ticket Tab**
   - Manually create complimentary tickets
   - Send to specific email addresses
   - Choose ticket type (Men/Women)
   - Automatic email delivery

6. **Settings Tab**
   - Set maximum ticket capacity
   - Update event limits
   - Control ticket availability

---

## 🎫 How It Works

### Customer Flow:

1. **Visit Site** → Customer lands on homepage
2. **Choose Ticket** → Select Men (₦18,000) or Women (₦8,000)
3. **Click "Buy Now"** → Paystack payment modal opens
4. **Enter Email** → Customer provides email address
5. **Complete Payment** → Pay via card, bank transfer, or USSD
6. **Verification** → Backend verifies payment with Paystack
7. **Ticket Generation** → System creates unique ticket with QR code
8. **Email Delivery** → Customer receives beautifully designed email with:
   - Event details
   - QR code for entry
   - Important reminders
   - Contact information

### Admin Flow:

1. **Login** → Access `/admin` with password
2. **View Dashboard** → See real-time statistics
3. **Manage Tickets** → View all purchases, statuses
4. **Send Updates** → Email all attendees or specific groups
5. **Scan at Entry** → Validate tickets via QR code
6. **Create Comps** → Generate free tickets for VIPs/staff

---

## 🔐 Security Features

- Password-protected admin area
- Secure API endpoints with Bearer token auth
- Paystack webhook verification
- QR code uniqueness validation
- Duplicate payment prevention
- SQL injection protection (Prisma ORM)

---

## 📧 Email Template

The ticket email includes:
- Gradient header with event branding
- Personalized greeting
- Event details (date, time, location)
- Large QR code for scanning
- Ticket ID
- Important reminders
- Contact information
- Professional footer

---

## 🎨 Design System

- **Colors:** Hot Pink (#FF006B), Purple (#A855F7)
- **Typography:** Inter font family
- **Buttons:** 56px height, rounded corners
- **Cards:** Glassmorphism with borders
- **Animations:** Smooth hover effects

---

## 📱 QR Code System

Each ticket has a unique QR code containing:
- Ticket ID format: `NLH-{timestamp}-{random}`
- Scannable at entry
- One-time use validation
- Tracks scan time and scanner

---

## 🛠️ Database Schema

**Ticket Table:**
- id, email, name, ticketType
- amount, paymentRef, qrCode
- status (active/used/cancelled)
- createdAt, scannedAt, scannedBy

**Settings Table:**
- maxTickets, menTicketsSold, womenTicketsSold

**Admin Table:**
- id, email, password, name

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database

Use one of these PostgreSQL providers:
- **Neon** (recommended, free tier)
- **Supabase**
- **Railway**
- **Heroku Postgres**

### Environment Variables

Add all `.env` variables to your hosting platform.

---

## 🧪 Testing

### Test Payment (Paystack Test Mode)

Use these test cards:
- **Card:** 4084084084084081
- **CVV:** 408
- **Expiry:** Any future date
- **PIN:** 0000
- **OTP:** 123456

### Test Email

Use a real email address to receive test tickets.

### Test Admin

1. Go to `/admin`
2. Enter password from `.env`
3. Test all features

---

## 📊 Admin Dashboard Usage

### Scanning Tickets at Entry

1. Go to **Scan** tab
2. Use QR scanner or manually enter ticket ID
3. System validates:
   - ✅ Ticket exists
   - ✅ Not already used
   - ✅ Not cancelled
4. Mark as used on successful scan
5. Prevent re-entry

### Sending Bulk Emails

1. Go to **Email** tab
2. Choose "All Ticket Holders"
3. Write subject and HTML content
4. Click "Send Email"
5. All attendees receive email

### Creating Complimentary Tickets

1. Go to **Create** tab
2. Enter email address
3. Optional: Add name
4. Select ticket type
5. Click "Create & Send Ticket"
6. Recipient gets email with ticket

### Managing Capacity

1. Go to **Settings** tab
2. Update "Maximum Tickets"
3. Click "Save Settings"
4. System prevents overselling

---

## 🐛 Troubleshooting

### Emails Not Sending

- Check Brevo API key is correct
- Verify sender email in Brevo dashboard
- Check Brevo account is active
- Look at server logs for errors

### Payment Not Verifying

- Ensure Paystack secret key is correct
- Check webhook URL is set (if using webhooks)
- Verify payment reference is valid
- Check database connection

### Admin Can't Login

- Verify `ADMIN_SECRET` in `.env`
- Clear browser localStorage
- Check password matches

### QR Codes Not Generating

- Ensure `qrcode` package is installed
- Check file permissions
- Verify database is accessible

---

## 📞 Support

For issues or questions:
- **Phone:** 0903 439 9874
- **WhatsApp:** +234 903 439 9874

---

## 📝 License

© 2026 NO LOVERS HERE. All rights reserved.
