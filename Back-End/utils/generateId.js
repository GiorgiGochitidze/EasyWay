const Partner = require("../models/Partners/Partner");

const generate8DigitId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const generateUniqueCompanyId = async () => {
  let attempts = 0;
  const maxAttempts = 20;

  while (attempts < maxAttempts) {
    const newId = generate8DigitId();
    const exists = await Partner.findOne({ companyId: newId });

    if (!exists) return newId;
    attempts++;
  }

  throw new Error("Failed to generate a unique company ID after multiple attempts.");
};

module.exports = { generateUniqueCompanyId };
