import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import "./CSS/Home.css";
import { Link } from "react-router-dom";

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
          <Link to="/packets">
            <button className="firstButtonn">შეიძინე ახლავე</button>
          </Link>
          <Link to="/partners">
            <button className="secondButtonn">პარტნიორები</button>
          </Link>
        </div>
        <div className="soc">
          <a
            href="https://www.facebook.com/profile.php?id=61572616679579"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook fill="#43518c" size={18} />
          </a>
          <a
            href="https://www.instagram.com/easy.way9666/?next=%2Freels%2FDBV7QOwuN3s%2F"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram fill="#43518c" size={18} />
          </a>
          <a
            href="https://www.tiktok.com/@easyway4690"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok fill="#43518c" size={18} />
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
