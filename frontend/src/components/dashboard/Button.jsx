import React from "react";

const Button = ({ 
  title, 
  onClick, 
  type = "button", 
  className = "", 
  disabled = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer text-white font-semibold px-4 py-2 mt-2 rounded-lg transition ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {title}
    </button>
  );
};

export default Button;
