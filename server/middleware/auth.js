import jwt from 'jsonwebtoken';
import { db } from '../database/db.js';

export const verifyOwnerToken = (req, res, next) => {
  const token = req.cookies?.sn_auth_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Owner session required.',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_secret_sn_portfolio';
    const decoded = jwt.verify(token, secret);
    const auth = db.getAuth();

    if (!decoded || decoded.email !== auth.email) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: Invalid authorization credentials.',
      });
    }

    req.owner = decoded;
    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid signature. Please login again.',
    });
  }
};
