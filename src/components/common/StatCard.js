import React from 'react';
import PropTypes from 'prop-types';

// Demonstrates Props, Props Validation, and inline Styling in React
const StatCard = ({ icon, label, value, color, trend }) => {
  const styles = {
    card: {
      background: '#fff',
      borderRadius: 12,
      padding: '22px 24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      transition: 'all 0.2s ease',
      borderLeft: `4px solid ${color}`,
    },
    iconBox: {
      width: 52,
      height: 52,
      borderRadius: 12,
      background: `${color}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
    },
    label: {
      fontSize: 13,
      color: '#6b7280',
      fontWeight: 500,
      marginBottom: 4,
    },
    value: {
      fontSize: 28,
      fontWeight: 700,
      color: '#111827',
      lineHeight: 1,
    },
    trend: {
      fontSize: 12,
      color: color,
      fontWeight: 600,
      marginTop: 4,
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.iconBox}>{icon}</div>
      <div>
        <div style={styles.label}>{label}</div>
        <div style={styles.value}>{value}</div>
        {trend && <div style={styles.trend}>{trend}</div>}
      </div>
    </div>
  );
};

// Props Validation
StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string,
  trend: PropTypes.string,
};

StatCard.defaultProps = {
  color: '#16a34a',
  trend: null,
};

export default StatCard;
