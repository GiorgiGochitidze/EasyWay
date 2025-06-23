const Partner = require("../../models/Partners/Partner");

exports.GetAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();

    res.status(200).json({
      message: "პარტნიორი კომპანიები წარმატებით ჩაიტვირთა",
      partners,
    });
  } catch (err) {
    console.error("შეცდომა პარტნიორი კომპანიების ჩატვირთვისას:", err);
    res.status(500).json({ message: "შიდა შეცდომა პარტნიორი კომპანიების მიღებისას" });
  }
};
