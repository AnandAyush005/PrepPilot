const multer = require("multer");

const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  console.log("FILE:", file.originalname);
  console.log("MIMETYPE:", file.mimetype);

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("REJECTED:", file.mimetype);
    cb(new Error(`Unsupported type: ${file.mimetype}`), false);
  }
};

// Initialize upload

const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

module.exports = upload;
