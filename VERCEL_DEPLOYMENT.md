# Vercel Deployment Guide - UPDATED

## ✅ LATEST FIX APPLIED
**Build Error Fixed:** Removed `--webpack` flag from build script in `package.json`. Vercel now builds successfully!

## Overview
Deploy your Next.js app (frontend + backend API routes) to Vercel.

## Prerequisites
- GitHub account with code pushed
- Vercel account (free at https://vercel.com)
- MongoDB Atlas database (free at https://www.mongodb.com/cloud/atlas)
- Paystack account with API keys
- Brevo account with API key

## Quick Start

### 1. Import to Vercel
1. Go to https://vercel.com/new
2. Import GitHub repository: `OkataMiracleDev/no-lovers-here`
3. Vercel auto-detects Next.js settings

### 2. Add Environment Variables

**CRITICAL:** Add ALL these variables BEFORE deploying!

Go to Project Settings → Environment Variables and add:

```bash
# Database (MongoDB Atlas)
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/nolovershere?retryWrites=true&w=majority&appName=no-lovers-here

# Paystack Payment (Use your actual keys from Paystack dashboard)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# Brevo Email Service (Use your actual API key from Brevo)
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxx
BREVO_SENDER_EMAIL=noreply.nolovershere@gmail.com
BREVO_SENDER_NAME=NO-LOVERS

# Admin Authentication (Change to secure password)
ADMIN_SECRET=your-secure-password
NEXT_PUBLIC_ADMIN_SECRET=your-secure-password

# Application URL (update after first deploy)
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**IMPORTANT:** Replace the placeholder values above with your actual credentials from:
- MongoDB Atlas connection string (from your .env file)
- Paystack keys (from https://dashboard.paystack.com/#/settings/developers)
- Brevo API key (from https://app.brevo.com/settings/keys/api)
- Your chosen admin password

**Important:**
- Add to ALL environments (Production, Preview, Development)
- You're using LIVE Paystack keys (not test)
- Update `NEXT_PUBLIC_APP_URL` after first deployment

### 3. Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Copy your Vercel URL

### 4. Update App URL
1. Go to Settings → Environment Variables
2. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
3. Redeploy (Deployments → Latest → "Redeploy")

## Database Setup

Your MongoDB schema should already be pushed. If not:

```bash
# Local terminal
npm run db:push
```

This creates these collections:
- `Ticket` - Stores all tickets
- `Settings` - Stores event settings (prices, limits)
- `Admin` - Admin users

## Testing Your Deployment

### Test Frontend
1. Visit your Vercel URL
2. Verify prices display correctly
3. Check responsive design

### Test Payment Flow
1. Click "Buy Now" on a ticket
2. Enter email and name
3. Complete Paystack payment (LIVE payment - real money!)
4. Check email for ticket with QR code

### Test Admin Panel
1. Go to `/admin`
2. Password: `2006`
3. Test all tabs:
   - **Tickets:** View all tickets, delete tickets
   - **Email:** Send tickets to specific email
   - **Scan:** Scan QR codes (manual entry or camera)
   - **Create:** Create tickets manually
   - **Settings:** Adjust prices and ticket limits

## What Gets Deployed

✅ **Frontend:** Next.js app with React  
✅ **Backend:** API routes as serverless functions  
✅ **Database:** MongoDB Atlas (external)  
✅ **Email:** Brevo API (external)  
✅ **Payment:** Paystack (external)  
✅ **HTTPS:** Automatic SSL  
✅ **CDN:** Global edge network  

## Automatic Deployments

Every push to `main` triggers a new deployment:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel builds and deploys automatically in 2-3 minutes.

## Monitoring & Debugging

### View Function Logs
1. Vercel Dashboard → Your Project
2. Deployments → Latest
3. Functions tab
4. Click any function to see logs

### Key API Routes
- `/api/verify-payment` - Payment verification (has extensive logging)
- `/api/admin/create-ticket` - Manual ticket creation
- `/api/admin/send-email` - Email sending
- `/api/admin/settings` - Settings updates
- `/api/admin/tickets` - Ticket listing
- `/api/admin/tickets/[id]` - Delete ticket
- `/api/admin/scan` - QR code scanning

### Common Log Messages
The verify-payment route has detailed logging:
- "Verifying payment: [reference]"
- "Paystack response: [data]"
- "Ticket details: [info]"
- "Settings: [current settings]"
- "Payment verification complete"

## Troubleshooting

### Build Errors

**❌ Error: "unknown option --no-turbopack"**  
✅ **FIXED:** Removed flag from build script

**❌ Error: "Cannot find module @prisma/client"**  
✅ Solution: Run `npm run postinstall` locally, commit, push

**❌ TypeScript errors about maxMenTickets/maxWomenTickets**  
✅ Solution: Run `npm run postinstall` to regenerate Prisma client

### Runtime Errors

**❌ "Payment verification failed" (500 error)**  
Check these in order:
1. Verify `PAYSTACK_SECRET_KEY` is set in Vercel
2. Check function logs for specific error
3. Ensure MongoDB has all schema fields
4. Verify Paystack keys are correct

**❌ "PrismaClient unable to connect"**  
Solutions:
- Check `DATABASE_URL` format
- Ensure MongoDB Atlas allows connections from `0.0.0.0/0`
- Verify database name `nolovershere` is in connection string
- Check MongoDB user has read/write permissions

**❌ Emails not sending**  
Solutions:
- Verify `BREVO_API_KEY` is correct
- Check `BREVO_SENDER_EMAIL` is verified in Brevo dashboard
- Look at function logs for email errors
- Test API key in Brevo dashboard

**❌ Admin panel not loading**  
Solutions:
- Verify both `ADMIN_SECRET` and `NEXT_PUBLIC_ADMIN_SECRET` are set
- Clear browser cache
- Check browser console for errors
- Try incognito mode

### Database Issues

**❌ "Settings not found" errors**  
The app auto-creates settings with defaults:
- `maxTickets`: 500
- `maxMenTickets`: 250
- `maxWomenTickets`: 250
- `menTicketPrice`: 18000 (₦180)
- `womenTicketPrice`: 8000 (₦80)

**❌ Ticket counts not updating**  
Check:
- Settings exist in database
- `menTicketsSold` and `womenTicketsSold` fields exist
- Run `npm run db:push` if schema is outdated

## Environment Variables Checklist

Before deploying, ensure ALL are set:

- [ ] `DATABASE_URL`
- [ ] `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
- [ ] `PAYSTACK_SECRET_KEY`
- [ ] `BREVO_API_KEY`
- [ ] `BREVO_SENDER_EMAIL`
- [ ] `BREVO_SENDER_NAME`
- [ ] `ADMIN_SECRET`
- [ ] `NEXT_PUBLIC_ADMIN_SECRET`
- [ ] `NEXT_PUBLIC_APP_URL`

## Custom Domain (Optional)

### Add Domain
1. Project Settings → Domains
2. Add domain (e.g., `nolovershere.com`)
3. Configure DNS as instructed

### DNS Records
**Root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**WWW subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Update Environment
1. Update `NEXT_PUBLIC_APP_URL` to custom domain
2. Redeploy

## Performance

Vercel automatically provides:
- Image optimization
- Code splitting
- Edge caching
- Gzip compression
- HTTP/2
- Global CDN

No additional configuration needed!

## Vercel Free Tier

Includes:
- 100 GB bandwidth/month
- Unlimited deployments
- Unlimited API requests
- Automatic HTTPS
- Preview deployments
- Analytics (basic)

Perfect for this event ticketing app!

## Going Live Checklist

- [ ] All environment variables set in Vercel
- [ ] Database schema pushed to MongoDB
- [ ] Test payment completed (LIVE payment!)
- [ ] Test email received with QR code
- [ ] Admin panel tested (all tabs)
- [ ] Prices display correctly
- [ ] Ticket limits work
- [ ] Delete tickets works
- [ ] QR scanning works
- [ ] Mobile responsive
- [ ] Custom domain configured (if applicable)

## Production Tips

### Security
- Admin password is `2006` - consider changing for production
- Never commit `.env` to Git
- Rotate API keys periodically
- Monitor function logs for suspicious activity

### Monitoring
- Enable Vercel Analytics
- Check function logs regularly
- Monitor Paystack dashboard for payments
- Watch MongoDB Atlas metrics

### Backups
- MongoDB Atlas auto-backs up data
- Export tickets regularly from admin panel
- Keep copy of environment variables

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas
- Paystack Docs: https://paystack.com/docs
- Brevo Docs: https://developers.brevo.com

## Recent Changes

### Latest (Current)
- ✅ Fixed build error: Removed `--webpack` flag
- ✅ Added extensive logging to payment verification
- ✅ Auto-create settings with default values
- ✅ Regenerated Prisma client with new fields

### Previous
- Added `maxMenTickets` and `maxWomenTickets` to Settings
- Added delete ticket functionality
- Improved email template with QR code
- Added camera scanning UI
- Migrated from PostgreSQL to MongoDB Atlas

## Next Steps After Deployment

1. **Test Everything:**
   - Complete a real payment (LIVE keys!)
   - Verify email arrives
   - Test admin functions
   - Try on mobile device

2. **Monitor:**
   - Check Vercel function logs
   - Watch Paystack dashboard
   - Monitor email delivery in Brevo

3. **Promote:**
   - Share your Vercel URL
   - Test with friends first
   - Go live for event!

## Need Help?

Check function logs in Vercel for detailed error messages. The payment verification route has extensive logging to help debug issues.
