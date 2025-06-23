const Card = require("../../models/CardSchema/Card");

// Generate random 8-digit numeric ID
const generate8DigitId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

// Ensure generated ID is unique in DB
const generateUniqueCardId = async () => {
  let isUnique = false;
  let newId;

  while (!isUnique) {
    newId = generate8DigitId();
    const existing = await Card.findOne({ cardId: newId });
    if (!existing) isUnique = true;
  }

  return newId;
};

exports.AddCard = async (req, res) => {
  const { cardUser, duration, startDate, endDate, partnerCompany } = req.body;

  if (
    !cardUser ||
    !duration ||
    !startDate ||
    !endDate ||
    !partnerCompany?.companyName ||
    !partnerCompany?.companyId
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const cardId = await generateUniqueCardId();

    const newCard = new Card({
      cardId,
      cardUser,
      duration,
      startDate,
      endDate,
      partnerCompany,
    });

    await newCard.save();

    res.status(201).json({
      message: "ბარათი წარმატებით დაემატა",
      card: newCard,
    });
  } catch (err) {
    console.error("ბარათის დამატების შეცდომა:", err);
    res.status(500).json({ message: "შიდა შეცდომა ბარათის დამატებისას" });
  }
};
