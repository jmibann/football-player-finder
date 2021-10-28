import React from 'react';

type OptionType = {
  label: string;
  value: string;
}

type SelectProps = {
  options: OptionType[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
  return (
    <select
      className="flex bg-white border border-gray-400 rounded-md mr-4"
      onChange={onChange}
    >
      <option value="" className="flex " disabled selected> --Please choose an option-- </option>
      {
        options?.map(({ value, label }, idx) => (
          <option
            key={`opt-${idx}-${label}`}
            value={value}
            className="flex"
          >
            {label}
          </option>
        ))
      }
    </select >
  )
};

export default Select;