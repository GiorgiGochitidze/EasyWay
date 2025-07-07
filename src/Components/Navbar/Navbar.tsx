import "./CSS/navbar.css";
import type { navigation } from "./type";
import EasyWayLogo from "../../assets/easyWayLogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../Hooks/TokenContext";
import Cookie from "js-cookie";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import LinkStyles from "../LinkStyles";
import { BiMenu } from "react-icons/bi";
import Menu from "./Menu";

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

  const handleLogout = () => {
    Cookie.remove("userAuthToken");
    navigate("/SignIn");
    window.location.reload();
  };

  return (
    <>
      <header>
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
              {navigation.map((navItems, index) => (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
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
                style={{ textDecoration: "none", color: "black" }}
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
