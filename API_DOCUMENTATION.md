# Cup Entertainment API Documentation

## Two-Step Signup Process with OTP Verification

This API implements a secure two-step signup process where users must verify their email address with an OTP (One-Time Password) before being allowed to create an account.

### Authentication Flow

The signup process consists of two main steps:

1. **Step 1: Request OTP** - User provides email and receives OTP via email
2. **Step 2: Verify OTP & Complete Signup** - User provides OTP along with account details to create account

---

## API Endpoints

### 1. Send OTP for Signup

**Endpoint:** `POST /auth/send-otp`

**Description:** Sends a 6-digit OTP to the user's email address. This is the first step in the signup process.

**Request Body:**

```json
{
  "email": "user@example.com",
  "type": "signup"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "OTP sent to user@example.com. Please check your email and enter the 6-digit code.",
  "expiresIn": "10 minutes"
}
```

**Response (Error - 409):**

```json
{
  "success": false,
  "status": "fail",
  "message": "User with this email already exists"
}
```

**Validation Rules:**

- `email`: Must be a valid email address
- `type`: Must be either "signup" or "password_reset"

---

### 2. Verify OTP

**Endpoint:** `POST /auth/verify-otp`

**Description:** Verifies the OTP sent to the user's email. This marks the OTP as verified and allows the user to proceed with signup.

**Request Body:**

```json
{
  "email": "user@example.com",
  "otp": "123456",
  "type": "signup"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "OTP verified successfully",
  "otpId": 1
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "status": "fail",
  "message": "Invalid OTP"
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "status": "fail",
  "message": "OTP has expired. Please request a new one."
}
```

**Validation Rules:**

- `email`: Must be a valid email address
- `otp`: Must be exactly 6 digits
- `type`: Must be either "signup" or "password_reset"

---

### 3. Complete Signup (Requires Verified OTP)

**Endpoint:** `POST /auth/signup`

**Description:** Creates a new user account. Requires a previously verified OTP to ensure email ownership.

**Request Body:**

```json
{
  "fullName": "John Doe",
  "email": "user@example.com",
  "password": "securepassword123",
  "otp": "123456"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "user@example.com",
    "createdAt": "2025-01-26T10:30:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 400):**

```json
{
  "success": false,
  "status": "fail",
  "message": "Invalid or expired OTP. Please verify your email first."
}
```

**Response (Error - 409):**

```json
{
  "success": false,
  "status": "fail",
  "message": "User with this email already exists"
}
```

**Validation Rules:**

- `fullName`: Required, must be a string
- `email`: Must be a valid email address
- `password`: Must be at least 6 characters long
- `otp`: Must be exactly 6 digits

---

### 4. Resend OTP

**Endpoint:** `POST /auth/resend-otp`

**Description:** Resends OTP to the user's email. Includes rate limiting (1 minute between requests).

**Request Body:**

```json
{
  "email": "user@example.com",
  "type": "signup"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "OTP sent to user@example.com. Please check your email and enter the 6-digit code.",
  "expiresIn": "10 minutes"
}
```

**Response (Error - 429):**

```json
{
  "success": false,
  "status": "fail",
  "message": "Please wait at least 1 minute before requesting a new OTP"
}
```

**Validation Rules:**

- `email`: Must be a valid email address
- `type`: Must be either "signup" or "password_reset"

---

### 5. User Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticates existing users with email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "fullName": "John Doe",
    "email": "user@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error - 401):**

```json
{
  "success": false,
  "status": "fail",
  "message": "Invalid credentials"
}
```

---

## Complete Signup Flow Example

### Step 1: Request OTP

```bash
curl -X POST http://localhost:3000/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "type": "signup"
  }'
```

### Step 2: Verify OTP

```bash
curl -X POST http://localhost:3000/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "otp": "123456",
    "type": "signup"
  }'
```

### Step 3: Complete Signup

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword123",
    "otp": "123456"
  }'
```

---

## Security Features

1. **OTP Expiration**: OTPs expire after 10 minutes
2. **Rate Limiting**: Users can only request a new OTP every 1 minute
3. **One-Time Use**: OTPs are deleted after successful signup
4. **Email Verification**: Users must have access to their email to complete signup
5. **Password Hashing**: Passwords are hashed using bcrypt with 12 salt rounds
6. **JWT Tokens**: Secure authentication tokens with 1-day expiration

---

## Environment Variables Required

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/cup_entertainment"

# JWT Secret
JWT_SECRET="your-super-secret-jwt-key-here"

# Email Configuration (for OTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# Server
PORT=3000
NODE_ENV=development
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "status": "fail" | "error",
  "message": "Error description"
}
```

- **Status "fail"**: Client errors (4xx) - validation errors, business logic errors
- **Status "error"**: Server errors (5xx) - unexpected server issues

---

## Database Models

### OTP Model

```prisma
model OTP {
  id        Int      @id @default(autoincrement())
  email     String
  otp       String
  type      String   // 'signup', 'password_reset'
  expiresAt DateTime
  verified  Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([email, type])
}
```

### User Model

```prisma
model User {
  id        Int      @id @default(autoincrement())
  fullName  String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Frontend Integration Guide

### JavaScript/React Example

```javascript
// Step 1: Send OTP
const sendOTP = async (email) => {
  try {
    const response = await fetch('/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        type: 'signup',
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert('OTP sent to your email!');
      // Show OTP input form
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Step 2: Verify OTP
const verifyOTP = async (email, otp) => {
  try {
    const response = await fetch('/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
        type: 'signup',
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert('OTP verified! You can now complete signup.');
      // Show complete signup form
      return true;
    } else {
      alert(data.message);
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

// Step 3: Complete Signup
const completeSignup = async (fullName, email, password, otp) => {
  try {
    const response = await fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: fullName,
        email: email,
        password: password,
        otp: otp,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Store JWT token
      localStorage.setItem('token', data.token);
      alert('Account created successfully!');
      // Redirect to dashboard
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Testing

You can test the API using tools like Postman, Insomnia, or cURL. Make sure to:

1. Set up your email configuration in `.env`
2. Have a PostgreSQL database running
3. Run `npm run start:dev` to start the development server

The API will be available at `http://localhost:3000`
