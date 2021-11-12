import React from 'react';
import styled, { css } from 'styled-components';

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

const StyledSelect = styled.select`
  border: none;
  font-family: 'monospace', 'Noto Sans KR', sans-serif;
  font-weight: 1000;
  width: 30rem;
  height: 5rem;
  background: transparent;
  ${({ theme }) => css`
    padding: ${theme.fontSizes.sm};
    color: ${theme.colors.white};
    font-size: ${theme.fontSizes.base};
    ${theme.flexCenter}
  `}
  &:hover {
  }
  &:active {
  }
  &:focus {
  }
  &:disabled {
  }
`;

const Select: React.FC<SelectProps> = (props) => {
  const { name, className, options, onChange } = props;

  return (
    <StyledSelect className={className} onChange={onChange}>
      <option value="default" disabled>
        {name} 선택
      </option>
      {options.map(({ value, label }, idx) => (
        <option key={idx} value={value}>
          {label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
