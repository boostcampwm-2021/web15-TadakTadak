import styled from 'styled-components';

export const SearchBarForm = styled.form`
  ${({ theme }) => theme.flexCenter}
  justify-content: space-evenly;
  position: relative;
`;

export const SearchBarInitBtn = styled.span`
  .icon:hover {
    opacity: 0.8;
  }
`;

export const SearchBarInput = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  width: ${({ theme }) => theme.buttonSizes.xl};
`;
