# Backend Deployment Checklist ✅

## Issues Fixed

### 1. ✅ sib-api-v3-sdk Module Resolution Error
- **Problem**: `Module not found: Can't resolve 'model/UploadImageToGallery'`
- **Solution**: 
  - Added `@ts-ignore` comment in `lib/email.ts`
  - Updated `next.config.ts` with webpack alias to ignore the missing module
  - This is a known issue with the sib-api-v3-sdk package in Next.js

### 2. ✅ TypeScript Errors Fixed
- Replaced deprecated `substr()` with `substring()` in:
  - `app/api/admin/create-ticket/route.ts`
  - `app/api/verify-payment/route.ts`
- Fixed implicit `any` type in `app/api/admin/send-email/route.ts`

### 3. ✅ Database Configuration
- **You're using PostgreSQL (correct!)** - NOT MongoDB
- Prisma schema is properly configured for PostgreSQL
- MongoDB package in dependencies is unused (can be removed if desired)

### 4. ✅ Logic Improvements
- Fixed payment verification to handle multiple tickets per payment reference
- Changed from `findUnique` to `findFirst` with `startsWith` for better handling

## Pre-Deployment Checklist

### Environment Variables
- [ ] Update `DATABASE_URL` with production PostgreSQL connection string
- [ ] Use production Paystack keys (pk_live_* and sk_live_*)
- [ ] Verify Brevo API key is active
- [ ] Change `ADMIN_SECRET` to a strong, unique password
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain

### Database Setup
```bash
# Push schema to production database
npm run db:push

# Verify connection
npm run db:studio
```

### Security
- [ ] Ensure `.env` is in `.gitignore` (already done)
- [ ] Never commit production secrets to git
- [ ] Use strong admin password (not "2006")
- [ ] Enable HTTPS in production

### Testing Before Deploy
```bash
# Install dependencies
npm install

# Run build to check for errors
npm run build

# Test locally
npm run dev
```

### Test These Flows:
1. **Payment Flow**: Test ticket purchase with Paystack test keys
2. **Email Sending**: Verify Brevo sends emails correctly
3. **Admin Dashboard**: 
   - Login with admin secret
   - Create complimentary ticket
   - Scan ticket QR code
   - Send bulk email
   - Update settings
4. **QR Code Generation**: Ensure QR codes are generated properly

## Deployment Steps

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Settings > Environment Variables
```

### Option 2: Other Platforms
- Ensure Node.js 18+ is available
- Set all environment variables
- Run `npm run build && npm start`

## Post-Deployment Verification

- [ ] Visit production URL and verify homepage loads
- [ ] Test payment flow with small amount
- [ ] Check email delivery
- [ ] Test admin dashboard login
- [ ] Verify QR code scanning works
- [ ] Check database connections

## Monitoring

- Monitor Vercel/hosting logs for errors
- Check Brevo dashboard for email delivery rates
- Monitor Paystack dashboard for payments
- Regularly backup PostgreSQL database

## Support Contacts

- **Paystack**: support@paystack.com
- **Brevo**: support@brevo.com
- **Database Issues**: Check your PostgreSQL provider docs

---

## Current Status: ✅ READY TO DEPLOY

All critical errors have been fixed. The backend is production-ready after updating environment variables.
