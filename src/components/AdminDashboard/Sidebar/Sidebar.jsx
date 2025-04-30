import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  List,
  Person,
  Cart,
  BoxArrowRight, // ✅ Logout Icon
  ChevronDown,
  ChevronUp,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Use navigate for redirection
  
  // Check if the current URL is part of the requests dropdown
  const isRequestsActive =
    location.pathname.includes("/admin/sellDashboard") ||
    location.pathname.includes("/admin/demolishDashboard");

  const [isOpen, setIsOpen] = useState(isRequestsActive);

  // Toggle Dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove auth token
    localStorage.removeItem("isSuperuser"); // Remove superuser status
    navigate("/login"); // Redirect to login page
    window.location.reload(); // Refresh page to clear state
  };

  return (
    <aside className="d-flex flex-column p-3 bg-light shadow-sm h-100 position-fixed w-auto">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className="nav-link d-flex align-items-center">
            <List className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/accounts" className="nav-link d-flex align-items-center">
            <Person className="me-2" /> Accounts
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/admin/orders" className="nav-link d-flex align-items-center">
            <Cart className="me-2" /> Orders
          </NavLink>
        </li>
        {/* Dropdown Menu */}
        <li className="nav-item">
          <span className="nav-link d-flex align-items-center" onClick={toggleDropdown} style={{ cursor: "pointer" }}>
            Requests {isOpen ? <ChevronUp className="ms-2" /> : <ChevronDown className="ms-2" />}
          </span>
          {isOpen && (
            <ul className="list-unstyled ps-3">
              <li>
                <NavLink to="/admin/sellDashboard" className="nav-link">Sell</NavLink>
              </li>
              <li>
                <NavLink to="/admin/demolishDashboard" className="nav-link">Demolish</NavLink>
              </li>
            </ul>
          )}
        </li>
        {/* ✅ Logout Button */}
        <li className="nav-item mt-auto">
          <button className="nav-link d-flex align-items-center text-danger bg-transparent border-0" onClick={handleLogout}>
            <BoxArrowRight className="me-2" /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
