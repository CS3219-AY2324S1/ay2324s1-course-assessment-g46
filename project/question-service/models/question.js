const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: {
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

questionSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model("Question", questionSchema);
