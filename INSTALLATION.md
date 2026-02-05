# Installation Instructions

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Paystack account
- Brevo account

## Step-by-Step Installation

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Database Setup

**Option A: Local PostgreSQL**
```bash
# Install PostgreSQL locally
# Create database
createdb nolovershere

# Add to .env
DATABASE_URL="postgresql://localhost:5432/nolovershere"
```

**Option B: Neon (Free Cloud Database)**
1. Go to https://neon.tech
2. Create free account
3. Create new project
4. Copy connection string
5. Add to `.env`

**Option C: Supabase**
1. Go to https://supabase.com
2. Create project
3. Get connection string from Settings > Database
4. Add to `.env`

### 3. Environment Variables

Create `.env` file:

```bash
# Copy example
cp .env.example .env
```

Fill in all values:

```env
# Database (REQUIRED)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# Paystack (REQUIRED)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_test_xxxxxxxxxxxx"
PAYSTACK_SECRET_KEY="sk_test_xxxxxxxxxxxx"

# Brevo Email (REQUIRED)
BREVO_API_KEY="xkeysib-xxxxxxxxxxxx"
BREVO_SENDER_EMAIL="noreply@yourdomain.com"
BREVO_SENDER_NAME="NO LOVERS HERE"

# Admin (REQUIRED)
ADMIN_SECRET="change-this-to-something-secure"
NEXT_PUBLIC_ADMIN_PASSWORD="admin123"

# App URL (REQUIRED)
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Initialize Database

```bash
# Push schema to database
npm run db:push

# Optional: Open Prisma Studio to view data
npm run db:studio
```

### 5. Run Development Server

```bash
npm run dev
```

Visit:
- **Main Site:** http://localhost:3000
- **Admin Dashboard:** http://localhost:3000/admin

### 6. Test Everything

**Test Payment:**
1. Click "Buy Now" on homepage
2. Enter test email
3. Use test card: `4084084084084081`
4. CVV: `408`, PIN: `0000`, OTP: `123456`
5. Check email for ticket

**Test Admin:**
1. Go to http://localhost:3000/admin
2. Enter password from `.env`
3. View tickets, send emails, scan QR codes

## Production Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Deploy to production
vercel --prod
```

### Set Up Production Database

Use Neon, Supabase, or Railway for production PostgreSQL.

### Configure Production Paystack

1. Complete Paystack business verification
2. Switch to live keys (`pk_live_...` and `sk_live_...`)
3. Update `.env` or Vercel environment variables

### Configure Production Brevo

1. Verify your domain in Brevo
2. Set up SPF/DKIM records
3. Use production API key

## Common Issues

### "Cannot connect to database"
- Check DATABASE_URL is correct
- Ensure database is running
- Verify network access

### "Paystack payment failed"
- Check public key is correct
- Ensure using test card in test mode
- Verify Paystack account is active

### "Email not sending"
- Check Brevo API key
- Verify sender email in Brevo dashboard
- Check Brevo account limits

### "Admin login not working"
- Clear browser cache/localStorage
- Check ADMIN_SECRET in .env
- Verify password matches

## Need Help?

Contact: 0903 439 9874
