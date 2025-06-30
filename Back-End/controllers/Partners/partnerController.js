const Partner = require("../../models/Partners/Partner");
const { generateUniqueCompanyId } = require("../../utils/generateId");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.GetAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json({
      message: "პარტნიორი კომპანიები წარმატებით ჩაიტვირთა",
      partners,
    });
  } catch (err) {
    console.error("შეცდომა პარტნიორი კომპანიების ჩატვირთვისას:", err);
    res
      .status(500)
      .json({ message: "შიდა შეცდომა პარტნიორი კომპანიების მიღებისას" });
  }
};

exports.AddPartner = async (req, res) => {
  try {
    const { companyName, description, location, phone } = req.body;
    const files = req.files;

    if (!companyName || !description || !location || !phone) {
      return res.status(400).json({ message: "ყველა ველი სავალდებულოა" });
    }

    const existing = await Partner.findOne({ companyName });
    if (existing) {
      return res.status(409).json({ message: "ასეთი კომპანია უკვე არსებობს" });
    }

    const companyId = await generateUniqueCompanyId();

    const urls = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "partners" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
            stream.end(file.buffer);
          })
      )
    );

    const newPartner = new Partner({
      companyName,
      companyId,
      description,
      location,
      phone,
      images: urls,
    });

    await newPartner.save();

    res.status(201).json({
      message: "პარტნიორი წარმატებით დაემატა",
      partner: newPartner,
    });
  } catch (err) {
    console.error("Partner creation error:", err);
    res.status(500).json({ message: "შეცდომა პარტნიორის დამატებისას" });
  }
};

exports.LoadPartnerPreview = async (req, res) => {
  try {
    const partners = await Partner.find(); // fetch full data
    res.status(200).json({ partners });
  } catch (err) {
    console.error("Error loading partner preview:", err);
    res.status(500).json({ message: "შეცდომა პარტნიორების მიღებისას" });
  }
};
