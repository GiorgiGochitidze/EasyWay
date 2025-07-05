const createOrder = require("../../utils/bogPayment");

exports.createPaymentOrder = async (req, res) => {
  const { duration, price, type, userId } = req.body;

  if (!duration || !price || !type || !userId) {
    return res.status(400).json({ message: "ყველა ველი სავალდებულოა" });
  }

  try {
    const amount = parseFloat(price.replace(/[^\d.]/g, ""));
    if (isNaN(amount)) {
      return res.status(400).json({ message: "არასწორი თანხის ფორმატი" });
    }

    const order = await createOrder({
      product_id: type.replace(/\s/g, "_").toUpperCase(),
      product_name: `${type} - ${duration}`,
      total_amount: amount,
      quantity: 1,
      userId,
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
