# SecureX Backend

A Node.js backend for SecureX - Secure Transaction & Business Intelligence Platform for Africa SMEs.

## Features

- User authentication and authorization with JWT
- Transaction management with escrow simulation
- Trust scoring system
- OTP-based delivery confirmation
- Dashboard analytics
- AI chatbot integration
- Payment gateway simulation

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Password Hashing**: bcrypt
- **Validation**: Built-in middleware

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Database setup**:
   - Ensure PostgreSQL is running
   - Update `.env` with your database URL
   - Run migrations:
     ```bash
     npx prisma migrate dev --name init
     ```

3. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

4. **Start the server**:
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/securex"
JWT_SECRET="your_jwt_secret_key"
PORT=4000
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/resend-otp` - Resend OTP
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset
- `POST /api/auth/update-kyc` - Update KYC information

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Transactions
- `GET /api/transactions` - List user transactions
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/:id` - Get transaction details
- `PATCH /api/transactions/:id/deliver` - Mark as delivered
- `PUT /api/transactions/:id/confirmDeliveryIsCompleted` - Confirm delivery with OTP

### Dashboard
- `GET /api/dashboard/:id` - Get dashboard statistics

### Payment
- `POST /api/payment/get-link` - Generate payment link

### Chatbot
- `POST /api/chatbot` - AI chatbot interaction

## Database Schema

### User
- id: String (CUID)
- firstName: String
- lastName: String
- email: String (unique)
- password: String (hashed)
- phone: String?
- role: String (default: "buyer")
- emailVerified: Boolean (default: false)
- emailVerificationCode: String?
- passwordResetCode: String?
- passwordResetExpires: DateTime?
- trustScore: Int (default: 50)
- idType: String?
- idNumber: String?
- bankName: String?
- accountNumber: String?
- accountName: String?
- governmentId: String?
- createdAt: DateTime
- updatedAt: DateTime

### Transaction
- id: String (CUID)
- item: String
- description: String
- amount: Float
- currency: String
- transactionType: String
- sellerId: String?
- buyerId: String?
- otherPartyEmail: String?
- otherPartyPhone: String?
- setDeliveryDays: Int (default: 2)
- status: String (default: "pending")
- deliveryOtp: String?
- createdAt: DateTime
- updatedAt: DateTime

## Development

- Use `npm run dev` for development with auto-restart
- All routes are protected with JWT authentication except registration/login
- Passwords are hashed with bcrypt
- OTP codes are 6 digits for email, 5 digits for delivery
- Trust scores update automatically based on transaction completion

## Security

- JWT tokens expire in 7 days
- Password reset codes expire in 15 minutes
- All sensitive data is encrypted
- Role-based access control implemented
- Input validation on all endpoints