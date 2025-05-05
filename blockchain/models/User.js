const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ["freelancer", "client"],
    required: true,
  },
  // Add more fields if needed
}, { timestamps: true });

// Registering the User model
const User = mongoose.model("User", UserSchema);
module.exports = User;
