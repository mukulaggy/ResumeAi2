const express = require("express");
const { getDashboard,analyzeResumes,getShortlistedResumes,uploadResumes,parseAnalysisResponse} = require("../controller/recruiterController.js");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const multer = require("multer");

// Configure Multer for multiple file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Protected route (requires JWT token)
const upload = multer({ storage });
router.get("/dashboard", protect, getDashboard);
router.post("/upload-resumes", upload.array("resumes", 10), uploadResumes);
router.post("/analyze-resumes", analyzeResumes);
router.get("/shortlisted-resumes", getShortlistedResumes);

module.exports = router;