const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const resumeRoutes = require("./routes/resumeRoutes");
const authRoutes = require("./routes/authRoutes.js");
const recruiterRoutes = require("./routes/recruiterRoutes.js");
const zlib = require("zlib");
const { protect } = require("./middleware/authMiddleware");

const connectDB = require("./config/db.js");


connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to decompress gzip payloads
app.use((req, res, next) => {
  if (req.headers["content-encoding"] === "gzip") {
    let buffer = [];
    req.on("data", (chunk) => buffer.push(chunk));
    req.on("end", () => {
      const decompressed = zlib.gunzipSync(Buffer.concat(buffer)).toString();
      req.body = JSON.parse(decompressed);
      next();
    });
  } else {
    next();
  }
});
app.use(
  cors({
    origin: ["*","https://resumeai-nine.vercel.app","http://localhost:5173","http://51.20.132.21:3000"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
// Increase payload size limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Enable CORS for frontend (port 5174)


// Routes
app.use("/api", resumeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/recruiter", protect, recruiterRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});