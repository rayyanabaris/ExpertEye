const mongoose = require("mongoose");

const QuizAnswerSchema = mongoose.Schema(
  {
    question_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz_Questions",
    },
    answer: {
      type: String,
      required: true,
    },
    is_correct: {
      type: Number,
      default: '1',
    },
    is_active: {
      type: Number,
      default: '1',
    },
    result_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz_Results",
    },
  },
  {
    timestamps: true,
  }
);

QuizAnswerSchema.index({ title: "text" });

module.exports = mongoose.model("quiz_answers", QuizAnswerSchema);
