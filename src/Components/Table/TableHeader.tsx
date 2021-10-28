import React from 'react';

type TableHeaderType = {
  columns: string[];
}

const TableHeader: React.FC<TableHeaderType> = ({ columns }) => {
  const thClass = "flex w-1/4 justify-center items-center bg-blue-300 h-12 border border-blue-600 border-2";

  return (
    <thead className="flex flex-row w-full border bg-blue-300">
      <tr className="flex flex-row w-full">
        {
          columns?.map((header, idx) =>
            <th key={`tHeader-${idx}`} className={thClass}>
              {header}
            </th>
          )
        }
      </tr>
    </thead >
  )
};

export default TableHeader;