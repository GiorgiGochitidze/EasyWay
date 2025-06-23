const express = require("express");
const router = express.Router();
const { addCard } = require("../../controllers/Card/CardController");

router.post("/addCard", addCard);

module.exports = router;