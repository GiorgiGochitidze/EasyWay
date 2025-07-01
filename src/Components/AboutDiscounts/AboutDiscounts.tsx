import "./css/discounts.css";

export default function AboutDiscounts() {
  return (
    <section className="main-container">
      <div className="text-div">
        <h1 className="title">ფასდაკლებების შესახებ</h1>
        <p className="text-content">
          ჩვენ გთავაზობთ ფართო ფასდაკლების არჩევანს სხვადასხვა ტიპის სერვისზე.
          ეს მომხმარებელს უადვილებს ყოველდღიურ არჩევანს და ეხმარება მიზნის
          მიღწევაში.
        </p>
      </div>
      <section className="discounts-section">
        <div className="discount-container">
          <div className="number">01</div>
          <div className="message">
            <div className="square"></div>

            <span className="offer">1 - 100 ლარამდე 30%</span>
          </div>
        </div>
        <div className="discount-container">
          <div className="number">02</div>
          <div className="message">
            <div className="square"></div>

            <span className="offer">100 - 300 ლარამდე 20%</span>
          </div>
        </div>
        <div className="discount-container">
          <div className="number">03</div>
          <div className="message">
            <div className="square"></div>

            <span className="offer">300 - 500 ლარამდე 10%</span>
          </div>
        </div>
        <div className="discount-container">
          <div className="number">04</div>
          <div className="message">
            <div className="square"></div>

            <span className="offer">500+ ლ. 10%</span>
          </div>
        </div>
      </section>
    </section>
  );
}
