const express = require('express');
const rateLimit = require('express-rate-limit');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendEmailVerification,
  changePassword,
  updateDetails
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');
const { validate, schemas } = require('../utils/validation');

const router = express.Router();

// Rate limiting configurations
const authLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 password reset requests per hour
  message: {
    success: false,
    message: 'Too many password reset attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const emailVerificationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 email verification requests per hour
  message: {
    success: false,
    message: 'Too many email verification attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public routes
router.post('/register', authLimiter, validate(schemas.register), register);
router.post('/login', authLimiter, validate(schemas.login), login);
router.post('/forgotpassword', passwordResetLimiter, validate(schemas.forgotPassword), forgotPassword);
router.put('/resetpassword', authLimiter, validate(schemas.resetPassword), resetPassword);
router.get('/verify-email', emailVerificationLimiter, verifyEmail);

// Protected routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/resend-verification', protect, emailVerificationLimiter, resendEmailVerification);
router.put('/changepassword', protect, validate(schemas.changePassword), changePassword);
router.put('/updatedetails', protect, updateDetails);

module.exports = router;