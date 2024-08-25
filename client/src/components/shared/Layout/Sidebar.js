import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
  // GET USER STATE
  const { user } = useSelector(state => state.auth)

  const location = useLocation();

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === 'organisation' && (
            <>
              <div
                className={`menu-item ${location.pathname === '/' && "active"}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to='/'>Inventory</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === '/donor' && "active"
                  }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to='/donor'>Donor</Link>
              </div>

            </>
          )}
          {user?.role === 'admin' && (
            <>
              <div
                className={`menu-item ${location.pathname === '/donor-list' && "active"}`}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to='/donor-list'>Donor List</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === '/hospital-list' && "active"
                  }`}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to='/hospital-list'>Hospital List</Link>
              </div>
              <div
                className={`menu-item ${location.pathname === '/org-list' && "active"
                  }`}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to='/org-list'>Organisation List</Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default Sidebar;









