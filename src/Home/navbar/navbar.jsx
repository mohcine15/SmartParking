import React, { useState } from "react";
import { Link } from "react-router-dom"; // Si vous utilisez React Router pour la navigation
import "./navbar.css";

import { IoIosCloseCircle } from "react-icons/io";
import { TbGridDots } from "react-icons/tb";


const Navbar = () => {
  const [active, setActive] = useState("navBar");

  // Function to toggle navbar
  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  // Function to remove navbar
  const removeNavbar = () => {
    setActive("navBar");
  };

  return (
    <section className="navBarsection">
      <header className="header flex">
        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1>Smart PARK</h1>
          </a>
        </div>
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/hotel" className="navLink">
                Home
              </Link>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                Packages
              </a>
            </li>
            <li className="navItem">
              <a href="#" className="navLink">
                About
              </a>
            </li>
            <li className="navItem">
              <a href="#footer" className="navLink">
                Contact
              </a>
            </li>
            <button className="btn">
              <a href="#">BOOK NOW</a>
            </button>
          </ul>
          <div onClick={removeNavbar} className="closeNavbar">
            <IoIosCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
