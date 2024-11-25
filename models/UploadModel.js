const mongoose = require("mongoose");

const UploadSchema = mongoose.Schema(
  {
    
    file: {
      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  }
);

UploadSchema.index({ title: "text" });

module.exports = mongoose.model("uploads", UploadSchema);
