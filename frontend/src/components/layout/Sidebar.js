import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';
import logo from '../../assets/images/aias-logo.png'; // Update the path as needed
const Sidebar = ({ onLogout }) => {
  const location = useLocation();

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={logo} alt="AIAS Logo" className="sidebar-logo-img" />
        </div>
      </div>
      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          <i className="bi bi-speedometer2"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          to="/members"
          className={`nav-item ${location.pathname === '/members' ? 'active' : ''}`}
        >
          <i className="bi bi-people-fill"></i>
          <span>Members</span>
        </Link>
        <Link
          to="/events"
          className={`nav-item ${location.pathname.startsWith('/events') ? 'active' : ''}`}
        >
          <i className="bi bi-calendar-event-fill"></i>
          <span>Events</span>
        </Link>
        <Link
          to="/resources"
          className={`nav-item ${location.pathname === '/resources' ? 'active' : ''}`}
        >
          <i className="bi bi-journal-text"></i>
          <span>Resources</span>
        </Link>
      </nav>
      <button className="logout-btn" onClick={onLogout}>
        <i className="bi bi-box-arrow-right"></i>
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
