const mongoose = require("mongoose");

const funnyAnswerSchema = new mongoose.Schema({
  question: String,
  funny_answer: String,
  student_name: String,
  subject: String,
  upvotes: Number,
  uploaded_by: String
});

module.exports = mongoose.model("FunnyAnswer", funnyAnswerSchema,'answers');
