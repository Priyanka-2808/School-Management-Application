const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: String,
  photo: String,
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;