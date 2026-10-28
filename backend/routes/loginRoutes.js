const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key_12345";
if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET is not set. Using the built-in development secret; set JWT_SECRET in production.");
}

// 1. SIGNUP -> POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Your password must be at least 8 characters." });
    }
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // ✅ Fixed: This is inside an 'async' function now
    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Server error during signup." });
  }
});

// 2. LOGIN -> POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login." });
  }
});

// 3. CHANGE PASSWORD -> POST /api/auth/reset-password
// Requires the current password, so nobody can take over an account
// just by knowing its email address.
router.post("/reset-password", async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "Email, current password and new password are required." });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Your new password must be at least 8 characters." });
    }

    const user = await User.findOne({ where: { email } });
    const isMatch = user && (await bcrypt.compare(currentPassword, user.password));
    if (!isMatch) {
      return res.status(400).json({ message: "Email or current password is incorrect." });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: "Password updated. You can now sign in with your new password." });
  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ message: "Server error changing password." });
  }
});

module.exports = router;