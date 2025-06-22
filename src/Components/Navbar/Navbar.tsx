import "./css/navbar.css";
import type { navigation } from "./type";
// import hamburgerIcon from "../../assets/icon-hamburger.svg";
import EasyWayLogo from "../../assets/easyWayLogo.jpeg";

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
  return (
    <>
      <header>
        <nav>
          <div className="logo-image-container">
            <img width={"50px"} height={"50px"} src={EasyWayLogo} alt="" />
          </div>
          <div className="navItems-container">
            {navigation.map((navItems, index) => (
              <p key={index}>{navItems.nav}</p>
            ))}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
