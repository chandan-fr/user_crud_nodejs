const express = require('express');
const multer = require('multer');
const paymentController = require('./paymentController'); // Update the path as needed

const router = express.Router();

// Multer configuration for a single image (thumbnail)
const thumbnailUpload = multer({ dest: 'path/to/thumbnail/upload/directory' });

// Multer configuration for an array of images (banner_images)
const bannerImagesUpload = multer({ dest: 'path/to/banner_images/upload/directory' });

router.post(
  "/addproduct",
  [
    thumbnailUpload.single("thumbnail"), // Use single for a single image
    bannerImagesUpload.array("banner_images") // Use array for multiple images
  ],
  paymentController.addProduct
);

// Rest of your routes and middleware...

module.exports = router;
