const mongoose = require("mongoose");

const CitiesSchema = mongoose.Schema(
  {
    city: {
      type: String,
      require: true,
    },
    state_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "States",
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

CitiesSchema.index({ title: "text" });

module.exports = mongoose.model("Cities", CitiesSchema);
