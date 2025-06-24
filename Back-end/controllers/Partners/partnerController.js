const Partner = require("../../models/Partners/Partner");
const { generateUniqueCompanyId } = require("../../utils/generateId");
const cloudinary = require("cloudinary").v2;

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
    const { companyName, description } = req.body;
    const files = req.files;

    if (!companyName || !description) {
      return res.status(400).json({ message: "სახელი და აღწერა სავალდებულოა" });
    }

    const existing = await Partner.findOne({ companyName });
    if (existing) {
      return res.status(409).json({ message: "ასეთი კომპანია უკვე არსებობს" });
    }

    const companyId = await generateUniqueCompanyId();

    // ✅ Upload all images to Cloudinary
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

