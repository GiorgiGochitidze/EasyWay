const Partner = require("../../models/Partners/Partner");
const { generateUniqueCompanyId } = require("../../utils/generateId");
const cloudinary = require("cloudinary").v2;

exports.GetPartnerById = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "გთხოვთ მიუთითოთ პარტნიორის ID" });
    }

    const partner = await Partner.findById(id);

    if (!partner) {
      return res.status(404).json({ message: "პარტნიორი ვერ მოიძებნა" });
    }

    res.status(200).json({ partner });
  } catch (err) {
    console.error("Partner fetch error:", err);
    res.status(500).json({ message: "შიდა შეცდომა პარტნიორის მოპოვებისას" });
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
