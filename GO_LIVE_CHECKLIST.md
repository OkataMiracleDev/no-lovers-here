# Go Live Checklist

## Before Launch

### ✅ Database
- [ ] Set up production PostgreSQL database (Neon/Supabase/Railway)
- [ ] Run `npm run db:push` on production database
- [ ] Verify database connection works
- [ ] Back up database regularly

### ✅ Paystack
- [ ] Complete Paystack business verification
- [ ] Switch from test keys to live keys
- [ ] Update `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` (pk_live_...)
- [ ] Update `PAYSTACK_SECRET_KEY` (sk_live_...)
- [ ] Test live payment with small amount
- [ ] Set up webhook URL (optional but recommended)

### ✅ Brevo Email
- [ ] Verify your domain in Brevo
- [ ] Set up SPF and DKIM records
- [ ] Test email delivery to multiple providers (Gmail, Yahoo, Outlook)
- [ ] Check spam folder placement
- [ ] Verify sender email is correct
- [ ] Test bulk email sending

### ✅ Environment Variables
- [ ] Set all production environment variables
- [ ] Use strong ADMIN_SECRET password
- [ ] Update NEXT_PUBLIC_APP_URL to production domain
- [ ] Double-check all API keys are correct
- [ ] Never commit .env file to git

### ✅ Security
- [ ] Change default admin password
- [ ] Use HTTPS only (Vercel provides this automatically)
- [ ] Test admin authentication
- [ ] Verify API endpoints require authentication
- [ ] Check for exposed secrets in code

### ✅ Testing
- [ ] Test complete payment flow end-to-end
- [ ] Verify email delivery with real email addresses
- [ ] Test QR code generation and scanning
- [ ] Test admin dashboard all features
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Verify ticket limits work correctly

### ✅ Content
- [ ] Update event date/time if needed
- [ ] Verify location details
- [ ] Check all copy for typos
- [ ] Ensure contact information is correct
- [ ] Update logo.png with final version
- [ ] Add real event photos (1.jfif, 2.jfif, 3.jfif)
- [ ] Update flyer.png

### ✅ Performance
- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Test page load speed
- [ ] Verify mobile performance

### ✅ Legal
- [ ] Add Terms & Conditions page (if required)
- [ ] Add Privacy Policy (if required)
- [ ] Add Refund Policy
- [ ] Ensure age verification (18+) is clear

## Launch Day

### ✅ Pre-Launch (1 hour before)
- [ ] Final test of payment system
- [ ] Verify email system is working
- [ ] Check admin dashboard access
- [ ] Ensure database is backed up
- [ ] Monitor server resources

### ✅ During Launch
- [ ] Monitor payment transactions
- [ ] Watch for error logs
- [ ] Check email delivery rates
- [ ] Monitor ticket sales in real-time
- [ ] Be ready to respond to customer inquiries

### ✅ Post-Launch (First 24 hours)
- [ ] Monitor all systems closely
- [ ] Respond to customer support requests
- [ ] Check for any payment failures
- [ ] Verify all emails are being delivered
- [ ] Monitor database performance

## Event Day

### ✅ Before Event (2 hours before)
- [ ] Send location reveal email to all ticket holders
- [ ] Test QR scanner thoroughly
- [ ] Ensure admin dashboard is accessible
- [ ] Have backup plan for scanner failure
- [ ] Print backup guest list

### ✅ During Event
- [ ] Scan all tickets at entry
- [ ] Monitor for duplicate entries
- [ ] Handle any ticket issues
- [ ] Track attendance numbers

### ✅ After Event
- [ ] Send thank you email to attendees
- [ ] Gather feedback
- [ ] Archive event data
- [ ] Generate final reports

## Monitoring

### Daily Checks
- [ ] Check ticket sales numbers
- [ ] Monitor email delivery
- [ ] Review error logs
- [ ] Check payment success rate

### Weekly Checks
- [ ] Database backup verification
- [ ] Security audit
- [ ] Performance monitoring
- [ ] Customer feedback review

## Emergency Contacts

- **Paystack Support:** support@paystack.com
- **Brevo Support:** contact@brevo.com
- **Hosting Support:** (Your hosting provider)
- **Developer:** (Your contact)

## Rollback Plan

If critical issues occur:

1. **Payment Issues:**
   - Pause ticket sales
   - Contact Paystack support
   - Communicate with customers

2. **Email Issues:**
   - Check Brevo dashboard
   - Verify API key
   - Send manual emails if needed

3. **Database Issues:**
   - Restore from backup
   - Contact database provider
   - Pause new transactions

4. **Complete Failure:**
   - Revert to previous deployment
   - Communicate with customers
   - Refund if necessary

## Success Metrics

Track these KPIs:
- [ ] Total tickets sold
- [ ] Conversion rate (visitors to buyers)
- [ ] Email open rate
- [ ] Payment success rate
- [ ] Customer support tickets
- [ ] Revenue generated

## Post-Event

- [ ] Send thank you emails
- [ ] Request feedback/reviews
- [ ] Archive all data
- [ ] Generate final reports
- [ ] Plan for next event

---

**Remember:** Test everything multiple times before going live!

**Support:** 0903 439 9874
