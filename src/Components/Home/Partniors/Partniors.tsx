import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Partniors.css";
import { useNavigate } from "react-router-dom";

interface Partner {
  id: string;
  imageUrl: string;
  companyName: string;
  description: string;
}

type RawPartner = {
  _id: string;
  images: string[];
  companyName: string;
  description?: string;
};

const Partniors: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.post("https://easyway-fmdo.onrender.com/loadPartners");
        const formatted: Partner[] = (res.data.partners as RawPartner[]).map(
          (p) => ({
            id: p._id,
            imageUrl: p.images?.[0] || "",
            companyName: p.companyName,
            description: p.description || "",
          })
        );

        setPartners(formatted);
      } catch (err) {
        console.error("Failed to load partners", err);
      }
    };

    fetchPartners();
  }, []);

  return (
    <div className="partners-section">
      <div className="partners-header">
        <h1 className="partners-title">ჩვენი პარტნიორები</h1>
        <p className="partners-description">
          გახდი ჩვენი პარტნიორების მომხმარებელი და მიიღე ექსკლუზიური ულიმიტო
          ფასდაკლება.
        </p>
      </div>

      <div className="partners-list">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="partners-card"
            onClick={() => navigate(`/partners/${partner.id}`)} // ✅ click to navigate
            style={{ cursor: "pointer" }}
          >
            <img
              src={partner.imageUrl}
              alt={partner.companyName}
              className="partner-logo"
            />
            <p>{partner.companyName}</p>
            <p>{partner.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partniors;
