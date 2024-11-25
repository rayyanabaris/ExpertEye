const mongoose = require("mongoose");

const CarrierSchema = mongoose.Schema(
  {
    career_level: {
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

CarrierSchema.index({ title: "text" });

module.exports = mongoose.model("career_levels", CarrierSchema);
