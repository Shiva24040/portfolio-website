import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from '../database/db.js';
import { verifyOwnerToken } from '../middleware/auth.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueName = `${safeBase}-${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.pdf', '.html'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExts.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Supported formats: JPG, PNG, WEBP, SVG, PDF, HTML'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Protect all admin routes with verifyOwnerToken
router.use(verifyOwnerToken);

// Allowed editable portfolio sections
const ALLOWED_SECTIONS = [
  'profile',
  'about',
  'skills',
  'experience',
  'projects',
  'certifications',
  'education',
  'achievements',
  'positions',
  'contact',
];

// PUT /api/admin/section/:key
router.put('/section/:key', (req, res) => {
  try {
    const { key } = req.params;
    const sectionData = req.body;

    if (!ALLOWED_SECTIONS.includes(key)) {
      return res.status(400).json({
        success: false,
        message: `Invalid section '${key}'. Allowed: ${ALLOWED_SECTIONS.join(', ')}`,
      });
    }

    if (!sectionData || typeof sectionData !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid payload: data object is required.',
      });
    }

    const updated = db.updateSection(key, sectionData);

    return res.json({
      success: true,
      message: `Section '${key}' updated successfully.`,
      data: updated,
    });
  } catch (err) {
    console.error('Error updating section:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to update section data.',
    });
  }
});

// POST /api/admin/upload - Secure file upload
router.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded.',
      });
    }

    // Accessible public URL
    const fileUrl = `./uploads/${req.file.filename}`;

    return res.json({
      success: true,
      message: 'File uploaded successfully.',
      fileUrl,
      fileName: req.file.filename,
      size: req.file.size,
    });
  } catch (err) {
    console.error('File upload error:', err);
    return res.status(500).json({
      success: false,
      message: err.message || 'Error occurred while uploading file.',
    });
  }
});

export default router;
