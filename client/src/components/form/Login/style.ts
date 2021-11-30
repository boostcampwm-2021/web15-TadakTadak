import styled from 'styled-components';
import { FORM } from '@utils/styleConstant';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${FORM.loginWidth}rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: ${FORM.top};
`;

export const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.green};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  width: ${FORM.btnWidth};
  border-radius: ${FORM.btnBorderRadius};
`;

export const ModalToggleSpan = styled.span`
  width: 100%;
  margin-top: ${({ theme }) => theme.margins.lg};
  color: ${({ theme }) => theme.colors.blue};
  text-align: center;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
