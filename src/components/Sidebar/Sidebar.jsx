import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const Sidebar = ({ sidebarVisible }) => {
  return (
    <div
      id="sidebar-wrapper"
      style={{
        marginLeft: sidebarVisible ? "0" : "-15rem",
        transition: "margin 0.25s ease-out",
      }}
    >
      <div className="sidebar-heading border-bottom bg-light">
        <img src={assets.logo} alt="" height={46} width={46} />
      </div>
      <div className="list-group list-group-flush">
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to={"/add"}
        >
          <i className="bi bi-plus-circle me-2"></i> Add Food
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to={"/list"}
        >
          <i className="bi bi-list-ul me-2"></i> List Food
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to={"/orders"}
        >
          <i className="bi bi-cart me-2"></i> Orders
        </Link>
        <Link
          className="list-group-item list-group-item-action list-group-item-light p-3"
          to={"/contact-messages"}
        >
          <i className="bi bi-envelope-fill me-2"></i> Contact Messages
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
