import "./CSS/Home.css";
import fb from "/img/colored-logo (1).png";
import insta from "/img/colored-logo.png";
import tiktok from "/img/colored-logo (2).png";

const Home = () => {
  return (
    <main>
      <div className="centerText">
        <h1 className="titleHome">გახადე მარტივი ჩვენთან ერთად!</h1>
        <h6 className="minText">შემოგვიერთდი ახლავე</h6>
      </div>
      <div className="buttonAndSocMedia">
        {" "}
        <div className="buttons">
          <button className="firstButtonn">შეიძინე ახლავე</button>
          <button className="secondButtonn">პარტნიორები</button>
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
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wavePath"
              d="M0,100 C300,200 900,0 1200,100 L1200,200 L0,200 Z"
            />
          </defs>

          {/* Back (higher) */}
          <g className="waveGroup back">
            <use href="#wavePath" x="0" y="0" />
            <use href="#wavePath" x="1200" y="0" />
            <use href="#wavePath" x="2400" y="0" />
          </g>

          {/* Middle */}
          <g className="waveGroup middle">
            <use href="#wavePath" x="0" y="20" />
            <use href="#wavePath" x="1200" y="20" />
            <use href="#wavePath" x="2400" y="20" />
          </g>

          {/* Front (lowest) */}
          <g className="waveGroup front">
            <use href="#wavePath" x="0" y="40" />
            <use href="#wavePath" x="1200" y="40" />
            <use href="#wavePath" x="2400" y="40" />
          </g>
        </svg>
      </div>
    </main>
  );
};

export default Home;
