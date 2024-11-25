const mongoose = require("mongoose");

const QuizQuestionSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    option_1: {
      type: String,
      required: true,
    },
    option_2: {
      type: String,
      required: true,
    },
    option_3: {
      type: String,
      required: true,
    },
    option_4: {
      type: String,
      required: true,
    },
    is_active: {
      type: Number,
      default: '0',
    },
    question_order: {
      type: Number,
      default: '0',
    },
    lang: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

QuizQuestionSchema.index({ title: "text" });

module.exports = mongoose.model("quiz_questions", QuizQuestionSchema);
