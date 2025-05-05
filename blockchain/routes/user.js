const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Freelancer = require("../models/Freelancer");
const Client = require("../models/Client");

router.get("/:id", async (req, res) => {
  try {
    // Fetch the user by ID
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure valid role
    if (user.role !== "freelancer" && user.role !== "client") {
      return res.status(400).json({ message: "Invalid user role" });
    }

    // Fetch profile data based on the user's role
    let profile = {};
    if (user.role === "freelancer") {
      profile = await Freelancer.findOne({ email: user.email }).lean();
      if (!profile) return res.status(404).json({ message: "Freelancer profile not found" });
    } else {
      profile = await Client.findOne({ email: user.email }).lean();
      if (!profile) return res.status(404).json({ message: "Client profile not found" });
    }

    // Send back the user data along with the profile
    res.json({ ...user, profile });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
