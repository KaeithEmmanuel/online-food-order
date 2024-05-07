const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

const secret = process.env.JWT_SECRET;


// Sign-up
router.post("/createuser", async (req, res) => {
  try {
    const { name, location, email, password } = req.body;

    if (!name || !location || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      location,
      email,
      password: hashedPassword
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

// Log-in
router.post("/loginuser", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please provide email and password" });
    }

    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, userData.password);

    if (!passwordCompare) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const authToken = jwt.sign({ user: { id: userData.id } }, secret);

    res.json({ success: true, authToken });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

module.exports = router;
