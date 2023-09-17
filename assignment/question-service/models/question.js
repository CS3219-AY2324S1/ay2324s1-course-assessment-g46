const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  qid: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  complexity: {
    type: String,
    required: true,
    enum: ["Easy", "Medium", "Hard"],
  },
});

module.exports = mongoose.model("Question", questionSchema);
