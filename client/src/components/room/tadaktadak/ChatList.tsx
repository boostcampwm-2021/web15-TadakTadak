import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useUser } from '@contexts/userContext';
import useInput from '@hooks/useInput';
import socket from '@socket/socket';
import Chat from './Chat';
import { INPUT, CHAT } from '@src/utils/constant';
import { SocketEvents } from '@socket/socketEvents';

interface ChatListProps<T> {
  chats: Array<Record<string, T | undefined>>;
  uuid: string;
  setChats: React.Dispatch<React.SetStateAction<Array<Record<string, T | undefined>>>>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flexColumn};
`;

const List = styled.ul`
  width: 100%;
  height: ${CHAT.LIST_HEIGHT};
  ${({ theme }) => theme.flexColumn};
  padding: ${({ theme }) => theme.paddings.sm};
  overflow: auto;
`;

const InputDiv = styled.div`
  width: 100%;
  height: ${CHAT.INPUT_HEIGHT};
  ${({ theme }) => theme.flexColumn};
  justify-content: end;
  align-items: center;
`;
const Input = styled.input`
  width: ${CHAT.INPUT_WIDTH};
  height: 5rem;
  padding: ${({ theme }) => theme.paddings.sm};
  border: 2px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.bgWhite};
`;

const Line = styled.div`
  width: ${CHAT.INPUT_WIDTH};
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  opacity: 0.4;
  margin: 0 auto;
`;

const ChatList = ({ uuid, chats, setChats }: ChatListProps<string>): JSX.Element => {
  const { nickname } = useUser();
  const [message, onChangeMessage, onResetMessage] = useInput('');
  const scrollRef = useRef<HTMLUListElement>(null);

  const sendMessage = useCallback(() => {
    if (!message) return;
    const myMessage = { type: 'string', nickname, message, uuid };
    socket.emit(SocketEvents.sendMsg, myMessage);
    onResetMessage();
  }, [onResetMessage, nickname, message, uuid]);

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage(),
    [sendMessage],
  );

  const handleMessageReceive = useCallback((chat) => setChats((prevState) => [...prevState, chat]), [setChats]);

  useEffect(() => {
    socket.removeListener(SocketEvents.receiveMsg);
    socket.on(SocketEvents.receiveMsg, handleMessageReceive);
  }, [handleMessageReceive]);

  useEffect(() => {
    const { current } = scrollRef;
    if (current !== null) {
      current.scrollTop = current.scrollHeight;
    }
  }, [chats]);

  return (
    <Container>
      <List ref={scrollRef}>
        {chats.length > 0 && Object.values(chats).map((chat, idx) => <Chat key={idx} chat={chat} />)}
      </List>
      <Line />
      <InputDiv>
        <Input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
          maxLength={INPUT.CHAT_MAX_LENGTH}
        />
      </InputDiv>
    </Container>
  );
};

export default ChatList;
