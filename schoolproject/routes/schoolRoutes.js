const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const School = require("../models/School");

// Create school route
router.post("/create", authMiddleware, async (req, res) => {
  console.log("Request User:", req.user);
  try {
    const { name, photo } = req.body;
    const userId = req.user.userId; 

    // Check if the school already exists
    const existingSchool = await School.findOne({ name });
    if (existingSchool) {
      return res.status(400).json({ message: "School already exists" });
    }

    // Create a new school associated with the logged-in user
    const newSchool = new School({
      name,
      photo,
      createdBy: userId, 
    });

    // Save the school to the database
    await newSchool.save();

    res.json({ message: "School created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get my schools route
router.get("/mySchools", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you attach userId to req.user during authentication

    // Retrieve schools associated with the logged-in user
    const schools = await School.find({ createdBy: userId });

    res.json({ schools });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;