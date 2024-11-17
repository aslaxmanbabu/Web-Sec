const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true, // Store the hashed password
  },
  salt: {
    type: String,
    required: true, // Store the salt separately
  },
});

module.exports = mongoose.model("User", userSchema);
