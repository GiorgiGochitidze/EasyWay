import { useToken } from "../../Hooks/TokenContext";
import Card from "./Card";
import "./CSS/UserProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";

type PartnerCompany = {
  companyName: string;
  companyId: string;
};

type CardType = {
  _id: string;
  cardId: string;
  cardUser: string;
  duration: string;
  startDate: string;
  endDate: string;
  partnerCompany: {
    companyName: string;
    companyId: string;
  };
};

const UserProfile = () => {
  const { decoded } = useToken();
  const [partners, setPartners] = useState([]);
  const [showPartnerList, setShowPartnerList] = useState(false);
  const [msg, setMsg] = useState("");
  const [userCards, setUserCards] = useState<CardType[]>([]);

  // Fetch partners from backend
  useEffect(() => {
    axios
      .post("https://easyway-fmdo.onrender.com/partners")
      .then((res) => setPartners(res.data))
      .catch((err) => console.error("Partner fetch error:", err));
  }, []);

  useEffect(() => {
    if (!decoded || !decoded.id) return;

    axios
      .post("https://easyway-fmdo.onrender.com/user/cards", {
        userId: decoded.id,
      })
      .then((response) => {
        const cards = response.data;
        setUserCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [decoded]);


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
      const res = await axios.post("https://easyway-fmdo.onrender.com/addCard", cardData);
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
        <h1>გამარჯობა: {decoded?.userName}</h1>
        <h2 style={{fontSize: "30px"}}>პროფილი</h2>
      </div>

      {userCards.length > 0 ? (
        <div className="profile-card-part">
          {userCards.map((card) => (
            <Card key={card._id} card={card} />
          ))}
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
            {partners.map((partner: PartnerCompany) => (
              <li
                key={partner.companyId}
                onClick={() => handleAddCard(partner)}
                style={{
                  cursor: "pointer",
                  marginBottom: "8px",
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                {partner.companyName}
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
