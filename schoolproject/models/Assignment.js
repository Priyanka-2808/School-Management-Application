const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  class_id: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;