// models/PendingRegistration.js
const mongoose = require("mongoose");

const PendingRegistrationSchema = new mongoose.Schema({
  orderId: String,
  userName: String,
  email: String,
  password: String,
  selectedPacket: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("PendingRegistration", PendingRegistrationSchema);
