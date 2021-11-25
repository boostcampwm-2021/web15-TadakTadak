import React from 'react';
import styled from 'styled-components';
import { CHAT } from '@utils/styleConstant';

const ChatContainer = styled.li`
  display: flex;
  flex-direction: column;
  :not(:first-of-type) {
    margin-top: ${({ theme }) => theme.margins.base};
  }
`;

const ChatNickname = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ChatMesssage = styled.p`
  width: ${CHAT.msgWidth};
  margin-left: ${({ theme }) => theme.margins.xl};
  font-size: ${CHAT.fontSize};
  overflow: hidden;
`;

interface ChatProps {
  chat: Record<string, string | undefined>;
}

const Chat = React.memo(({ chat }: ChatProps): JSX.Element => {
  return (
    <ChatContainer>
      <ChatNickname>{chat.nickname ?? 'Anonymous'} :</ChatNickname>
      <ChatMesssage>{chat.message}</ChatMesssage>
    </ChatContainer>
  );
});

export default Chat;
