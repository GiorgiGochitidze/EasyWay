import { useState } from "react";

type PartnerCompany = {
  companyName: string;
  companyId: string;
};

type CardType = {
  cardId: string;
  duration: string;
  startDate: string;
  endDate: string;
  partnerCompany: PartnerCompany;
};

const Card = ({ card }: { card: CardType }) => {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent flip if click is inside the discounts section
    const target = e.target as HTMLElement;
    if (target.closest(".discounts")) return;

    setFlipped((prev) => !prev);
  };

  return (
    <div className="card-wrapper" onClick={handleCardClick}>
      <div className={`card-flip ${flipped ? "flipped" : ""}`}>
        <div className="card-front">
          <div className="card-upperPart">
            <p>Easy Way</p>
            <p>Discount Card</p>
          </div>
          <div className="card-bottomPart">
            <div className="discounts">
              <p>10%</p>
              <p>20%</p>
              <p>30%</p>
            </div>
            <p style={{ fontSize: "13px", textAlign: "center" }}>
              {card.partnerCompany?.companyName || "პარტნიორი კომპანია"}
            </p>
          </div>
        </div>
        <div className="card-back">
          <h3>Special Offers</h3>
          <ul>
            <li>✓ Free Breakfast</li>
            <li>✓ Late Checkout</li>
            <li>✓ VIP Support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
