import styled, { css } from 'styled-components';
import { CHAT } from '@utils/styleConstant';

export const Container = styled.li<{ bgChatBox?: string }>`
  display: flex;
  flex-direction: column;
  background-color: #ebf1f3;
  ${({ bgChatBox }) =>
    bgChatBox &&
    css`
      background-color: ${bgChatBox};
    `}
  padding: ${({ theme }) => theme.paddings.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  :not(:first-of-type) {
    margin-top: ${({ theme }) => theme.margins.base};
  }
`;
export const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Nickname = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const Time = styled.span`
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
`;

export const Message = styled.p`
  width: ${CHAT.msgWidth};
  margin-left: ${({ theme }) => theme.margins.xl};
  font-size: ${CHAT.fontSize};
  overflow: hidden;
`;
