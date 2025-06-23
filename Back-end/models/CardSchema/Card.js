const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  cardId: {
    type: String,
    required: true,
    unique: true, // ensures no duplicate card IDs
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
      type: String, // stored as string, but 8-digit number
      required: true,
    },
  },
});

module.exports = mongoose.model("Card", CardSchema);
