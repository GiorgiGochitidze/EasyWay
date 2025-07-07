// models/CardSchema/Card.js
const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true,
  },
  cardUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  partnerCompany: {
    companyName: {
      type: String,
      required: true,
    },
    companyId: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
  },
});

module.exports = mongoose.model("Card", CardSchema);
