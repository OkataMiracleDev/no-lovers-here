# Quick Start Guide

## 🚀 Deploy in 15 Minutes

### Step 1: Database (2 minutes)
1. Go to https://neon.tech (free PostgreSQL)
2. Create new project
3. Copy connection string

### Step 2: Push Schema (1 minute)
```bash
# Windows PowerShell
$env:DATABASE_URL="your-connection-string-here"
npm run db:push
```

### Step 3: Deploy to Vercel (5 minutes)
1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Add environment variables (see below)
4. Click Deploy

### Step 4: Update App URL (2 minutes)
1. Copy your Vercel URL
2. Update `NEXT_PUBLIC_APP_URL` in Vercel settings
3. Redeploy

### Step 5: Test (5 minutes)
1. Visit your site
2. Test payment with test card
3. Check email
4. Test admin panel at `/admin`

---

## 📋 Environment Variables

Copy these to Vercel/Render:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Paystack (get from dashboard.paystack.com)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx

# Brevo Email (get from app.brevo.com)
BREVO_API_KEY=xkeysib-xxxxx
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SENDER_NAME=NO LOVERS HERE

# Admin (create a strong password)
ADMIN_SECRET=your-secure-password-here
NEXT_PUBLIC_ADMIN_SECRET=your-secure-password-here

# App URL (update after first deploy)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## 🧪 Test Payment

Use Paystack test card:
```
Card: 4084084084084081
CVV: 408
Expiry: 12/25
PIN: 0000
OTP: 123456
```

---

## 🎯 Key Features

### For Customers:
- Buy tickets online (Men: ₦18,000 / Women: ₦8,000)
- Receive QR code via email
- Multiple tickets per purchase

### For Admin (`/admin`):
- View all tickets
- Send bulk emails
- Scan QR codes
- Create complimentary tickets
- **Change ticket prices anytime**
- Adjust max capacity

---

## 📚 Full Documentation

- **Vercel Deployment:** See `VERCEL_DEPLOYMENT.md`
- **Render Deployment:** See `RENDER_DEPLOYMENT.md`
- **Complete Checklist:** See `DEPLOYMENT_CHECKLIST.md`
- **All Answers:** See `ANSWERS_TO_YOUR_QUESTIONS.md`

---

## ❓ Common Issues

### Build fails?
- Add `"postinstall": "prisma generate"` to package.json ✅ (already done)
- Verify DATABASE_URL is set

### Can't login to admin?
- Ensure ADMIN_SECRET matches NEXT_PUBLIC_ADMIN_SECRET
- Use the exact same value for both

### Emails not sending?
- Verify Brevo API key
- Check sender email is verified in Brevo

### Prices not updating?
- Run `npm run db:push` to add price fields to database
- Check admin settings tab

---

## 🎉 You're Done!

Your event ticketing system is live with:
- ✅ Online payments (Paystack)
- ✅ Email delivery (Brevo)
- ✅ QR code tickets
- ✅ Admin dashboard
- ✅ Dynamic pricing
- ✅ Mobile responsive

**Next:** Switch to Paystack live keys when ready for real payments!
