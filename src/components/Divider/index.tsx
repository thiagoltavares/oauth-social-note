import React from 'react';
import './style.css';

const Divider: React.FC = ({ children }) => {
  return (
    <div className="divide-container">
      <div className="divide-border" />
      <span className="divide-content">{children}</span>
      <div className="divide-border" />
    </div>
  );
};

export default Divider;
