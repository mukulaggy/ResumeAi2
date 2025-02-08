const Recruiter = require("../Model/recruiter.js");
const jwt = require("jsonwebtoken");

// Register a new recruiter
const registerRecruiter = async (req, res) => {
  const { companyName, recruiterName, username, email, password } = req.body;
  try {
    const recruiter = new Recruiter({ companyName, recruiterName, username, email, password });
    await recruiter.save();
    res.status(201).json({ message: "Recruiter registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login recruiter
const loginRecruiter = async (req, res) => {
  const { email, password } = req.body;
  try {
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) throw new Error("Recruiter not found");

    const isMatch = await recruiter.comparePassword(password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: recruiter._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerRecruiter, loginRecruiter };