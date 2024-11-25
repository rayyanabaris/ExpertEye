const multer = require("multer");
const path = require("path");
const fs = require("fs");

// MIME type map for file validation
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "application/pdf": "pdf",
};

// Define the path for storing uploads
const uploadDir = path.join(__dirname, "../uploads");

// Ensure that the 'uploads' directory exists, create it if not
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    // Save files in the 'uploads' directory
    callBack(null, uploadDir);
  },
  filename: (req, file, callBack) => {
    // Validate MIME type
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    if (!isValid) {
      const error = new Error("Invalid mime type");
      return callBack(error);
    }
    // Generate a filename with fieldname, timestamp, and original extension
    callBack(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// Multer upload setup with file filtering
const upload = multer({
  storage: storage,
  fileFilter: (req, file, callBack) => {
    // Check if MIME type is valid
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = null;
    if (!isValid) {
      error = new Error("Invalid mime type");
    }
    callBack(error, isValid);
  },
});

module.exports = upload;
