const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const crypto = require("crypto"); // For generating random salt and hashing

// Function to generate a random salt of length 5
function generateSalt(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    salt += characters[randomIndex];
  }
  return salt;
}

// Function to hash a password with a salt
function hashPassword(password, salt) {
  const combined = password + salt; // Concatenate password and salt
  return crypto.createHash("sha256").update(combined, "utf8").digest("hex"); // Hash the combined string
}

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Generate a random salt
    const salt = generateSalt(5);

    // Hash the password with the salt
    const hashedPassword = hashPassword(password, salt);

    // Store the hashed password and the salt
    const newUser = new User({ username, password: hashedPassword, salt });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the entered password with the stored salt
    const hashedEnteredPassword = hashPassword(password, user.salt);

    // Check if the hashed entered password matches the stored password
    if (hashedEnteredPassword === user.password) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error during login" });
  }
});

module.exports = router;
