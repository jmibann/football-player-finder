import React from 'react';

type InputProps = {
  placeholder?: string;
  name: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({ placeholder = '', value, onChange, name, onKeyDown }) => {
  const inputClass = "flex w-full content-center justify-around border border-gray-400 rounded-md mr-4 px-1"

  return (
    <input
      className={inputClass}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      onKeyDown={onKeyDown}
    />
  )
};

export default Input;