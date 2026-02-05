# Render Deployment Guide

## Overview
This guide will help you deploy your Next.js application to Render.

## Prerequisites
- GitHub account with your code pushed
- Render account (free tier available at https://render.com)
- PostgreSQL database (Neon, Supabase, or Render PostgreSQL)

## Step 1: Prepare Your Database

### MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Create database user
4. Allow network access (0.0.0.0/0)
5. Get connection string
6. Format: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

**Detailed guide:** See `MONGODB_ATLAS_SETUP.md`

## Step 2: Push Database Schema

Before deploying, push your Prisma schema to the database:

```bash
# Set your DATABASE_URL temporarily
$env:DATABASE_URL="your-postgresql-connection-string"

# Push the schema
npm run db:push
```

## Step 3: Deploy to Render

### 3.1 Create Web Service
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

**Basic Settings:**
- Name: `no-lovers-here` (or your preferred name)
- Region: Choose closest to your users
- Branch: `main` (or your default branch)
- Root Directory: **Leave EMPTY** (use project root, NOT "server" or "lib")
- Runtime: `Node`
- Build Command: `npm install && npm run db:push && npm run build`
- Start Command: `npm start`

**Instance Type:**
- Select "Free" or "Starter" based on your needs

### 3.2 Environment Variables

Click "Advanced" and add these environment variables:

```bash
# Database
DATABASE_URL=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Brevo Email
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxx
BREVO_SENDER_EMAIL=noreply@yourdomain.com
BREVO_SENDER_NAME=NO LOVERS HERE

# Admin
ADMIN_SECRET=your-secure-random-string-here
NEXT_PUBLIC_ADMIN_SECRET=your-secure-random-string-here

# App URL (Update after deployment)
NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com
```

**Important Notes:**
- Use the SAME value for `ADMIN_SECRET` and `NEXT_PUBLIC_ADMIN_SECRET`
- Generate a secure random string for admin secret (use a password generator)
- You'll update `NEXT_PUBLIC_APP_URL` after first deployment

### 3.3 Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes first time)
3. Once deployed, copy your app URL (e.g., `https://your-app.onrender.com`)
4. Go back to Environment Variables
5. Update `NEXT_PUBLIC_APP_URL` with your actual URL
6. Click "Manual Deploy" → "Deploy latest commit"

## Step 4: Verify Deployment

### Test the Application
1. Visit your Render URL
2. Try purchasing a ticket (use Paystack test mode)
3. Check email delivery
4. Test admin panel at `/admin`

### Test Payment Flow
Use Paystack test cards:
- Card: `4084084084084081`
- CVV: `408`
- Expiry: Any future date
- PIN: `0000`
- OTP: `123456`

## Step 5: Post-Deployment

### Update Paystack Webhook (Optional)
If you want real-time payment notifications:
1. Go to Paystack Dashboard → Settings → Webhooks
2. Add webhook URL: `https://your-app.onrender.com/api/webhook/paystack`
3. Save

### Monitor Your App
- Render Dashboard → Your Service → Logs
- Check for any errors
- Monitor database connections

## Troubleshooting

### Build Fails
- Check that `DATABASE_URL` is set correctly
- Verify all environment variables are present
- Check build logs for specific errors

### Database Connection Issues
- Ensure DATABASE_URL format is correct: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
- Check if MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify database user credentials are correct
- Check for special characters in password (URL encode them)

### Email Not Sending
- Verify `BREVO_API_KEY` is correct
- Check sender email is verified in Brevo
- Look at Render logs for email errors

### Admin Login Not Working
- Ensure `ADMIN_SECRET` and `NEXT_PUBLIC_ADMIN_SECRET` match
- Clear browser cache
- Check browser console for errors

## Free Tier Limitations

Render Free Tier:
- App sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- 750 hours/month free (enough for one app)

**Upgrade to Starter ($7/month) for:**
- No sleeping
- Better performance
- Custom domains

## Custom Domain (Optional)

1. In Render Dashboard → Your Service → Settings
2. Scroll to "Custom Domain"
3. Add your domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_APP_URL` environment variable

## Security Checklist

- [ ] Changed `ADMIN_SECRET` from default
- [ ] Using production Paystack keys (when ready)
- [ ] Verified sender email in Brevo
- [ ] Database has strong password
- [ ] Environment variables are set correctly
- [ ] Tested payment flow
- [ ] Tested email delivery
- [ ] Tested admin panel

## Going Live

When ready for production:
1. Update Paystack keys to live keys (`pk_live_...` and `sk_live_...`)
2. Update `NEXT_PUBLIC_APP_URL` to your production domain
3. Test everything again with real payment
4. Monitor logs closely

## Support

If you encounter issues:
- Check Render logs: Dashboard → Your Service → Logs
- Check Render status: https://status.render.com
- Render docs: https://render.com/docs
