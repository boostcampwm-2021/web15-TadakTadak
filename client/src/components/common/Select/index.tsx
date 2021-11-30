import React from 'react';
import { StyledSelect } from './style';

interface OptionProps {
  value: string | number;
  label: string | number;
}

interface SelectProps {
  name: string;
  className?: string;
  options: OptionProps[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ name, className, options, onChange }: SelectProps): JSX.Element => {
  return (
    <StyledSelect className={className} onChange={onChange} defaultValue="">
      <option value="">{name} 선택</option>
      {options.map(({ value, label }, idx) => (
        <option key={idx} value={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
