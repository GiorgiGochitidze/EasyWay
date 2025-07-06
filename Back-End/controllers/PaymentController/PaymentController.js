const createOrder = require("../../utils/bogPayment");
const PendingRegistration = require("../../models/Payment/PendingRegistration");
const User = require("../../models/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createPaymentOrder = async (req, res) => {
  const {
    duration,
    price,
    type,
    userId,
    userName,
    email,
    password,
    selectedPacket,
  } = req.body;

  if (
    !duration ||
    !price ||
    !type ||
    !userId ||
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

    // create order first
    const order = await createOrder({
      product_id: type.replace(/\s/g, "_").toUpperCase(),
      product_name: `${type} - ${duration}`,
      total_amount: amount,
      quantity: 1,
      userId,
    });

    // extract orderId from what you set as external_order_id
    const orderId = order.external_order_id; // depends on what BOG returns back
    if (!orderId) {
      return res.status(500).json({ message: "Order ID not returned by BOG" });
    }

    // save pending registration
    await PendingRegistration.create({
      orderId,
      userName,
      email,
      password, // raw for now, will hash later
      selectedPacket,
    });

    res.status(200).json(order);
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

    // Example: get external_order_id which you set as orderId before
    const orderId = callbackData.external_order_id;
    const paymentStatus = callbackData.status; // adjust according to BOG docs

    if (paymentStatus === "Succeeded") {
      // Find pending registration by orderId
      const pending = await PendingRegistration.findOne({ orderId });
      if (!pending) {
        return res.status(404).send("Pending registration not found");
      }

      // Create user
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

      // Create JWT
      const token = jwt.sign(
        {
          id: newUser._id,
          userName: newUser.userName,
          role: newUser.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      console.log("User created after successful payment:", newUser.email);
      // (optional) send email

      // Remove pending data
      await PendingRegistration.deleteOne({ orderId });

      return res.status(200).send("User created successfully");
    } else {
      console.log("Payment not successful");
      res.status(200).send("Payment failed or not completed");
    }
  } catch (err) {
    console.error("Error in payment callback:", err);
    res.status(500).send("Internal Server Error");
  }
};
