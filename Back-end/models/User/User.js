const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: String,
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  package: {
    price: { type: String, required: true },
    duration: { type: String, required: true },
    type: { type: String, required: true },
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
  role: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", User);
