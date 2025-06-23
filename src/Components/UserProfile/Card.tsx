const Card = () => {
  return (
    <div className="card-wrapper">
      <div className="card-flip">
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
              Cottage Panorama in Bulachaur
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
