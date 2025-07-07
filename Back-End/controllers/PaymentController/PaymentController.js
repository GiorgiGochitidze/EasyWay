const createOrder = require("../../utils/bogPayment");
const PendingRegistration = require("../../models/Payment/PendingRegistration");
const User = require("../../models/User/User");
const Card = require("../../models/CardSchema/Card");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Your generate functions
const generate8DigitId = () =>
  Math.floor(10000000 + Math.random() * 90000000).toString();
const generateUniqueCardId = async () => {
  let attempts = 0;
  while (attempts < 20) {
    const newId = generate8DigitId();
    const exists = await Card.findOne({ cardId: newId });
    if (!exists) return newId;
    attempts++;
  }
  throw new Error("Unable to generate unique card ID");
};

exports.createPaymentOrder = async (req, res) => {
  const { duration, price, type, userName, email, password, selectedPacket } =
    req.body;

  if (
    !duration ||
    !price ||
    !type ||
    !userName ||
    !email ||
    !password ||
    !selectedPacket
  ) {
    return res.status(400).json({ message: "ყველა ველი სავალდებულოა" });
  }

  try {
    const amount = parseFloat(price.replace(/[^\d.]/g, ""));
    if (isNaN(amount)) {
      return res.status(400).json({ message: "არასწორი თანხის ფორმატი" });
    }

    // create order first and get both order response + your generated orderId
    const { orderResponse, orderId } = await createOrder({
      product_id: type.replace(/\s/g, "_").toUpperCase(),
      product_name: `${type} - ${duration}`,
      total_amount: amount,
      quantity: 1,
    });

    if (!orderId) {
      return res.status(500).json({ message: "Order ID not generated" });
    }

    // save pending registration
    await PendingRegistration.create({
      orderId,
      userName,
      email,
      password, // raw for now, will hash later
      selectedPacket,
    });

    res.status(200).json(orderResponse);
  } catch (err) {
    console.error(
      "შეცდომა გადახდის შექმნისას:",
      err.response?.data || err.message
    );
    res.status(500).json({ message: "შეცდომა გადახდის პროცესში" });
  }
};

exports.handleBogCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    console.log("Received BOG callback:", callbackData);

    const orderId = callbackData.body?.external_order_id;
    const paymentStatus = callbackData.body?.order_status?.key;

    if (paymentStatus === "completed") {
      const pending = await PendingRegistration.findOne({ orderId });
      if (!pending)
        return res.status(404).send("Pending registration not found");

      const hashedPass = await bcrypt.hash(pending.password, 10);
      const newUser = new User({
        userName: pending.userName,
        email: pending.email,
        password: hashedPass,
        package: pending.selectedPacket,
        cards: [],
        role: "user",
      });
      await newUser.save();

      // ✅ determine duration
      let monthsToAdd = 1;
      if (pending.selectedPacket.duration === "1 თვე") monthsToAdd = 1;
      else if (pending.selectedPacket.duration === "6 თვე") monthsToAdd = 6;
      else if (pending.selectedPacket.duration === "1 წელი") monthsToAdd = 12;

      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + monthsToAdd);

      const cardId = await generateUniqueCardId();

      const newCard = new Card({
        cardId,
        cardUser: newUser._id,
        duration: pending.selectedPacket.duration,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        partnerCompany: {
          companyName: "Default Company",
          companyId: "00000001",
        },
        status: "active",
      });
      await newCard.save();

      newUser.cards.push(newCard._id);
      await newUser.save();

      const token = jwt.sign(
        { id: newUser._id, userName: newUser.userName, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log("✅ User created:", newUser.email);
      await PendingRegistration.deleteOne({ orderId });

      return res.status(200).send("User and card created successfully");
    } else {
      console.log("Payment not successful:", paymentStatus);
      res.status(200).send("Payment failed or not completed");
    }
  } catch (err) {
    console.error("Error in payment callback:", err);
    res.status(500).send("Internal Server Error");
  }
};
