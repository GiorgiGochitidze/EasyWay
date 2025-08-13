import "./CSS/navbar.css";
import EasyWayLogo from "../../assets/easyWayLogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../Hooks/TokenContext";
import Cookie from "js-cookie";
import { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import LinkStyles from "../LinkStyles";
import { BiMenu } from "react-icons/bi";
import { IoMdMoon, IoIosSunny } from "react-icons/io";
import { ThemeContext } from "../../Hooks/ThemeContext";
import Menu from "./Menu";
import { LanguageContext } from "../../Hooks/LanguageContext";

// ---------------- TYPES ----------------
type NavItem = {
  nav: string;
  route: string;
};

type Navigation = {
  ge: NavItem[];
  en: NavItem[];
};

type Language = "ge" | "en";

type LanguageContextType = {
  language: Language;
  toggleLanguage: () => void;
};

type DecodedToken = {
  userName: string;
  role: "admin" | "user";
};

type TokenContextType = {
  token: string | null;
  decoded: DecodedToken | null;
};

type ThemeContextType = {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
};

// type MenuProps = {
//   menu: boolean;
//   setMenu: React.Dispatch<React.SetStateAction<boolean>>;
// }

// ---------------- NAV TRANSLATIONS ----------------
const navTranslations: Navigation = {
  ge: [
    { nav: "მთავარი", route: "/" },
    { nav: "ბარათის შესახებ", route: "/packets" },
    { nav: "პარტნიორები", route: "/partners" },
    { nav: "გახდი პარტნიორი", route: "/new-partner" },
  ],
  en: [
    { nav: "Home", route: "/" },
    { nav: "About Card", route: "/packets" },
    { nav: "Partners", route: "/partners" },
    { nav: "Become a Partner", route: "/new-partner" },
  ],
};

// ---------------- NAVBAR ----------------
const Navbar = () => {
  const { token, decoded } = useToken() as TokenContextType;
  const navigate = useNavigate();
  const [profileMenu, setProfileMenu] = useState(false);
  const [menu, setMenu] = useState(false);

  const theme = useContext(ThemeContext) as ThemeContextType;
  if (!theme) throw new Error("ThemeContext.Provider is missing");
  const { isDark, setIsDark } = theme;

  const langCtx = useContext(LanguageContext) as LanguageContextType;
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language, toggleLanguage } = langCtx;

  const handleLogout = () => {
    Cookie.remove("userAuthToken");
    navigate("/SignIn");
    window.location.reload();
  };

  const navigation = navTranslations[language];

  return (
    <>
      <header className={isDark ? "dark" : ""}>
        <nav>
          <div className="logo-image-container">
            <img width="50px" height="50px" src={EasyWayLogo} alt="Logo" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div className="navItems-container">
              <button
                onClick={() => setIsDark(!isDark)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "transparent",
                  border: "none",
                  fontSize: "25px",
                  cursor: "pointer",
                  color: isDark ? "white" : "yellow",
                }}
              >
                {isDark ? <IoMdMoon /> : <IoIosSunny />}
              </button>
              <button
                onClick={toggleLanguage}
                style={{
                  background: "transparent",
                  border: "1px solid gray",
                  padding: "5px 10px",
                  cursor: "pointer",
                  color: isDark ? "#f8fafc" : "#000",
                }}
              >
                {language === "ge" ? "EN" : "GE"}
              </button>
              {navigation.map((navItem, index) => (
                <Link
                  style={{
                    textDecoration: "none",
                    color: isDark ? "#F8FAFC" : "black",
                    transition: "color 0.2s ease-in-out",
                  }}
                  to={navItem.route}
                  key={index}
                >
                  <p>{navItem.nav}</p>
                </Link>
              ))}
            </div>
            {token ? (
              <div className="userProfile-container">
                <FaRegUser
                  onClick={() => setProfileMenu(!profileMenu)}
                  size={20}
                />
                {profileMenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="profile-items-list"
                  >
                    <Link
                      className="profileItem-p"
                      to="/UserProfile"
                      style={LinkStyles}
                    >
                      <p
                        onClick={() => setProfileMenu(!profileMenu)}
                        style={{ color: "black" }}
                      >
                        {decoded?.userName}
                      </p>
                    </Link>

                    {decoded?.role === "admin" && (
                      <Link
                        className="profileItem-p"
                        to="/addPartner"
                        style={LinkStyles}
                      >
                        <p
                          onClick={() => setProfileMenu(!profileMenu)}
                          style={{ color: "black" }}
                        >
                          {language === "ge"
                            ? "პარტნიორის დამატება"
                            : "Add Partner"}
                        </p>
                      </Link>
                    )}

                    <p onClick={handleLogout}>
                      {language === "ge" ? "გასვლა" : "Logout"}
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                style={{
                  textDecoration: "none",
                  color: isDark ? "#F8FAFC" : "black",
                  transition: "color 0.2s ease-in-out",
                }}
                to="/SignIn"
              >
                <p>{language === "ge" ? "შესვლა" : "Sign In"}</p>
              </Link>
            )}
            <BiMenu
              size={30}
              onClick={() => setMenu(!menu)}
              className="menu-icon"
            />
          </div>
        </nav>
      </header>
      {menu && <Menu menu={menu} setMenu={setMenu} />}
    </>
  );
};

export default Navbar;
