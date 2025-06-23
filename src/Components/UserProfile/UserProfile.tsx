import { useToken } from "../../Hooks/TokenContext";
import Card from "./Card";
import "./CSS/UserProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";


type PartnerCompany = {
  companyName: string;
  companyId: string;
};

const UserProfile = () => {
  const { decoded } = useToken();
  const [partners, setPartners] = useState([]);
  const [showPartnerList, setShowPartnerList] = useState(false);
  const [msg, setMsg] = useState("");
  const [userCards, setUserCards] = useState([]);

  // Fetch partners from backend
  useEffect(() => {
    axios
      .post("http://localhost:5000/partners")
      .then((res) => setPartners(res.data))
      .catch((err) => console.error("Partner fetch error:", err));
  }, []);

  useEffect(() => {
    if (!decoded || !decoded.id) return;

    axios
      .post("http://localhost:5000/user/cards", {
        userId: decoded.id,
      })
      .then((response) => {
        const cards = response.data;
        setUserCards(cards); // ✅ store in state
      })
      .catch((err) => {
        console.log(err);
      });
  }, [decoded]);

  console.log(partners);

  const handleAddCard = async (partner: PartnerCompany) => {
    if (!decoded) return;

    const cardData = {
      cardUser: decoded.id,
      duration: "6 months", // or dynamic
      startDate: "2025-06-01", // or dynamic
      endDate: "2025-12-01", // or dynamic
      partnerCompany: partner,
    };

    try {
      const res = await axios.post("http://localhost:5000/addCard", cardData);
      setMsg(res.data.message);
      setShowPartnerList(false);
    } catch (err) {
      console.error("Error adding card:", err);
      setMsg("დამატების შეცდომა");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-upperPart">
        <p>გამარჯობა: {decoded?.userName}</p>
        <p>პროფილი</p>
      </div>

      {userCards.length > 0 ? (
        <div className="profile-card-part">
          <Card card={userCards[0]} />
        </div>
      ) : (
        <p style={{ marginLeft: "30px" }}>ბარათი ჯერ არ გაქვს</p>
      )}

      <button
        onClick={() => setShowPartnerList(!showPartnerList)}
        style={{
          marginLeft: "30px",
          padding: "10px 20px",
          backgroundColor: "#ff9500",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        ბარათის დამატება
      </button>

      {showPartnerList && (
        <div style={{ padding: "20px", marginLeft: "30px" }}>
          <p>აირჩიე პარტნიორი:</p>
          <ul>
            {partners.map((partner: any) => (
              <li
                key={partner.id}
                style={{
                  cursor: "pointer",
                  marginBottom: "8px",
                  color: "blue",
                  textDecoration: "underline",
                }}
                onClick={() => handleAddCard(partner)}
              >
                {partner.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {msg && (
        <p style={{ marginLeft: "30px", color: "green", fontWeight: "bold" }}>
          {msg}
        </p>
      )}
    </div>
  );
};

export default UserProfile;
