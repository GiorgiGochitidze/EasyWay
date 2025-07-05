import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./CSS/PartnerDetail.css";

interface Partner {
  _id: string;
  companyName: string;
  description: string;
  images: string[];
  location: string;
  phone: string;
}

const PartnerDetail = () => {
  const { id } = useParams();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
//   const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        const res = await axios.post("https://easyway-fmdo.onrender.com/getPartnerById", {
          id,
        });
        setPartner(res.data.partner);
      } catch (err) {
        console.error("Failed to load partner detail", err);
      }
    };

    fetchPartner();
  }, [id]);

  if (!partner) return <p>Loading...</p>;

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="partner-detail">
      <div className="partner-detail-content">
        {/* LEFT SIDE: image and thumbnails */}
        <div className="image-section">
          <img
            src={partner.images[selectedIndex]}
            alt="Main"
            className="main-image"
            onClick={() => handleImageClick(selectedIndex)}
          />
          <div className="thumbnail-row">
            {partner.images.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                className={`thumbnail ${
                  selectedIndex === index ? "active" : ""
                }`}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: company info */}
        <div className="info-section">
          <h1>{partner.companyName}</h1>
          <p>
            <strong>მდებარეობა:</strong> {partner.location}
          </p>
          <p>
            <strong>ტელეფონი:</strong> {partner.phone}
          </p>
          <p>
            <strong>აღწერა:</strong> {partner.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PartnerDetail;
