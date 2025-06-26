import React from 'react';
import './style.css';

const Button = ({ 
  children = "", 
  onClick, 
  className = "",
  disabled = false,
  ...props 
}) => {
  return (
    <button
      className={`gradient-button ${className}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;