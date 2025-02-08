const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  text: { type: String, required: true },
  matchPercentage: { type: Number },
  missingSkills: { type: [String] },
  isShortlisted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Resume", resumeSchema);