import React from 'react';
import { Container, Title, Nickname, Time, Message } from './style';
import { chatTimeFormatting } from '@utils/utils';

interface ChatProps {
  chat: Record<string, string | undefined>;
  bgChatBox?: string;
}

const ChatCard = React.memo(({ chat, bgChatBox }: ChatProps): JSX.Element => {
  const { time, nickname, message } = chat;
  const chatTime = chatTimeFormatting(time);

  return (
    <Container bgChatBox={bgChatBox}>
      <Title>
        <Nickname>{nickname ?? 'Anonymous'} :</Nickname>
        <Time>{chatTime}</Time>
      </Title>
      <Message>{message}</Message>
    </Container>
  );
});

export default ChatCard;
