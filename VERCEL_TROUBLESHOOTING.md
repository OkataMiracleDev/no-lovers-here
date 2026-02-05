# Vercel Deployment Troubleshooting

## ✅ BUILD SUCCESSFUL!

Your app is now deployed at: https://no-lovers-here.vercel.app

However, there's a runtime error with payment verification (500 error).

## Current Issue: Payment Verification Failing

**Error:** `POST /api/verify-payment 500 (Internal Server Error)`

This means the payment verification endpoint is crashing. Here's how to debug:

### Step 1: Check Vercel Function Logs

1. Go to https://vercel.com/dashboard
2. Click on your project: `no-lovers-here`
3. Click "Deployments" → Select latest deployment
4. Click "Functions" tab
5. Find and click `/api/verify-payment`
6. Look for error messages in the logs

The verify-payment route has extensive logging, so you should see:
- "Verifying payment: [reference]"
- "Paystack response: [data]"
- "Ticket details: [info]"
- Or an error message showing what failed

### Step 2: Verify Environment Variables

Go to Project Settings → Environment Variables and confirm ALL these are set:

**Required Variables:**
- [ ] `DATABASE_URL` - MongoDB connection string
- [ ] `PAYSTACK_SECRET_KEY` - Your Paystack secret key (sk_live_...)
- [ ] `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` - Your Paystack public key (pk_live_...)
- [ ] `BREVO_API_KEY` - Your Brevo API key (xkeysib-...)
- [ ] `BREVO_SENDER_EMAIL` - Your verified sender email
- [ ] `BREVO_SENDER_NAME` - Sender name (NO-LOVERS)
- [ ] `ADMIN_SECRET` - Admin password
- [ ] `NEXT_PUBLIC_ADMIN_SECRET` - Same as ADMIN_SECRET
- [ ] `NEXT_PUBLIC_APP_URL` - Your Vercel URL

**Common Issues:**
- Missing environment variables
- Typos in variable names
- Wrong values (test keys instead of live keys)
- MongoDB connection string missing database name

### Step 3: Check MongoDB Connection

The error might be a database connection issue:

1. Go to MongoDB Atlas dashboard
2. Click "Network Access"
3. Ensure `0.0.0.0/0` is allowed (allows connections from anywhere)
4. Check "Database Access" - ensure user has read/write permissions
5. Verify connection string includes database name: `/nolovershere?`

### Step 4: Test Locally

To see the exact error, test locally:

```bash
# Set environment variables
$env:DATABASE_URL="your-mongodb-url"
$env:PAYSTACK_SECRET_KEY="your-secret-key"
$env:BREVO_API_KEY="your-brevo-key"
# ... set all other variables

# Run dev server
npm run dev

# Test payment flow
# Visit http://localhost:3000
# Try to buy a ticket
```

### Step 5: Common Error Causes

**1. MongoDB Connection Error**
```
Error: PrismaClient unable to connect
```
**Fix:** Check DATABASE_URL and MongoDB Atlas network access

**2. Paystack API Error**
```
Error: Failed to verify payment
```
**Fix:** Check PAYSTACK_SECRET_KEY is correct and matches the public key

**3. Email Sending Error**
```
Error: Failed to send email
```
**Fix:** Check BREVO_API_KEY and BREVO_SENDER_EMAIL are correct

**4. Missing Schema Fields**
```
Error: Unknown field maxMenTickets
```
**Fix:** Run `npm run db:push` locally to update MongoDB schema

### Step 6: Quick Fixes

**If environment variables are missing:**
1. Add them in Vercel Project Settings → Environment Variables
2. Redeploy: Deployments → Latest → "Redeploy"

**If MongoDB schema is outdated:**
```bash
# Local terminal
npm run db:push
```

**If Brevo sender email not verified:**
1. Go to https://app.brevo.com/senders
2. Verify your sender email
3. Wait for verification email and confirm

### Step 7: Check Specific Logs

The `/api/verify-payment` route logs these steps:
1. "Verifying payment: [reference]" - Payment verification started
2. "Paystack response: [data]" - Paystack API response
3. "Ticket details: [info]" - Extracted ticket information
4. "Settings: [settings]" - Current event settings
5. "Generating QR for: [ticketId]" - QR code generation
6. "Creating ticket in database" - Database insert
7. "Updating ticket counts" - Incrementing sold count
8. "Sending emails" - Email sending
9. "Payment verification complete" - Success!

**Find where it stops to identify the issue.**

### Step 8: Test Individual Components

**Test Database Connection:**
- Go to `/admin` on your Vercel URL
- If admin panel loads, database is connected

**Test Email Sending:**
- In admin panel, go to "Email" tab
- Try sending a test email
- If it works, Brevo is configured correctly

**Test Paystack:**
- Check Paystack dashboard for payment logs
- Verify the payment reference exists
- Check if webhook is configured (not required for this app)

## Expected Behavior After Fix

When payment verification works correctly:
1. User completes payment on Paystack
2. Paystack redirects back to your site
3. Frontend calls `/api/verify-payment`
4. Backend verifies with Paystack API
5. Ticket is created in database
6. Email is sent with QR code
7. User sees success message

## Need More Help?

**Check these in order:**
1. Vercel function logs (most important!)
2. MongoDB Atlas logs
3. Paystack dashboard logs
4. Brevo email logs

**The function logs will show the exact error!**

## Quick Checklist

Before testing again:
- [ ] All 9 environment variables set in Vercel
- [ ] MongoDB allows connections from 0.0.0.0/0
- [ ] Brevo sender email is verified
- [ ] Paystack keys are LIVE keys (not test)
- [ ] Redeployed after adding environment variables
- [ ] Checked function logs for specific error

## Contact Info

If you need to share logs for debugging, look for:
- Error messages in function logs
- Stack traces
- "Error:" lines in the logs

The logs will tell us exactly what's failing!
