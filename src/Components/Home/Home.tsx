import "./CSS/Home.css";
import fb from "/img/colored-logo (1).png";
import insta from "/img/colored-logo.png";
import tiktok from "/img/colored-logo (2).png";

const Home = () => {
  return (
    <main className="main">
      <div>
        <div className="centerText">
          <h1 className="titleHome">გახადე მარტივი ჩვენთან ერთად!</h1>
          <h6 className="minText">შემოგვიერთდი ახლავე</h6>
          <div className="buttons">
            <button className="firstButtonn">შეიძინე ახლავე</button>
            <button className="secondButtonn">პარტნიორები</button>
          </div>
        </div>
        <div className="soc">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="fb" src={fb} alt="Facebook" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="insta" src={insta} alt="Instagram" />
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="tiktok" src={tiktok} alt="TikTok" />
          </a>
        </div>
      </div>
      <div className="wave-container">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shape-rendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 
      58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="50" y="0" />
            <use href="#gentle-wave" x="50" y="2" />
            <use href="#gentle-wave" x="50" y="4" />
            <use href="#gentle-wave" x="50" y="6" />
          </g>
        </svg>
      </div>
    </main>
  );
};

export default Home;
