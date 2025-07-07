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
            <p>ფასდაკლების ბარათი</p>
          </div>
          <div className="card-bottomPart">
            <div className="discounts">
              <p>10%</p>
              <p>20%</p>
              <p>30%</p>
            </div>
            <p>ვადა: {card.duration}</p>
          </div>
        </div>
        <div className="card-back">
          <h3>თქვენი ID:</h3>
          <ul>
            <li>{card.cardId}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
