# SecureX Backend: Email & Security Features

## Overview

The SecureX backend now includes enterprise-grade email delivery via Resend API, OTP expiration with 10-minute validity, and comprehensive rate limiting to prevent abuse.

## Features Implemented

### 1. Resend Email Integration

**Purpose**: Replace console logging with professional email delivery

**Implementation**:
- Integrated Resend email service for production email sending
- Development mode fallback to console logging when API key is not provided
- Graceful handling of email failures without breaking authentication flow

**Configuration**:
```env
RESEND_API_KEY="re_your_api_key_here"
RESEND_FROM_EMAIL="noreply@securex.app"
```

**Setup Steps**:
1. Sign up at [resend.com](https://resend.com)
2. Create an API key from the dashboard
3. Add `RESEND_API_KEY` to your `.env` file
4. Optionally configure `RESEND_FROM_EMAIL` (defaults to onboarding@resend.dev in test mode)

**Emails Sent By**:
- Registration verification
- OTP resend requests
- Password reset requests

---

### 2. OTP Expiration (10 Minutes)

**Purpose**: Enhance security by limiting OTP validity period

**Implementation**:
- All OTPs (email verification, password reset) expire after 10 minutes
- Expiration timestamps stored in database
- Verification endpoints check expiration before accepting OTP

**Database Changes**:
- Added `emailVerificationCodeExpires` field to User model
- `passwordResetExpires` already existed, now used consistently

**Updated Functions**:

`generateOtp(length = 6)` - Now returns object with expiration:
```javascript
{
  code: "123456",
  expiresAt: <Date 10 minutes from now>
}
```

**Verification Logic**:
```javascript
// Check if OTP has expired
if (user.emailVerificationCodeExpires && new Date(user.emailVerificationCodeExpires) < new Date()) {
  return res.status(400).json({ message: "Verification code has expired." });
}
```

**Error Responses**:
- Email verification: `"Verification code has expired. Please request a new one."`
- Password reset: `"Reset code has expired."`

---

### 3. Rate Limiting

**Purpose**: Prevent brute force attacks, spam, and service abuse

**Implementation**:
- Multiple limiters for different endpoints with appropriate thresholds
- Email-based rate limiting (attacker-aware)
- IP-based fallback
- Disabled in development mode for testing

**Rate Limiters**:

| Endpoint Type | Requests | Window | Purpose |
|---|---|---|---|
| Registration | 3 | 1 hour | Prevent account spam |
| Login | 5 | 15 minutes | Brute force protection |
| OTP Verification | 3 | 15 minutes | Prevent OTP guessing |
| OTP Resend | 3 | 15 minutes | Prevent email spam |
| Password Reset | 3 | 1 hour | Prevent reset spam |
| General API | 100 | 15 minutes | Overall rate limit |

**Applied To**:
- `POST /api/auth/register` - registerLimiter
- `POST /api/auth/login` - authLimiter
- `POST /api/auth/verify-email` - otpLimiter
- `POST /api/auth/resend-otp` - otpLimiter
- `POST /api/auth/forgot-password` - passwordResetLimiter
- `POST /api/auth/reset-password` - otpLimiter
- All routes - generalLimiter

**Development Mode**:
- Rate limiting disabled when `NODE_ENV=development`
- Configure in `.env`: `NODE_ENV=development`

**Rate Limit Headers**:
All responses include rate limit info:
```
RateLimit-Limit: 5
RateLimit-Remaining: 3
RateLimit-Reset: 1234567890
```

**Error Response**:
```json
{
  "message": "Too many login attempts, please try again later."
}
```

---

## Database Changes

### Prisma Migration

Run the migration to add the new field:
```bash
npx prisma migrate dev --name add_email_otp_expiration
```

### Updated User Model
```prisma
model User {
  // ... existing fields
  emailVerificationCode       String?
  emailVerificationCodeExpires DateTime?  // NEW
  passwordResetCode           String?
  passwordResetExpires        DateTime?
}
```

---

## New Dependencies

```json
{
  "resend": "^3.0.0",
  "express-rate-limit": "^7.1.5"
}
```

**Installation**:
```bash
npm install
```

---

## Updated Files

### Core Implementation Files

1. **src/utils/helpers.js**
   - `generateOtp()` - Returns object with expiration
   - `sendEmail()` - Integrates Resend API
   - `sanitizeUser()` - Includes new expiration fields

2. **src/middleware/rateLimitMiddleware.js** (NEW)
   - Defines all rate limiting strategies
   - Configurable thresholds and windows
   - Development mode awareness

3. **src/routes/auth.js**
   - Applied rate limiters to all auth endpoints
   - Updated to handle OTP expiration checks
   - Enhanced error messages

4. **src/index.js**
   - Added general rate limiter middleware
   - Imported rate limiting module

5. **prisma/schema.prisma**
   - Added `emailVerificationCodeExpires` field

6. **.env.example**
   - Added Resend configuration options

---

## API Behavior Changes

### Before
```
POST /api/auth/register
Response: {
  "message": "Registration successful. Verify your email to complete setup."
}
```

### After
```
POST /api/auth/register
Response: {
  "message": "Registration successful. Verify your email to complete setup.",
  "emailSent": true  // Indicates email delivery status
}
```

### OTP Expiration Error
```
POST /api/auth/verify-email
Request: { email: "user@example.com", otp: "123456" }
Response: {
  "message": "Verification code has expired. Please request a new one.",
  "status": 400
}
```

### Rate Limit Error
```
POST /api/auth/login (6th attempt within 15 minutes)
Response: {
  "message": "Too many login attempts, please try again later.",
  "status": 429,
  "headers": {
    "RateLimit-Limit": "5",
    "RateLimit-Remaining": "0",
    "RateLimit-Reset": "1234567890"
  }
}
```

---

## Testing Guide

### Testing OTP Expiration

1. **Register new account**:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

2. **Verify immediately** (should succeed):
```bash
curl -X POST http://localhost:4000/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "<code from logs>"
  }'
```

3. **Wait 10+ minutes and try again** (should fail with expiration message)

### Testing Rate Limiting

1. **Make 6 login attempts within 15 minutes**:
```bash
for i in {1..6}; do
  curl -X POST http://localhost:4000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "user@example.com",
      "password": "wrongpassword"
    }'
  echo "Attempt $i"
done
```

2. **6th attempt returns 429 (Too Many Requests)**

### Testing Resend Integration

1. **Without Resend API Key** (development mode):
   - Check backend console for email logs
   - Emails logged as `[EMAIL - DEVELOPMENT MODE]`

2. **With Resend API Key**:
   - Emails actually sent to recipients
   - Check Resend dashboard for delivery status

---

## Environment Configuration

### Required Variables
```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your_secret_key"
PORT=4000
```

### Optional Variables
```env
# Email Service
RESEND_API_KEY="re_xxxx"  # For production emails
RESEND_FROM_EMAIL="noreply@securex.app"

# Development
NODE_ENV="development"  # Disables rate limiting, uses console for emails
```

---

## Security Best Practices

1. **OTP Validity**: 10 minutes is industry standard (similar to Google, AWS)
2. **Rate Limiting**: Progressive delays prevent brute force
3. **Email-Based Limiting**: Harder to bypass than IP-based
4. **Error Messages**: Generic messages prevent information leakage
5. **Sanitized Responses**: OTP codes never returned to client
6. **Development Safety**: Rate limiting disabled in dev mode for testing

---

## Monitoring & Debugging

### Backend Logs

**Email Logs** (Development):
```
[EMAIL - DEVELOPMENT MODE]
To: user@example.com
Subject: SecureX Email Verification
Body: Your SecureX verification code is 123456. It expires in 10 minutes.
```

**Email Logs** (Production):
```
Email sent successfully to user@example.com
```

**Rate Limit Logs**:
```
Too many login attempts from email: user@example.com
```

### Database Queries

Check OTP expiration in database:
```sql
SELECT email, emailVerificationCodeExpires, NOW() 
FROM "User" 
WHERE id = '<user_id>';
```

---

## Future Enhancements

1. **Email Templates**: HTML email templates for better branding
2. **SMS OTP**: Add SMS as alternative to email
3. **Configurable Rate Limits**: Admin dashboard to adjust limits
4. **OTP Analytics**: Track OTP delivery success rates
5. **IP Whitelist**: Allow certain IPs to bypass rate limiting
6. **Exponential Backoff**: Increase wait times after multiple failures
7. **Email Verification Webhooks**: Real-time delivery tracking

---

## Troubleshooting

### "Missing API key" Error
**Solution**: Ensure `RESEND_API_KEY` is not set, or set it correctly in `.env`

### "Too many requests" on Startup
**Solution**: Set `NODE_ENV=development` to disable rate limiting

### OTP Expires Too Quickly
**Solution**: Check system time sync, OTP window is 10 minutes (non-configurable for security)

### Emails Not Sending
**Check**:
1. Resend API key is valid
2. Email domain is verified in Resend dashboard
3. Check Resend dashboard for bounce/error logs

### Rate Limiting Not Working
**Check**:
1. `NODE_ENV` is not set to `development`
2. Rate limit middleware is applied in index.js
3. Check `RateLimit-*` headers in response

---

## References

- [Resend Documentation](https://resend.com/docs)
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
- [OWASP Rate Limiting](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OTP Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/Password_Management_Cheat_Sheet.html)
