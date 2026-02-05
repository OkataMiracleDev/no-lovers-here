# Complete Deployment Checklist

## Pre-Deployment Setup

### 1. Database Setup
- [ ] PostgreSQL database created (Neon/Supabase/Render)
- [ ] Database connection string obtained
- [ ] Prisma schema pushed: `npm run db:push`
- [ ] Database accessible from deployment platform

### 2. Third-Party Services

#### Paystack (Payment Gateway)
- [ ] Account created at https://dashboard.paystack.com
- [ ] Test keys obtained (pk_test_xxx, sk_test_xxx)
- [ ] Live keys obtained (for production)
- [ ] Test payment completed successfully

#### Brevo (Email Service)
- [ ] Account created at https://app.brevo.com
- [ ] API key generated
- [ ] Sender email verified
- [ ] Test email sent successfully

### 3. Environment Variables Prepared
- [ ] All variables documented in `.env.example`
- [ ] Production values ready (different from development)
- [ ] Admin secret generated (strong random string)
- [ ] `.env` added to `.gitignore`

### 4. Code Repository
- [ ] Code pushed to GitHub
- [ ] `.env` NOT committed
- [ ] All dependencies in `package.json`
- [ ] Build tested locally: `npm run build`

## Deployment Steps

### Option A: Vercel (Recommended for Next.js)

#### Initial Setup
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] All environment variables added
- [ ] First deployment successful

#### Post-Deployment
- [ ] Deployment URL copied
- [ ] `NEXT_PUBLIC_APP_URL` updated with actual URL
- [ ] Redeployed after URL update
- [ ] Custom domain configured (optional)

### Option B: Render

#### Initial Setup
- [ ] Render account created
- [ ] Web Service created
- [ ] Root directory set to project root (NOT "server" or "lib")
- [ ] Build command: `npm install && npm run db:push && npm run build`
- [ ] Start command: `npm start`
- [ ] All environment variables added

#### Post-Deployment
- [ ] Deployment URL copied
- [ ] `NEXT_PUBLIC_APP_URL` updated with actual URL
- [ ] Manual redeploy triggered
- [ ] Custom domain configured (optional)

## Testing Checklist

### Frontend Testing
- [ ] Homepage loads correctly
- [ ] Images display properly
- [ ] Prices load dynamically from database
- [ ] Responsive design works on mobile
- [ ] Navigation works
- [ ] All sections visible

### Payment Flow Testing
- [ ] Click "Buy Now" button works
- [ ] Email modal appears
- [ ] Form validation works
- [ ] Quantity selector works (1-10)
- [ ] Paystack popup opens
- [ ] Test payment completes (use test card below)
- [ ] Success message appears
- [ ] Email received with ticket and QR code

**Paystack Test Card:**
```
Card Number: 4084084084084081
CVV: 408
Expiry: Any future date
PIN: 0000
OTP: 123456
```

### Admin Panel Testing
- [ ] `/admin` page loads
- [ ] Login works with `ADMIN_SECRET`
- [ ] Dashboard shows correct stats
- [ ] Tickets tab displays all tickets
- [ ] Email tab allows sending bulk emails
- [ ] Scan tab validates QR codes
- [ ] Create tab generates complimentary tickets
- [ ] Settings tab allows changing:
  - [ ] Maximum tickets
  - [ ] Men ticket price
  - [ ] Women ticket price
- [ ] Settings save successfully
- [ ] Frontend reflects new prices after change

### Email Testing
- [ ] Purchase confirmation email received
- [ ] Email contains QR code
- [ ] Email displays correctly on mobile
- [ ] Email displays correctly in Gmail/Outlook
- [ ] Admin-created tickets send emails
- [ ] Bulk emails work from admin panel

### Database Testing
- [ ] Tickets saved correctly
- [ ] Settings persist after changes
- [ ] Ticket counts update accurately
- [ ] Revenue calculation correct
- [ ] QR codes unique for each ticket

## Security Checklist

### Environment Variables
- [ ] `ADMIN_SECRET` changed from default
- [ ] Strong random string used (20+ characters)
- [ ] Same value for `ADMIN_SECRET` and `NEXT_PUBLIC_ADMIN_SECRET`
- [ ] Production secrets different from development
- [ ] No secrets committed to Git

### API Security
- [ ] Admin routes protected with Bearer token
- [ ] Payment verification uses Paystack API
- [ ] Database queries use Prisma (SQL injection safe)
- [ ] CORS not overly permissive

### Database Security
- [ ] Database password is strong
- [ ] Database allows connections only from deployment platform
- [ ] Connection string not exposed in client-side code
- [ ] SSL enabled for database connections

## Performance Checklist

### Frontend Performance
- [ ] Images optimized (using Next.js Image component)
- [ ] No console errors in browser
- [ ] Page loads in < 3 seconds
- [ ] Mobile performance acceptable

### Backend Performance
- [ ] API routes respond quickly (< 1 second)
- [ ] Database queries optimized
- [ ] No N+1 query problems
- [ ] Prisma client generated correctly

## Monitoring Setup

### Vercel (if using)
- [ ] Analytics enabled
- [ ] Function logs accessible
- [ ] Error tracking configured

### Render (if using)
- [ ] Logs accessible in dashboard
- [ ] Health checks passing
- [ ] Auto-deploy enabled

### General
- [ ] Error notifications configured
- [ ] Uptime monitoring set up (optional)
- [ ] Database backup configured

## Going Live Checklist

### Pre-Launch
- [ ] All tests passed
- [ ] Test payment completed successfully
- [ ] Admin panel fully functional
- [ ] Email delivery confirmed
- [ ] Mobile testing completed
- [ ] Cross-browser testing done

### Launch Day
- [ ] Switch to Paystack LIVE keys
- [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Test with small real payment first
- [ ] Monitor logs closely
- [ ] Have rollback plan ready

### Post-Launch
- [ ] Monitor first few transactions
- [ ] Check email delivery
- [ ] Verify ticket generation
- [ ] Monitor error logs
- [ ] Check database growth

## Troubleshooting Guide

### Build Failures
**Issue:** Prisma client not found
- **Solution:** Add `"postinstall": "prisma generate"` to package.json

**Issue:** Environment variables not found
- **Solution:** Verify all variables set in deployment platform

### Runtime Errors
**Issue:** Database connection fails
- **Solution:** Check DATABASE_URL format and database accessibility

**Issue:** Paystack not loading
- **Solution:** Verify script in layout.tsx, check browser console

**Issue:** Emails not sending
- **Solution:** Verify Brevo API key and sender email verification

### Admin Issues
**Issue:** Can't login to admin
- **Solution:** Verify ADMIN_SECRET matches NEXT_PUBLIC_ADMIN_SECRET

**Issue:** Settings not saving
- **Solution:** Check API route logs, verify database connection

## Maintenance Tasks

### Daily
- [ ] Check error logs
- [ ] Monitor ticket sales
- [ ] Verify email delivery

### Weekly
- [ ] Review analytics
- [ ] Check database size
- [ ] Verify backup status

### Monthly
- [ ] Review security
- [ ] Update dependencies
- [ ] Rotate secrets (if needed)

## Support Contacts

### Platform Support
- Vercel: https://vercel.com/support
- Render: https://render.com/docs
- Neon: https://neon.tech/docs
- Supabase: https://supabase.com/docs

### Service Support
- Paystack: support@paystack.com
- Brevo: https://help.brevo.com

## Rollback Plan

If deployment fails:
1. Revert to previous deployment in platform dashboard
2. Check error logs for specific issues
3. Fix issues locally
4. Test build locally: `npm run build`
5. Redeploy

## Success Criteria

Deployment is successful when:
- [ ] Application accessible at production URL
- [ ] Test payment completes successfully
- [ ] Email received with ticket
- [ ] Admin panel fully functional
- [ ] No errors in logs
- [ ] Performance acceptable
- [ ] Mobile experience good
- [ ] All features working as expected

## Next Steps After Deployment

1. **Marketing:**
   - Share production URL
   - Test social media sharing
   - Verify meta tags

2. **Monitoring:**
   - Set up alerts
   - Monitor first transactions
   - Track user behavior

3. **Optimization:**
   - Review performance metrics
   - Optimize slow queries
   - Improve user experience

4. **Documentation:**
   - Document any deployment-specific issues
   - Update README with production URL
   - Create user guide if needed
