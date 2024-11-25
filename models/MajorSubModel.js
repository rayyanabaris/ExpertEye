const mongoose = require("mongoose");

const MajorSubSchema = mongoose.Schema(
  {
    major_subject: {
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

MajorSubSchema.index({ title: "text" });

module.exports = mongoose.model("major_subjects", MajorSubSchema);
