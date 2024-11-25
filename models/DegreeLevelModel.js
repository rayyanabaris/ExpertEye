const mongoose = require("mongoose");

const DegreeLevelSchema = mongoose.Schema(
  {
    degree_level: {
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

DegreeLevelSchema.index({ title: "text" });

module.exports = mongoose.model("degree_levels", DegreeLevelSchema);
