import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from '../common/Notification';
import useAppContext from '../../hooks/useAppContext';
import './Layout.css';

// Layout component wrapping children - demonstrates Props (children)
const Layout = ({ children }) => {
  const { notification } = useAppContext();

  return (
    <div className="layout">
      <Navbar />
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
