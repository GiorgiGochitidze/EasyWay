import "./CSS/Menu.css";
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../Hooks/TokenContext";
import Cookie from "js-cookie";
import LinkStyles from "../LinkStyles";
import type { navigation } from "./type";
import type React from "react";

const navItems: navigation[] = [
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

type menuTypes = {
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu = ({ menu, setMenu }: menuTypes) => {
  const { token } = useToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove("userAuthToken");
    navigate("/SignIn");
    window.location.reload();
  };

  return (
    <div className="navbarMenu-container">
      <ul>
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            onClick={() => setMenu(!menu)}
            to={item.route}
            style={LinkStyles}
          >
            <li>{item.nav}</li>
          </Link>
        ))}

        {token ? (
          <>
            <li>
              <button onClick={handleLogout} className="menu-btn">
                გასვლა
              </button>
            </li>
          </>
        ) : (
          <Link onClick={() => setMenu(!menu)} to="/SignIn" style={LinkStyles}>
            <li>შესვლა</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Menu;
