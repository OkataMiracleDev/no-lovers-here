# Paystack Integration Setup

## Getting Your Paystack API Keys

1. **Sign up for Paystack**
   - Go to https://paystack.com
   - Create an account or log in

2. **Get Your Public Key**
   - Navigate to Settings > API Keys & Webhooks
   - Copy your **Public Key** (starts with `pk_test_` for test mode or `pk_live_` for live mode)

3. **Update the Code**
   - Open `app/page.tsx`
   - Find line 13: `const paystackKey = 'pk_test_xxxxxxxxxxxx';`
   - Replace `'pk_test_xxxxxxxxxxxx'` with your actual Paystack public key

## Testing Payments

For test mode, use these test cards:
- **Card Number**: 4084084084084081
- **CVV**: 408
- **Expiry**: Any future date
- **PIN**: 0000
- **OTP**: 123456

## Going Live

1. Complete Paystack's verification process
2. Switch from test key (`pk_test_...`) to live key (`pk_live_...`)
3. Test thoroughly before launch

## Important Notes

- The current implementation uses a simple email prompt
- For production, you should:
  - Collect email, name, and phone number in a proper form
  - Store ticket purchases in a database
  - Send confirmation emails with ticket details
  - Implement a backend to verify payments
  - Add webhook handling for payment verification

## Webhook Setup (Recommended)

1. In Paystack dashboard, go to Settings > API Keys & Webhooks
2. Add your webhook URL (e.g., `https://yourdomain.com/api/webhook`)
3. Create an API route in Next.js to handle webhook events
4. Verify payment status and send ticket confirmation emails
