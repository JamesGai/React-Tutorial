import React from "react";

const Square = ({ value, handleClick }) => {
  return (
    <button className="Square" onClick={handleClick}>
      {value}
    </button>
  );
};

export default Square;
