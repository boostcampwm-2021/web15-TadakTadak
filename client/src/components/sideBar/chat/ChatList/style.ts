import styled from 'styled-components';
import { CHAT } from '@utils/styleConstant';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flexColumn};
`;

export const List = styled.ul`
  width: 100%;
  height: ${CHAT.listHeight};
  ${({ theme }) => theme.flexColumn};
  padding: ${({ theme }) => theme.paddings.sm};
  overflow: auto;
  white-space: pre-wrap;
`;

export const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${CHAT.inputHeight};
  ${({ theme }) => theme.flexColumn};
  justify-content: end;
  align-items: center;
`;

export const TextArea = styled.textarea`
  width: ${CHAT.inputWidth};
  height: 6rem;
  min-height: 4rem;
  max-height: 7.5rem;
  font-size: ${CHAT.fontSize};
  padding: ${({ theme }) => theme.paddings.sm};
  border: 2px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: transparent;
  resize: vertical;
  ::placeholder {
    font-size: ${CHAT.fontSize};
  }
`;

export const Line = styled.div`
  width: ${CHAT.inputWidth};
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  opacity: 0.4;
  margin: 0 auto;
`;

export const TextResetBtn = styled.span`
  position: absolute;
  bottom: 1rem;
  right: 3rem;
  .icon:hover {
    opacity: 0.9;
  }
`;
