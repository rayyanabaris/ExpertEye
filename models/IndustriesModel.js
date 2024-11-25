const mongoose = require("mongoose");

const IndustrySchema = mongoose.Schema(
  {
    industry: {
      type: String,
      required: true,
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
    is_default: {
      type: Number,
      default: '0',
    },
  },
  {
    timestamps: true,
  }
);

IndustrySchema.index({ title: "text" });

module.exports = mongoose.model("Industries", IndustrySchema);
