import React from 'react';
import PropTypes from 'prop-types';

// Functional component with Props Validation
const Notification = ({ message, type }) => {
  if (!message) return null;

  const styles = {
    container: {
      position: 'fixed',
      top: 24,
      right: 24,
      padding: '14px 24px',
      borderRadius: '10px',
      color: '#fff',
      fontWeight: 600,
      fontSize: 14,
      zIndex: 9999,
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      animation: 'slideIn 0.3s ease',
      background: type === 'success' ? '#16a34a' : type === 'danger' ? '#ef4444' : '#f59e0b',
    },
  };

  return <div style={styles.container}>{message}</div>;
};

// Props Validation using PropTypes
Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger', 'warning']),
};

Notification.defaultProps = {
  type: 'success',
};

export default Notification;
