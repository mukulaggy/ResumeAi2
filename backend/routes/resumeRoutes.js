const express = require("express");
const router = express.Router();
const resumeController = require("../controller/resumeController.js")

// Define routes
router.post("/upload-resume", resumeController.uploadResume)
router.post("/analyze-resume", resumeController.analyzeResume);
router.post("/tell-about-resume", resumeController.tellAboutResume);
router.post("/improve-skills", resumeController.improveSkills);
router.post("/missing-keywords", resumeController.missingKeywords);

module.exports = router;