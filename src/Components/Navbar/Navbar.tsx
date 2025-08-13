import "./CSS/navbar.css";
import type { navigation } from "./type";
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

const navigation: navigation[] = [
  {
    nav: "მთავარი",
    route: "/",
  },
  {
    nav: "ბარათის შესახებ",
    route: "/packets",
  },
  {
    nav: "პარტნიორები",
    route: "/partners",
  },
  {
    nav: "გახდი პარტნიორი",
    route: "/new-partner",
  },
];

const Navbar = () => {
  const { token, decoded } = useToken();
  const navigate = useNavigate();
  const [profileMenu, setProfileMenu] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);

  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("ThemeContext.Provider is missing");
  }
  const { isDark, setIsDark } = theme;

  const handleLogout = () => {
    Cookie.remove("userAuthToken");
    navigate("/SignIn");
    window.location.reload();
  };

  const langCtx = useContext(LanguageContext);
  if (!langCtx) throw new Error("LanguageContext.Provider is missing");
  const { language, toggleLanguage } = langCtx;

  // const t = translations[language];

  return (
    <>
      <header className={isDark ? "dark" : ""}>
        <nav>
          <div className="logo-image-container">
            <img width={"50px"} height={"50px"} src={EasyWayLogo} alt="Logo" />
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
                  // position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "transparent",
                  border: "1px solid gray",
                  padding: "5px 10px",
                  cursor: "pointer",
                  color: isDark ? "#f8fafc" : "#000",
                }}
              >
                {language === "ge" ? "EN" : "GE"}
              </button>
              {navigation.map((navItems, index) => (
                <Link
                  style={{
                    textDecoration: "none",
                    color: isDark ? "#F8FAFC" : "black",
                    transition: "color 0.2s ease-in-out",
                  }}
                  to={navItems.route}
                  key={index}
                >
                  <p>{navItems.nav}</p>
                </Link>
              ))}

              {/* Conditional rendering for SignIn / SignOut */}
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
                      className="profileItem-p "
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

                    {decoded?.role == "admin" && (
                      <Link
                        className="profileItem-p"
                        to="/addPartner"
                        style={LinkStyles}
                      >
                        <p
                          onClick={() => setProfileMenu(!profileMenu)}
                          style={{ color: "black" }}
                        >
                          პარტნიორის დამატება
                        </p>
                      </Link>
                    )}

                    <p onClick={handleLogout}>გასვლა</p>
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
                <p>შესვლა</p>
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
