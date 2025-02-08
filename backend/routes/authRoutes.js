const express = require("express");
const { registerRecruiter, loginRecruiter } = require("../controller/authController.js");
const router = express.Router();

router.post("/register", registerRecruiter);
router.post("/login", loginRecruiter);

module.exports = router;