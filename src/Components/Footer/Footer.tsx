import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import "./CSS/Footer.css";
import { Link } from "react-router-dom";
import LinkStyles from "../LinkStyles";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footerCol">
            <h4>კომპანია</h4>
            <ul>
              <li>
                <Link style={LinkStyles} to="/Blog">
                  <p>ბლოგი</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/AboutUs">
                  <p>ჩვენს შესახებ</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/Services">
                  <p>ჩვენი სერვისები</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>დახმარება</h4>
            <ul>
              <li>
                <Link style={LinkStyles} to="/Faq">
                  <p>ხშირად დასმული კითხვები</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/ContactUs">
                  <p>დაგვიკავშირდით</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>წესები და პირობები</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/Privacy&Policy">
                  <p>კონფიდენციალურობა და პოლიტიკა</p>
                </Link>
              </li>
            </ul>
          </div>
          <div style={{ width: "auto" }} className="footerCol">
            <h4>სოციალური ქსელები</h4>
            <div className="socialLinks">
              <a target="_blank" href="https://www.facebook.com/LasarStudio">
                <FaFacebookF size={30} fill="black" />
              </a>

              <a target="_blank" href="https://www.youtube.com/@LasarStudio">
                <FaYoutube size={30} fill="black" />
              </a>

              <a target="_blank" href="https://www.tiktok.com/@lasarstudio">
                <FaTiktok size={30} fill="black" />
              </a>

              <a target="_blank" href="https://www.tiktok.com/@lasarstudio">
                <FaInstagram fill="black" size={30} />
              </a>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "5px",
                marginLeft: "10px",
              }}
              className="miniInfo"
            >
              <BiLogoGmail size={20} />
              <p>theatre.theatrali@gmail.com</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "5px",
                marginLeft: "10px",
              }}
              className="miniInfo"
            >
              <FaPhone size={20} />
              <p>+995 571 32 22 28</p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} Lasar Studio</div>
    </footer>
  );
};

export default Footer;
