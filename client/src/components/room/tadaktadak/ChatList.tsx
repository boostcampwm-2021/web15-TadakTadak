import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '@contexts/userContext';
import useInput from '@hooks/useInput';
import socket from '@src/socket';

const INPUT_WIDTH = '90%';
const CHAT_LIST_HEIGHT = '90%';
const CHAT_INPUT_HEIGHT = '10%';

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
  height: ${CHAT_LIST_HEIGHT};
  ${({ theme }) => theme.flexColumn};
  padding: ${({ theme }) => theme.paddings.sm};
  overflow: auto;
`;

const InputDiv = styled.div`
  width: 100%;
  height: ${CHAT_INPUT_HEIGHT};
  ${({ theme }) => theme.flexColumn};
  justify-content: end;
  align-items: center;
`;
const Input = styled.input`
  width: ${INPUT_WIDTH};
  height: 5rem;
  padding: ${({ theme }) => theme.paddings.sm};
  border: 2px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: ${({ theme }) => theme.colors.bgWhite};
`;

const Chat = styled.li`
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

const Line = styled.div`
  width: ${INPUT_WIDTH};
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  opacity: 0.4;
  margin: 0 auto;
`;

const ChatList = ({ uuid, chats, setChats }: ChatListProps<string>): JSX.Element => {
  const { nickname } = useUser();
  const [message, onChangeMessage, onResetMessage] = useInput('');

  const sendMessage = useCallback(() => {
    const myMessage = { type: 'string', nickname, message, roomId: uuid };
    socket.emit('msgToServer', myMessage);
    onResetMessage();
  }, [onResetMessage, nickname, message, uuid]);

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage(),
    [sendMessage],
  );

  const handleMessageReceive = useCallback((data) => setChats([...chats, data]), [chats, setChats]);

  useEffect(() => {
    socket.on('msgToClient', handleMessageReceive);
  }, [handleMessageReceive]);

  return (
    <Container>
      <List>
        {chats.length > 0 &&
          Object.values(chats).map((chat, idx) => (
            <Chat key={idx}>
              <ChatNickname>{chat.nickname}</ChatNickname>
              <ChatMesssage>{chat.message}</ChatMesssage>
            </Chat>
          ))}
      </List>
      <Line />
      <InputDiv>
        <Input
          type="text"
          placeholder="Message..."
          value={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
        />
      </InputDiv>
    </Container>
  );
};

export default ChatList;
