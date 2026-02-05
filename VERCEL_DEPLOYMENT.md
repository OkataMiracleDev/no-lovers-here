# Vercel Deployment Guide

## Overview
Deploy your Next.js frontend to Vercel (recommended for Next.js apps).

## Prerequisites
- GitHub account with your code pushed
- Vercel account (free tier at https://vercel.com)
- MongoDB Atlas database (free tier at https://www.mongodb.com/cloud/atlas)

## Step 1: Prepare for Deployment

### 1.1 Verify Your Code
Ensure these files are in your repository:
- `package.json`
- `next.config.ts`
- `tsconfig.json`
- `.env.example` (for reference, NOT `.env`)

### 1.2 Add `.env` to `.gitignore`
Make sure `.env` is in your `.gitignore`:
```
.env
.env.local
```

## Step 2: Deploy to Vercel

### 2.1 Import Project
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### 2.2 Configure Project
Vercel will auto-detect Next.js settings:
- Framework Preset: `Next.js`
- Root Directory: `./` (leave as is)
- Build Command: `npm run build` (auto-detected)
- Output Directory: `.next` (auto-detected)

### 2.3 Environment Variables

Click "Environment Variables" and add ALL of these:

```bash
# Database (MongoDB Atlas)
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Paystack Payment Gateway
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Brevo Email Service
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxx
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SENDER_NAME=NO LOVERS HERE

# Admin Authentication
ADMIN_SECRET=your-secure-random-string-here
NEXT_PUBLIC_ADMIN_SECRET=your-secure-random-string-here

# Application URL (will update after deployment)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**Important:**
- Add variables for ALL environments (Production, Preview, Development)
- Use SAME value for `ADMIN_SECRET` and `NEXT_PUBLIC_ADMIN_SECRET`
- You'll update `NEXT_PUBLIC_APP_URL` after first deployment

### 2.4 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build
3. Once deployed, copy your Vercel URL

### 2.5 Update App URL
1. Go to Project Settings → Environment Variables
2. Find `NEXT_PUBLIC_APP_URL`
3. Update to your actual Vercel URL (e.g., `https://your-app.vercel.app`)
4. Redeploy: Deployments → Latest → "Redeploy"

## Step 3: Database Setup

### 3.1 Push Prisma Schema
From your local machine:

```bash
# Set DATABASE_URL
$env:DATABASE_URL="your-postgresql-connection-string"

# Push schema
npm run db:push

# Verify
npm run db:studio
```

### 3.2 Verify Database Connection
Check Vercel deployment logs:
1. Go to your project → Deployments
2. Click latest deployment
3. Check "Functions" logs for database errors

## Step 4: Verify Deployment

### 4.1 Test Frontend
1. Visit your Vercel URL
2. Check that prices load correctly
3. Verify images display
4. Test responsive design

### 4.2 Test Payment Flow
1. Click "Buy Now" on a ticket
2. Fill in email and name
3. Use Paystack test card:
   - Card: `4084084084084081`
   - CVV: `408`
   - Expiry: Any future date
   - PIN: `0000`
   - OTP: `123456`
4. Verify email is received

### 4.3 Test Admin Panel
1. Go to `/admin`
2. Login with your `ADMIN_SECRET`
3. Verify all tabs work:
   - Tickets list
   - Email sending
   - Ticket scanning
   - Create ticket
   - Settings (including price changes)

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain
1. Project Settings → Domains
2. Add your domain (e.g., `nolovershere.com`)
3. Follow DNS configuration instructions

### 5.2 Update Environment Variables
1. Update `NEXT_PUBLIC_APP_URL` to your custom domain
2. Update `BREVO_SENDER_EMAIL` to use your domain
3. Redeploy

### 5.3 Configure DNS
Add these records to your domain provider:

**For root domain (nolovershere.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Step 6: Performance Optimization

### 6.1 Enable Analytics (Optional)
1. Project Settings → Analytics
2. Enable Vercel Analytics
3. Monitor page views and performance

### 6.2 Image Optimization
Vercel automatically optimizes images. Ensure you're using Next.js `<Image>` component (already done).

### 6.3 Caching
API routes are automatically cached. No additional config needed.

## Troubleshooting

### Build Fails
**Error: "Cannot find module '@prisma/client'"**
- Solution: Ensure `prisma generate` runs during build
- Add to `package.json` scripts:
  ```json
  "postinstall": "prisma generate"
  ```

**Error: "DATABASE_URL is not defined"**
- Solution: Add `DATABASE_URL` to environment variables
- Redeploy after adding

### Runtime Errors
**Error: "PrismaClient is unable to connect"**
- Check DATABASE_URL format (MongoDB connection string)
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify database user credentials
- Check for special characters in password (URL encode them)

**Error: "Paystack is not defined"**
- Ensure Paystack script is in `app/layout.tsx`
- Check browser console for script loading errors

### Email Issues
**Emails not sending:**
- Verify `BREVO_API_KEY` is correct
- Check sender email is verified in Brevo
- Look at Function logs in Vercel

### Admin Login Issues
**Can't login:**
- Verify `ADMIN_SECRET` matches `NEXT_PUBLIC_ADMIN_SECRET`
- Clear browser cache
- Check browser console for errors

## Environment Variables Reference

### Required Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority` |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key | `pk_test_xxx` |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | `sk_test_xxx` |
| `BREVO_API_KEY` | Brevo API key | `xkeysib-xxx` |
| `BREVO_SENDER_EMAIL` | Verified sender email | `noreply@domain.com` |
| `BREVO_SENDER_NAME` | Sender name | `NO LOVERS HERE` |
| `ADMIN_SECRET` | Admin password | `secure-random-string` |
| `NEXT_PUBLIC_ADMIN_SECRET` | Admin password (public) | Same as above |
| `NEXT_PUBLIC_APP_URL` | Your app URL | `https://app.vercel.app` |

### Security Notes
- Never commit `.env` to Git
- Use different secrets for production vs development
- Rotate secrets regularly
- Use strong random strings for `ADMIN_SECRET`

## Vercel Free Tier Limits

Free tier includes:
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- Serverless functions

**Upgrade to Pro ($20/month) for:**
- More bandwidth
- Team collaboration
- Advanced analytics
- Priority support

## Going Live Checklist

- [ ] All environment variables set
- [ ] Database schema pushed
- [ ] Test payment completed successfully
- [ ] Test email received
- [ ] Admin panel tested
- [ ] Custom domain configured (if applicable)
- [ ] Paystack live keys added (when ready)
- [ ] Sender email verified in Brevo
- [ ] Analytics enabled
- [ ] Error monitoring set up

## Production Deployment

When ready for production:

1. **Update Paystack Keys:**
   - Change to live keys: `pk_live_...` and `sk_live_...`
   - Test with small real payment first

2. **Update Environment Variables:**
   - Set `NEXT_PUBLIC_APP_URL` to production domain
   - Verify all other variables

3. **Test Everything:**
   - Complete payment flow
   - Email delivery
   - Admin functions
   - Mobile responsiveness

4. **Monitor:**
   - Check Vercel Analytics
   - Monitor Function logs
   - Watch for errors

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:
- Push to `main` → Production deployment
- Push to other branches → Preview deployment
- Pull requests → Preview deployment with unique URL

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Vercel Status: https://vercel-status.com
- Next.js Docs: https://nextjs.org/docs
- Vercel Community: https://github.com/vercel/vercel/discussions
