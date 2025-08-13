import { FaFacebookF, FaInstagram, FaPhone, FaTiktok } from "react-icons/fa";
import "./CSS/Footer.css";
import { Link } from "react-router-dom";
import LinkStyles from "../LinkStyles";
import { BiLogoGmail } from "react-icons/bi";
import { useContext } from "react";
import { ThemeContext } from "../../Hooks/ThemeContext";
import { LanguageContext } from "../../Hooks/LanguageContext";

const translations = {
  ge: {
    company: "კომპანია",
    blog: "ბლოგი",
    about: "ჩვენს შესახებ",
    services: "ჩვენი სერვისები",
    help: "დახმარება",
    questions: "ხშირად დასმული კითხვები",
    contact: "დაგვიკავშირდით",
    terms: "წესები და პირობები",
    privacy: "კონფიდენციალურობა და პოლიტიკა",
    network: "სოციალური ქსელები"
  },
  en: {
    company: "Company",
    blog: "Blog",
    about: "About Us",
    services: "Our Services",
    help: "Help",
    questions: "Frequently Asked Questions",
    contact: "Contact Us",
    terms: "Terms and Conditions",
    privacy: "Privacy Policy",
    network: "Social Media"
  }
}

const Footer = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("ThemeContext.Provider is missing");
  }
  const { isDark } = theme;

 const langCtx = useContext(LanguageContext);
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language } = langCtx;

  const t = translations[language];

  return (
    <footer className={`footer ${isDark ? "dark" : ""}`}>
      <div className="footer-container">
        <div className={`row ${isDark ? "dark" : ""}`}>
          <div className="footerCol">
            <h4 className={isDark ? "dark" : ""}>{t.company}</h4>
            <ul>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>{t.blog}</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>{t.about}</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/packets">
                  <p>{t.services}</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footerCol">
            <h4>{t.help}</h4>
            <ul>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>{t.questions}</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/TechWorks">
                  <p>{t.contact}</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/Terms&Conditions">
                  <p>{t.terms}</p>
                </Link>
              </li>
              <li>
                <Link style={LinkStyles} to="/Privacy&Policy">
                  <p>{t.privacy}</p>
                </Link>
              </li>
            </ul>
          </div>
          <div style={{ width: "auto" }} className="footerCol">
            <h4>{t.network}</h4>
            <div className="socialLinks">
              <a
                target="_blank"
                href="https://www.facebook.com/profile.php?id=61572616679579"
              >
                <FaFacebookF
                  size={30}
                  // fill="black"
                  style={{
                    color: isDark ? "#f8fafc" : "black",
                    transition: "color 0.2s ease-in-out",
                  }}
                />
              </a>

              <a target="_blank" href="https://www.tiktok.com/@easyway4690">
                <FaTiktok
                  size={30}
                  // fill="black"
                  style={{
                    color: isDark ? "#f8fafc" : "black",
                    transition: "color 0.2s ease-in-out",
                  }}
                />
              </a>

              <a
                target="_blank"
                href="https://www.instagram.com/easy.way9666/?next=%2Freels%2FDBV7QOwuN3s%2F"
              >
                <FaInstagram
                  // fill="black"
                  size={30}
                  style={{
                    color: isDark ? "#f8fafc" : "black",
                    transition: "color 0.2s ease-in-out",
                  }}
                />
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
              <BiLogoGmail
                size={20}
                style={{
                  color: isDark ? "#f8fafc" : " ",
                  transition: "color 0.2s ease-in-out",
                }}
              />
              <p
                style={{
                  color: isDark ? "#f8fafc" : " ",
                  transition: "color 0.2s ease-in-out",
                }}
              >
                easywaygeo@gmail.com
              </p>
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
              <FaPhone
                size={20}
                style={{
                  color: isDark ? "#f8fafc" : " ",
                  transition: "color 0.2s ease-in-out",
                }}
              />
              <p
                style={{
                  color: isDark ? "#f8fafc" : " ",
                  transition: "color 0.2s ease-in-out",
                }}
              >
                +995 579 16 14 30
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`copyright ${isDark ? "dark" : ""}`}>© {new Date().getFullYear()} Easy Way</div>
    </footer>
  );
};

export default Footer;
