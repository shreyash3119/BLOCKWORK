const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Client = require("../models/Client");
const Freelancer = require("../models/Freelancer");

// SIGNUP
router.post('/signup', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    country,
    skills,
    bio
  } = req.body;

  if (!firstName || !lastName || !email || !password || !role || !country) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  if (role === 'freelancer' && (!skills || !bio)) {
    return res.status(400).json({ message: 'Missing required freelancer fields.' });
  }

  try {
    const Model = role === 'client' ? Client : Freelancer;

    const existingUser = await Model.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      country,
    };

    if (role === 'freelancer') {
      newUserData.skills = skills;
      newUserData.bio = bio;
    }

    const newUser = new Model(newUserData);
    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();
    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
  } catch (err) {
    console.error("Signup Error: ", err);
    res.status(500).json({ error: err.message || 'Signup failed' });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const Model = role === 'client' ? Client : role === 'freelancer' ? Freelancer : null;
    if (!Model) {
      return res.status(400).json({ message: "Invalid role specified" });
    }

    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ message: "Login successful", user: userWithoutPassword });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
