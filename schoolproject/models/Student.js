const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  photo: String,
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;