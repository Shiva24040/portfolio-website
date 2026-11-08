import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { db } from '../database/db.js';
import { verifyOwnerToken } from '../middleware/auth.js';

const router = express.Router();

// Strict rate limiter: Max 5 login attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// POST /api/auth/login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const auth = db.getAuth();

    // Verify email matches authorized owner
    if (email.trim().toLowerCase() !== auth.email.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    // Verify password hash
    const isMatch = await bcrypt.compare(password, auth.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.',
      });
    }

    // Sign JWT token
    const secret = process.env.JWT_SECRET || 'fallback_secret_sn_portfolio';
    const token = jwt.sign(
      { email: auth.email, role: 'owner' },
      secret,
      { expiresIn: '7d' }
    );

    // Set HTTP-only, secure, SameSite cookie
    res.cookie('sn_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
      message: 'Owner authenticated successfully.',
      owner: { email: auth.email },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
    });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('sn_auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  return res.json({
    success: true,
    message: 'Logged out successfully.',
  });
});

// GET /api/auth/me (Verify session)
router.get('/me', verifyOwnerToken, (req, res) => {
  return res.json({
    success: true,
    authenticated: true,
    owner: {
      email: req.owner.email,
    },
  });
});

// POST /api/auth/change-password
router.post('/change-password', verifyOwnerToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.',
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.',
      });
    }

    const auth = db.getAuth();
    const isMatch = await bcrypt.compare(currentPassword, auth.passwordHash);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password.',
      });
    }

    const salt = await bcrypt.genSalt(12);
    const newHash = await bcrypt.hash(newPassword, salt);

    db.updateAuth(auth.email, newHash);

    return res.json({
      success: true,
      message: 'Password updated successfully.',
    });
  } catch (err) {
    console.error('Change password error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update password.',
    });
  }
});

export default router;
