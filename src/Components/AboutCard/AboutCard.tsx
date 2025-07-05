import CardVersion from "./CardVersion"; // adjust path if needed
import "./CSS/about.css";

export default function AboutCard() {
  return (
    <div className="container">
      <h1 className="title">აირჩიე სასურველი პაკეტი</h1>
      <section className="packets-container">
        <CardVersion
        // 20₾
          price="0.05₾"
          duration="1 თვე"
          type="PREMIUM"
          shapeClass="shape"
          buttonClass="buy-button"
        />
        <CardVersion
        // 180₾
          price="0.10₾"
          duration="1 წელი"
          type="BLACK GOLD"
          shapeClass="shape2"
          buttonClass="buy-button2"
        />
        <CardVersion
          price="99₾"
          duration="6 თვე"
          type="ELITE ENTRY"
          shapeClass="shape"
          buttonClass="buy-button"
        />
      </section>
    </div>
  );
}
