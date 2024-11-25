const mongoose = require("mongoose");

const QuizResultSchema = mongoose.Schema(
  {
    result_title: {
      type: String,
      required: true,
    },
    result: {
      type: String,
      required: true,
    },
    result_order: {
      type: Number,
    },
    is_active: {
      type: Number,
      default: '0',
    },
  },
  {
    timestamps: true,
  }
);

QuizResultSchema.index({ title: "text" });

module.exports = mongoose.model("quiz_results", QuizResultSchema);
