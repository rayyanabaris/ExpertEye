const mongoose = require("mongoose");

const ResultTypeSchema = mongoose.Schema(
  {
    result_type: {
      type: String,
      required: true,
    },
    is_default: {
      type: Number,
      default: '0',
    },
    is_active: {
      type: Number,
      default: '0',
    },
    sort_order: {
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

ResultTypeSchema.index({ title: "text" });

module.exports = mongoose.model("result_types", ResultTypeSchema);
