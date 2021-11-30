import styled from 'styled-components';

export const Container = styled.div`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  width: 60%;
`;

export const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.green};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 100%;
  color: white;
  border-radius: 1rem;
`;
