const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, photo, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Automatically generate invite codes based on the user's role
    const inviteCode = generateInviteCode(role);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the invite code and role
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      photo,
      schoolInviteCode: inviteCode,
      role,
    });

    // Save the user to the database
    await newUser.save();

    res.json({ message: "Signup successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Function to automatically generate invite codes based on the user's role
const generateInviteCode = (role) => {
  // Replace with your logic to generate specific codes for parents and teachers
  if (role === "parent") {
    return generateUniqueParentCode();
  } else if (role === "teacher") {
    return generateUniqueTeacherCode();
  }

  // Default code if the role is not recognized
  return "DEFAULTCODE";
};

// Replace these placeholder functions with your actual logic to generate unique codes
const generateUniqueParentCode = () => {
  // Implement your logic to generate a unique code for parents
  return "PARENTCODE";
};

const generateUniqueTeacherCode = () => {
  // Implement your logic to generate a unique code for teachers
  return "TEACHERCODE";
};

module.exports = router;