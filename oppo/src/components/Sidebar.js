import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';
import logo from '../image/logo.png';


const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/' && location.pathname === '/') return true;
        if (path !== '/' && location.pathname.startsWith(path)) return true;
        return false;
    };

    return (
        <div className="custom-sidebar">
            {/* Header Section */}
            <div className="sidebar-header">
                <div className="logo-section">
                    <img src={logo} alt="AIAS Logo" className="logo-image" />
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="sidebar-menu">
                <div className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`}>
                    <Link to="/dashboard" className="menu-link">
                        <i className="bi bi-speedometer2"></i>
                        <span>Dashboard</span>
                    </Link>
                </div>

                <div className={`menu-item ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
                    <Link to="/" className="menu-link">
                        <i className="bi bi-people"></i>
                        <span>Members</span>
                    </Link>
                </div>

                <div className={`menu-item ${isActive('/events') ? 'active' : ''}`}>
                    <Link to="/events" className="menu-link">
                        <i className="bi bi-calendar3"></i>
                        <span>Events</span>
                    </Link>
                </div>

                <div className={`menu-item ${isActive('/resources') ? 'active' : ''}`}>
                    <Link to="/resources" className="menu-link">
                        <i className="bi bi-journal-text"></i>
                        <span>Resources</span>
                    </Link>
                </div>
            </div>

            {/* Logout Section */}
            <div className="sidebar-footer">
                <div className="menu-item logout-item">
                    <button className="logout-link" onClick={() => window.location.reload()}>
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;