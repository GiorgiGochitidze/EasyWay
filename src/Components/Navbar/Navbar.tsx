import "./css/navbar.css";
import type { navigation } from "./type";
import EasyWayLogo from "../../assets/easyWayLogo.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../Hooks/TokenContext";
import Cookie from "js-cookie";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import LinkStyles from "../LinkStyles";

const navigation: navigation[] = [
  {
    nav: "მთავარი",
    route: "/",
  },
  {
    nav: "ბარათის შესახებ",
    route: "/about",
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

  const handleLogout = () => {
    Cookie.remove("userAuthToken");
    navigate("/SignIn");
    window.location.reload(); // Optional: Refresh to update UI instantly
  };

  return (
    <header>
      <nav>
        <div className="logo-image-container">
          <img width={"50px"} height={"50px"} src={EasyWayLogo} alt="Logo" />
        </div>

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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
