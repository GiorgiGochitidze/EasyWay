const express = require("express");
const router = express.Router();
const { AddCard, GetUserCards } = require("../../controllers/Card/CardController");

router.post("/addCard", AddCard);

router.post("/user/cards", GetUserCards);

module.exports = router;
