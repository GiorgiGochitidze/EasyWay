import "./css/navbar.css";
import Menu from "../../assets/icon-hamburger.svg";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { navigation } from "./type";
import { Link } from "react-router-dom";
import Close from "../../assets/icon-close.svg";

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
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header>
        {displayMenu ? (
          <AnimatePresence>
            <motion.img
              src={Close}
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 90 }}
              exit={{ opacity: 0, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 13,
                duration: 0.2,
              }}
              className="close-button"
              alt="close icon"
              onClick={() => setDisplayMenu(false)}
            />
          </AnimatePresence>
        ) : (
          <AnimatePresence>
            <motion.img
              className="menu-button"
              src={Menu}
              alt="menu icon"
              onClick={() => setDisplayMenu(true)}
            />
          </AnimatePresence>
        )}

        <nav className="desktop-nav">
          <ul className="desktop-routes-list">
            {navigation.map((item, index) => {
              return (
                <li key={index} className="desktop-routes">
                  <Link style={{ all: "unset" }} to={item.route}>
                    {item.nav}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <AnimatePresence mode="popLayout">
        {displayMenu && (
          <div className="menu">
            {/* Overlay */}
            <motion.div
              className="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setDisplayMenu(false)}
            />
            <motion.div
              className="hamburger-menu"
              ref={menuRef}
              initial={{ opacity: 1, y: -300 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.15 }}
            >
              <motion.nav
                initial={{ opacity: 1, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.2 }}
              >
                <ul className="routes-list">
                  {navigation.map((item, index) => (
                    <li
                      key={index}
                      className="routes"
                      onClick={() => setDisplayMenu(false)}
                    >
                      <Link style={{ all: "unset" }} to={item.route}>
                        {item.nav}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
