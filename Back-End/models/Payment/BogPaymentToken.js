// models/BogPaymentToken.js
const mongoose = require("mongoose");

const BogPaymentTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  access_token: { type: String, required: true },
  expires_in: { type: Number, required: true },
  scope: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BogPaymentToken", BogPaymentTokenSchema);
