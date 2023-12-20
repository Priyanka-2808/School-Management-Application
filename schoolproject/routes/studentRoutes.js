const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Student = require("../models/Student");

// Get classmates of specific student route
router.get("/getClassmates/:studentId", authMiddleware, async (req, res) => {
  try {
    const studentId = req.params.studentId;

    // Implement get classmates logic based on studentId
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const classmates = await Student.find({
      _id: { $ne: studentId }, // Exclude the requested student
      class_id: student.class_id, // Assuming class_id is a field in the Student model
    });

    res.json({ classmates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;