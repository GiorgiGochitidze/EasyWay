import { useNavigate } from "react-router-dom";
import { usePacket } from "../../Hooks/PacketContext";
import { useContext } from "react";
import { LanguageContext } from "../../Hooks/LanguageContext";

type CardProps = {
  price: string;
  duration: string;
  type: string;
  shapeClass: string;
  buttonClass: string;
};

type choosenCard = {
  price: string;
  duration: string;
  type: string;
};

const translations = {
  ge: {
    buy: "პაკეტის შეძენა"
  },
  en: {
    buy: "Buy Package"
  }
}

const CardVersion = ({
  price,
  duration,
  type,
  shapeClass,
  buttonClass,
}: CardProps) => {
  const { setSelectedPacket } = usePacket();
  const navigate = useNavigate();

  const handleChooseCard = ({ price, duration, type }: choosenCard) => {
    setSelectedPacket({ price, duration, type });
    navigate("/SignUp");
  };

  const langCtx = useContext(LanguageContext);
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language } = langCtx;

  const t = translations[language];

  return (
    <div className="packet">
      <div style={{ textAlign: "center" }} className={shapeClass}>
        {price} <br /> {duration}
      </div>
      <h3 className="card-type">{type}</h3>
      <div className="button-div">
        <button
          onClick={() => handleChooseCard({ price, duration, type })}
          className={buttonClass}
        >
          {t.buy}
        </button>
      </div>
    </div>
  );
};

export default CardVersion;
