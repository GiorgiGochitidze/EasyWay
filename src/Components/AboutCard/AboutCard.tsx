import "./CSS/about.css";

export default function AboutCard() {
  return (
    <div className="container">
      <h1 className="title">აირჩიე სასურველი პაკეტი</h1>
      <section className="packets-container">
        <div className="packet">
          <div className="shape">20₾</div>
          <h3 className="card-type">PREMIUM</h3>
          <div className="button-div">
            <button className="buy-button">პაკეტის შეძენა</button>
          </div>
        </div>
        <div className="packet">
          <div className="shape2">180₾</div>
          <h3 className="card-type">BLACK GOLD</h3>
          <div className="button-div">
            <button className="buy-button2">პაკეტის შეძენა</button>
          </div>
        </div>
        <div className="packet">
          <div className="shape">99₾</div>
          <h3 className="card-type">ELITE ENTRY</h3>
          <div className="button-div">
            <button className="buy-button">პაკეტის შეძენა</button>
          </div>
        </div>
      </section>
    </div>
  );
}
