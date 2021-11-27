import React from 'react';
import styled, { css } from 'styled-components';
import { CHAT } from '@utils/styleConstant';
import { chatTimeFormatting } from '@src/utils/utils';

const ChatContainer = styled.li<{ bgChatBox?: string }>`
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
const ChatTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChatNickname = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ChatTime = styled.span`
  color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
`;

const ChatMesssage = styled.p`
  width: ${CHAT.msgWidth};
  margin-left: ${({ theme }) => theme.margins.xl};
  font-size: ${CHAT.fontSize};
  overflow: hidden;
`;

interface ChatProps {
  chat: Record<string, string | undefined>;
  bgChatBox?: string;
}

const Chat = React.memo(({ chat, bgChatBox }: ChatProps): JSX.Element => {
  const chatTime = chatTimeFormatting(chat.time);

  return (
    <ChatContainer bgChatBox={bgChatBox}>
      <ChatTitle>
        <ChatNickname>{chat.nickname ?? 'Anonymous'} :</ChatNickname>
        <ChatTime>{chatTime}</ChatTime>
      </ChatTitle>
      <ChatMesssage>{chat.message}</ChatMesssage>
    </ChatContainer>
  );
});

export default Chat;
