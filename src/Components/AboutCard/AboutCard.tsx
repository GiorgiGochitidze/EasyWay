import { useContext } from "react";
import CardVersion from "./CardVersion"; // adjust path if needed
import "./CSS/about.css";
import { LanguageContext } from "../../Hooks/LanguageContext";


const translations = {
  ge: {
    title: "აირჩიე სასურველი პაკეტი",
    oneMonth: "1 თვე",
    sixMonth: "6 თვე",
    oneYear: "1 წელი",
  },
  en: {
    title: "Choose Your Desired Package",
    oneMonth: "1 Month",
    sixMonth: "6 Month",
    oneYear: "1 Year",
  }
}

export default function AboutCard() {
const langCtx = useContext(LanguageContext);
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language } = langCtx;

  const t = translations[language];

  return (
    <div className="container">
      <h1 className="title">{t.title}</h1>
      <section className="packets-container">
        <CardVersion
          // 20₾
          price="20₾"
          duration={t.oneMonth}
          type="PREMIUM"
          shapeClass="shape"
          buttonClass="buy-button"
        />
        <CardVersion
          // 180₾
          price="180₾"
          duration={t.oneYear}
          type="BLACK GOLD"
          shapeClass="shape2"
          buttonClass="buy-button2"
        />
        <CardVersion
          price="99₾"
          duration={t.sixMonth}
          type="ELITE ENTRY"
          shapeClass="shape"
          buttonClass="buy-button"
        />
      </section>
    </div>
  );
}
