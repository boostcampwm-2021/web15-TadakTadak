import React from 'react';
import styled from 'styled-components';

const ChatContainer = styled.li`
  display: flex;
  :not(:first-of-type) {
    margin-top: ${({ theme }) => theme.margins.base};
  }
`;

const ChatNickname = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const ChatMesssage = styled.p`
  width: 100%;
  margin-left: ${({ theme }) => theme.margins.base};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

interface ChatProps {
  chat: Record<string, string | undefined>;
}

const Chat = React.memo(({ chat }: ChatProps): JSX.Element => {
  return (
    <ChatContainer>
      <ChatNickname>{chat.nickname ?? 'Anonymous'}</ChatNickname>
      <ChatMesssage>{chat.message}</ChatMesssage>
    </ChatContainer>
  );
});

export default Chat;
