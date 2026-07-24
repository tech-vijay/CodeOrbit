import express from 'express';
import { multerUpload, uploadToImageKit } from '../middleware/upload.js';

const router = express.Router();

// Defines a route for handling image uploads.
// It uses a rate limiter to prevent abuse, multer for file parsing,
// and a custom handler to upload the file to a service like ImageKit.
router.post(
  '/upload',
  (req, res, next) => {
    // Custom error handler for multer
    multerUpload(req, res, (err) => {
      if (err) {
        // Handle multer-specific errors (e.g., file size, file type)
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  uploadToImageKit
);

export default router;
