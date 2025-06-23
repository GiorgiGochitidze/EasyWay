import "./CSS/ShowCard.css";

const ShowCard = () => {
  return (
    <div className="showCard-container">
      <div className="card-container">
        <div className="card">
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
            <p style={{fontSize: "13px", textAlign: "center"}}>Cottage Panorama in Bulachaur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
