import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';
import { useUser } from '@contexts/userContext';
import { useTheme } from '@contexts/themeContext';
import useInput from '@hooks/useInput';
import socket from '@socket/socket';
import Chat from './Chat';
import { INPUT, RoomType } from '@utils/constant';
import { CHAT } from '@utils/styleConstant';
import { SocketEvents } from '@socket/socketEvents';

interface ChatListProps<T> {
  chats: Array<Record<string, T | undefined>>;
  uuid: string;
  roomType?: string;
  setChats: React.Dispatch<React.SetStateAction<Array<Record<string, T | undefined>>>>;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flexColumn};
`;

const List = styled.ul`
  width: 100%;
  height: ${CHAT.listHeight};
  ${({ theme }) => theme.flexColumn};
  padding: ${({ theme }) => theme.paddings.sm};
  overflow: auto;
  white-space: pre-wrap;
`;

const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${CHAT.inputHeight};
  ${({ theme }) => theme.flexColumn};
  justify-content: end;
  align-items: center;
`;

const TextArea = styled.textarea`
  width: ${CHAT.inputWidth};
  height: 6rem;
  font-size: ${CHAT.fontSize};
  padding: ${({ theme }) => theme.paddings.sm};
  border: 2px solid ${({ theme }) => theme.colors.borderGrey};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  background-color: transparent;
  ::placeholder {
    font-size: ${CHAT.fontSize};
  }
`;

const Line = styled.div`
  width: ${CHAT.inputWidth};
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  opacity: 0.4;
  margin: 0 auto;
`;

const InitBtn = styled.span`
  position: absolute;
  bottom: 1rem;
  right: 3rem;
  .icon:hover {
    opacity: 0.9;
  }
`;

const InitBtnStyle = {
  fill: 'grey',
  opacity: 0.7,
  fontSize: '2.2rem',
  cursor: 'pointer',
};

const ChatList = ({ uuid, chats, setChats, roomType }: ChatListProps<string>): JSX.Element => {
  const { nickname } = useUser();
  const theme = useTheme();
  const [message, onChangeMessage, onResetMessage] = useInput('');
  const scrollRef = useRef<HTMLUListElement>(null);

  const sendMessage = useCallback(() => {
    if (!message) return;
    const myMessage = { type: 'string', nickname, message, uuid };
    socket.emit(SocketEvents.sendMsg, myMessage);
    onResetMessage();
  }, [onResetMessage, nickname, message, uuid]);

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      }
    },
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
        {chats.length > 0 &&
          Object.values(chats).map((chat, idx) => (
            <Chat
              key={idx}
              chat={chat}
              bgChatBox={roomType === RoomType.campfire ? theme.colors.bgChatBox : undefined}
            />
          ))}
      </List>
      <Line />
      <TextAreaWrapper>
        <TextArea
          placeholder="Message..."
          value={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
          maxLength={INPUT.chatMaxLen}
        />
        {message && (
          <InitBtn>
            <TiDelete style={InitBtnStyle} onClick={onResetMessage} />
          </InitBtn>
        )}
      </TextAreaWrapper>
    </Container>
  );
};

export default ChatList;
