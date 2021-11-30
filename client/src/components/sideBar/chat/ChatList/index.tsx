import React, { useCallback, useEffect, useRef } from 'react';
import { TiDelete } from 'react-icons/ti';
import socket from '@socket/socket';
import { SocketEvents } from '@socket/socketEvents';
import { Container, List, TextAreaWrapper, TextArea, Line, TextResetBtn } from './style';
import ChatCard from '@src/components/sideBar/chat/ChatCard';
import { useUser } from '@contexts/userContext';
import { useTheme } from '@contexts/themeContext';
import useInput from '@hooks/useInput';
import { INPUT, RoomType, PLACEHOLDER_TXT, KEY_PRESS } from '@utils/constant';

interface ChatListProps<T> {
  chats: Array<Record<string, T | undefined>>;
  uuid: string;
  roomType?: string;
  setChats: React.Dispatch<React.SetStateAction<Array<Record<string, T | undefined>>>>;
}

const TextResetBtnStyle = {
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
      if (e.key === KEY_PRESS.enter) {
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
            <ChatCard
              key={idx}
              chat={chat}
              bgChatBox={roomType === RoomType.campfire ? theme.colors.bgChatBox : undefined}
            />
          ))}
      </List>
      <Line />
      <TextAreaWrapper>
        <TextArea
          placeholder={PLACEHOLDER_TXT.chat}
          value={message}
          onChange={onChangeMessage}
          onKeyPress={onKeyPress}
          maxLength={INPUT.chatMaxLen}
        />
        {message && (
          <TextResetBtn>
            <TiDelete style={TextResetBtnStyle} onClick={onResetMessage} />
          </TextResetBtn>
        )}
      </TextAreaWrapper>
    </Container>
  );
};

export default ChatList;
