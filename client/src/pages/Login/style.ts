import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.paddings.sm};
  width: 16rem;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
`;
