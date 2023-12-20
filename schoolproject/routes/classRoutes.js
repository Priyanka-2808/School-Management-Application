const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Class = require("../models/Class"); // Make sure Class model is properly defined in ../models/Class

// Create class route
router.post("/create", authMiddleware, async (req, res) => {
  console.log("Request User:", req.user);
  try {
    const { name } = req.body;

    // Check if the class already exists
    const existingClass = await Class.findOne({ name });
    if (existingClass) {
      return res.status(400).json({ message: "Class already exists" });
    }

    // Create a new class
    const newClass = new Class({
      name,
    });

    // Save the class to the database
    await newClass.save();

    res.json({ message: "Class created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get class route
router.get("/getClass", authMiddleware, async (req, res) => {
  try {
    // Retrieve all classes from the database
    const classes = await Class.find();

    res.json({ classes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;