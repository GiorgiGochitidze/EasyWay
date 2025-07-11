import { FaFacebookF, FaInstagram, FaPhone, FaTiktok } from "react-icons/fa";
import "./CSS/Footer.css";
import { Link } from "react-router-dom";
import LinkStyles from "../LinkStyles";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="row">
          <div className="footerCol">
            <h4>კომპანია</h4>
            <ul>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>ბლოგი</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>ჩვენს შესახებ</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/packets">
                  <p>ჩვენი სერვისები</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>დახმარება</h4>
            <ul>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>ხშირად დასმული კითხვები</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>დაგვიკავშირდით</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/Terms&Conditions">
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
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61572616679579"
              >
                <FaFacebookF size={30} fill="black" />
              </a>

              <a target="_blank" href="https://www.tiktok.com/@easyway4690">
                <FaTiktok size={30} fill="black" />
              </a>

              <a
                target="_blank"
                href="https://www.instagram.com/easy.way9666/?next=%2Freels%2FDBV7QOwuN3s%2F"
              >
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
              <p>easywaygeo@gmail.com</p>
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
              <p>+995 579 16 14 30</p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} Easy Way</div>
    </footer>
  );
};

export default Footer;
