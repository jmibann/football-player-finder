import React, { cloneElement, Children } from 'react';

const Table: React.FC<{}> = ({ children }) => {
  return (
    <table className="flex flex-col w-full bg-red-500 h-12">
      {
        Children.map(children, (child: any) => child ? cloneElement(child, {}) : null)
      }
    </table >)
};

export default Table;