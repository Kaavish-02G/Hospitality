import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

// Functional component demonstrating Hooks (useLocation) and Routing (Link)
const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/patients', label: 'Patients', icon: '🏥' },
    { path: '/appointments', label: 'Appointments', icon: '📅' },
    { path: '/doctors', label: 'Doctors', icon: '👨‍⚕️' },
    { path: '/billing', label: 'Billing', icon: '💳' },
    { path: '/prescriptions', label: 'Pharmacy', icon: '💊' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">+</span>
          <span className="brand-text">Hospitality</span>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-label">{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="navbar-profile">
          <div className="profile-avatar">A</div>
          <span className="profile-name">Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
