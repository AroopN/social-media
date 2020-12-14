import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";

const NavbarLogo = () => {
  return (
    <div className="logo-wrapper">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
    </div>
  );
};

export default NavbarLogo;
