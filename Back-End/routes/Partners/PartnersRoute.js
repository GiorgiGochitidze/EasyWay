const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  AddPartner,
  GetAllPartners,
  LoadPartnerPreview,
} = require("../../controllers/Partners/partnerController");

// Configure multer to handle images in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/partners", GetAllPartners);

// ⬇️ This handles multipart/form-data with "images"
router.post("/addPartner", upload.array("images", 10), AddPartner);

router.post("/loadPartners", LoadPartnerPreview);
module.exports = router;
