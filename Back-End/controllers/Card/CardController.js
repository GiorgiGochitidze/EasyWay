const Card = require("../../models/CardSchema/Card");
const mongoose = require("mongoose");

// Generate random 8-digit numeric ID
const generate8DigitId = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const generateUniqueCardId = async () => {
  let attempts = 0;
  const maxAttempts = 20;

  while (attempts < maxAttempts) {
    const newId = generate8DigitId();
    const exists = await Card.findOne({ cardId: newId });

    if (!exists) return newId;

    attempts++;
  }

  throw new Error("Unable to generate unique card ID after multiple attempts");
};

// ✅ Add Card Controller
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
exports.GetUserCards = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "მომხმარებლის ID არ მოიძებნა" });
  }

  try {
    const userCards = await Card.find({
      cardUser: new mongoose.Types.ObjectId(userId),
    });

    res.status(200).json(userCards);
  } catch (err) {
    console.error("ბარათების წამოღების შეცდომა:", err);
    res.status(500).json({ message: "შიდა შეცდომა ბარათების წამოღებისას" });
  }
};
