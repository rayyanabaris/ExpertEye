const mongoose = require("mongoose");

const LanguageSchema = mongoose.Schema(
  {
    lang: {
      type: String,
      required: true,
    },
    native: {
      type: String,
      required: true,
    },
    iso_code: {
      type: String,
    },
    is_rtl: {
      type: Number,
      default: '0',
    },
    is_default: {
      type: Number,
      default: '0',
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

LanguageSchema.index({ title: "text" });

module.exports = mongoose.model("Languages", LanguageSchema);
