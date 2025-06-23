const express = require("express");
const router = express.Router();
const { GetAllPartners } = require("../../controllers/Partners/partnerController");

router.post("/partners", GetAllPartners);

module.exports = router;
