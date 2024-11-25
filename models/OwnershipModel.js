const mongoose = require("mongoose");

const OwnershipSchema = mongoose.Schema(
  {
    ownership_type: {
      type: String,
      required: true,
      unique: true,
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

OwnershipSchema.index({ title: "text" });

module.exports = mongoose.model("ownership_types", OwnershipSchema);
