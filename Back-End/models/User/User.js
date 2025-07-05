const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    package: {
      price: { type: String, required: true },
      duration: { type: String, required: true },
      type: { type: String, required: true },
    },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    role: { type: String, required: true },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
