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
  font-family: 'monospace', 'Noto Sans KR', sans-serif;
  font-weight: 1000;
  width: 100%;
  height: 3rem;
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-size: ${theme.fontSizes.base};
    padding: ${theme.paddings.sm};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
    background-color: ${theme.colors.white};
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
