# Secure Authentication System

A comprehensive, production-ready authentication system built with Node.js, Express, MongoDB, and JWT tokens. This system includes user registration, login, password reset, email verification, and robust security features.

## 🚀 Features

### Authentication & Authorization
- **User Registration** with email verification
- **Secure Login** with JWT tokens
- **Password Reset** via email
- **Email Verification** system
- **Token Refresh** mechanism
- **Role-based Access Control** (RBAC)
- **Account Lockout** after failed attempts

### Security Features
- **Password Hashing** with bcrypt (configurable rounds)
- **JWT Tokens** for session management
- **Rate Limiting** to prevent brute force attacks
- **Input Validation** with comprehensive schemas
- **XSS Protection** and security headers
- **CORS Configuration** for cross-origin requests
- **Helmet** for additional security headers
- **Account Lockout** after multiple failed login attempts

### Email Services
- **Email Verification** for new accounts
- **Password Reset** emails with secure tokens
- **Welcome Emails** after successful verification
- **Customizable Email Templates** with HTML styling

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Email service credentials (Gmail, SendGrid, etc.)

### Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd secure-auth-system
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/auth_system
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=30d
   JWT_RESET_EXPIRE=10m
   JWT_COOKIE_EXPIRE=7
   
   # Email Configuration
   EMAIL_FROM=noreply@yourapp.com
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   
   # Client Configuration
   CLIENT_URL=http://localhost:3000
   
   # Security Configuration
   BCRYPT_ROUNDS=12
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=5
   ```

3. **Start the Server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "confirmPassword": "Password123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully. Please check your email for verification link.",
  "token": "jwt_token_here",
  "refreshToken": "refresh_token_here",
  "user": {
    "_id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "user",
    "isEmailVerified": false,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!"
}
```

#### Logout User
```http
POST /api/auth/logout
Authorization: Bearer <jwt_token>
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <jwt_token>
```

#### Forgot Password
```http
POST /api/auth/forgotpassword
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
PUT /api/auth/resetpassword
Content-Type: application/json

{
  "token": "reset_token_from_email",
  "password": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
```

#### Verify Email
```http
GET /api/auth/verify-email?token=verification_token
```

#### Change Password
```http
PUT /api/auth/changepassword
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "currentPassword": "CurrentPassword123!",
  "newPassword": "NewPassword123!",
  "confirmNewPassword": "NewPassword123!"
}
```

#### Refresh Token
```http
POST /api/refresh-token
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

## 🔒 Security Features

### Password Requirements
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

### Rate Limiting
- **Authentication endpoints**: 5 requests per 15 minutes
- **Password reset**: 3 requests per hour
- **Email verification**: 5 requests per hour

### Account Security
- **Account lockout** after 5 failed login attempts
- **2-hour lockout period** for security
- **Password reset** clears lockout status
- **Secure token generation** for all operations

### JWT Configuration
- **Access tokens**: 30 days expiry (configurable)
- **Refresh tokens**: 7 days expiry
- **Secure HTTP-only cookies** in production
- **Token refresh mechanism** for extended sessions

## 🛠️ Development

### Project Structure
```
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   ├── auth.js             # JWT middleware
│   └── errorHandler.js     # Error handling
├── models/
│   └── User.js             # User schema
├── routes/
│   └── auth.js             # Authentication routes
├── utils/
│   ├── email.js            # Email service
│   └── validation.js       # Input validation
├── .env                    # Environment variables
├── .env.example           # Environment template
├── package.json           # Dependencies
└── server.js              # Main server file
```

### Available Scripts
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm test         # Run tests (Jest)
```

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
JWT_SECRET=your-strong-production-secret
MONGODB_URI=your-production-mongodb-uri
EMAIL_HOST=your-production-email-host
CLIENT_URL=https://your-frontend-domain.com
```

### Security Checklist
- [ ] Change default JWT secret
- [ ] Use strong database credentials
- [ ] Configure proper CORS origins
- [ ] Set up SSL/TLS certificates
- [ ] Use environment-specific email credentials
- [ ] Enable MongoDB authentication
- [ ] Configure proper rate limiting
- [ ] Set up monitoring and logging

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication
2. Generate an app-specific password
3. Use the app password in `EMAIL_PASS`

### Other Email Services
- **SendGrid**: Use API key authentication
- **AWS SES**: Configure with AWS credentials
- **Mailgun**: Use domain and API key

## 🧪 Testing

### Manual Testing
1. **Health Check**: `GET /health`
2. **API Info**: `GET /api`
3. **Register**: Create a new user account
4. **Verify Email**: Check email and verify
5. **Login**: Test authentication
6. **Protected Routes**: Access with token

### API Testing Tools
- **Postman**: Import the provided collection
- **cURL**: Use command line examples
- **Frontend Integration**: Test with your client application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation above
- Review error logs for debugging
- Ensure environment variables are correct
- Verify MongoDB connection
- Check email service configuration

## 🔮 Future Enhancements

- [ ] Two-factor authentication (2FA)
- [ ] Social media login integration
- [ ] Advanced user management
- [ ] Audit logging
- [ ] API versioning
- [ ] Comprehensive test suite
- [ ] Docker containerization
- [ ] CI/CD pipeline integration
