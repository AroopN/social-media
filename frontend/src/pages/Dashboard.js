import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <div className="image-wrapper">
        <img src={logo} alt="" className="dashboard-image" />
      </div>
      <div className="dashboard-links-wrapper">
        <div className="dashboard-links">
          <div className="dashboard-link font__p font__bold p__size">
            <Link to="/change-profile" className="dashboard-link-href">
              Change Profile
            </Link>
          </div>

          <div className="dashboard-link font__p font__bold p__size">
            <Link to="/contact-us" className="dashboard-link-href">
              Contact Us
            </Link>
          </div>

          <div className="dashboard-link font__p font__bold p__size">
            <Link to="/change-password" className="dashboard-link-href">
              Change password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
