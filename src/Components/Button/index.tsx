import React from 'react';

const Button: React.FC<{}> = ({ children }) => {
  return (
    <button className="border p-2 rounded-md bg-red-300 hover:bg-red-400">
      {children}
    </button>
  )
};

export default Button;