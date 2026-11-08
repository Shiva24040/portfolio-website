import express from 'express';
import { db } from '../database/db.js';

const router = express.Router();

// GET /api/portfolio - Public read-only endpoint
router.get('/', (req, res) => {
  try {
    const data = db.getPublicPortfolio();
    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('Error retrieving public portfolio data:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve portfolio data.',
    });
  }
});

export default router;
