import ImageKit from 'imagekit';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

let imagekit;
let imagekitEnabled = false;

if (
  process.env.IMAGEKIT_PUBLIC_KEY &&
  process.env.IMAGEKIT_PRIVATE_KEY &&
  process.env.IMAGEKIT_URL_ENDPOINT
) {
  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
  imagekitEnabled = true;
  console.log('ImageKit initialized for image uploads.');
} else {
  console.warn(
    'ImageKit credentials not found in .env file. Image upload functionality will be disabled.'
  );
}

/**
 * Middleware to upload a file to ImageKit if it exists on the request.
 * This is designed to be a standalone endpoint that returns the URL.
 */
export const uploadToImageKit = async (req, res) => {
  if (!imagekitEnabled) {
    return res.status(503).json({ error: 'Image upload service is not configured.' });
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided.' });
  }

  try {
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: `chat-${Date.now()}-${req.file.originalname}`,
      folder: '/digital-prisma-chat',
    });
    // Send the URL back to the client
    res.status(200).json({ imageUrl: result.url });
  } catch (error) {
    console.error('ImageKit upload error:', error);
    res.status(500).json({ error: 'Failed to upload image.' });
  }
};

/**
 * Multer middleware for handling single image file uploads in memory.
 */
export const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.'), false);
    }
  },
}).single('image');
