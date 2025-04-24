const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country: String,
  role: { type: String, enum: ["client", "freelancer"], required: true },
});

module.exports = mongoose.model("User", userSchema);
