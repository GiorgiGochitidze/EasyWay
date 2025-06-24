const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true,
  },
  companyId: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{8}$/, // Ensures exactly 8 digits
  },
  description: {
    type: String,
    required: true,
  },
  cardIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card", // Reference to the Card model
    },
  ],
  images: [
    {
      type: String, // Cloudinary image URLs
    },
  ],
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Partner", PartnerSchema);
