const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Assignment = require("../models/Assignment");
const Class = require("../models/Class");
const Student = require("../models/Student");

// Assign student to class route
router.post("/assignStudent", authMiddleware, async (req, res) => {
  try {
    // Extract class_id and student_id from the request body
    const { class_id, student_id } = req.body;

    // Validate input data
    if (!class_id || !student_id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the class and student exist
    const classExists = await Class.findById(class_id);
    const studentExists = await Student.findById(student_id);

    if (!classExists || !studentExists) {
      return res.status(404).json({ message: "Class or student not found" });
    }

    // Check if the student is already assigned to the class
    if (studentExists.class_id) {
      return res
        .status(400)
        .json({ message: "Student is already assigned to a class" });
    }

    // Assign the student to the class and Update the student document with the class_id
    await Student.findByIdAndUpdate(student_id, { class_id });

    res.json({ message: "Student assigned to class successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;