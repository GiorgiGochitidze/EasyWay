const User = require("../../models/User/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createOrder = require("../../utils/bogPayment");

exports.SignUp = async (req, res) => {
  const { userName, email, password, userPackage } = req.body;

  if (!userName || !email || !password || !userPackage) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("მომხმარებელი ასეთი მეილით უკვე არსებობს");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    // create new user first
    const newUser = new User({
      userName,
      email,
      password: hashedPass,
      package: {
        price: userPackage.price,
        duration: userPackage.duration,
        type: userPackage.type,
      },
      cards: [],
      role: "user",
    });
    await newUser.save();

    // create BOG order for this user
    const amount = parseFloat(userPackage.price.replace(/[^\d.]/g, ""));
    const order = await createOrder({
      product_id: userPackage.type.replace(/\s/g, "_").toUpperCase(),
      product_name: `${userPackage.type} - ${userPackage.duration}`,
      total_amount: amount,
      quantity: 1,
      userId: newUser._id,
    });

    // create JWT token
    const token = jwt.sign(
      {
        id: newUser._id,
        userName: newUser.userName,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "რეგისტრაცია წარმატებით დასრულდა",
      token,
      order, // return order so frontend can redirect
    });
  } catch (err) {
    console.error("მოხდა შეცდომა რეგისტრაციის დროს", err);
    res.status(500).send("მოხდა შეცდომა რეგისტრაციის დროს");
  }
};

exports.SignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("ვერ მოიძებნა საჭირო ველები");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("მომხმარებელი ვერ მოიძებნა");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .send("არასწორი მონაცემები, გთხოვთ გადაამოწმოთ ველები");
    }

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "შესვლა წარმატებით დასრულდა",
      token,
    });
  } catch (err) {
    console.error("მოხდა რაღაც შეცდომა შესვლის დროს", err);
    res.status(500).send("მოხდა რაღაც შეცდომა შესვლის დროს");
  }
};
