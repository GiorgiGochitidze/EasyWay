const express = require("express");
const router = express.Router();
const {
  createPaymentOrder,
  handleBogCallback
} = require("../../controllers/PaymentController/PaymentController");

router.post("/create-order", createPaymentOrder);
router.post("/callback", handleBogCallback);

module.exports = router;
