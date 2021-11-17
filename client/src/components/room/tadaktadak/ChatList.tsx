import useInput from '@hooks/useInput';
import React, { useCallback } from 'react';
import styled from 'styled-components';

const INPUT_WIDTH = '90%';
const CHAT_LIST_HEIGHT = '90%';
const CHAT_INPUT_HEIGHT = '10%';

interface ChatListProps<T> {
  chats: Array<T>;
  setChats: React.Dispatch<React.SetStateAction<Array<T>>>;
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
  :not(:first-of-type) {
    margin-top: ${({ theme }) => theme.margins.base};
  }
`;

const ChatInfo = styled.p``;

const ChatMesssage = styled.p`
  margin-top: 0.4rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Line = styled.div`
  width: ${INPUT_WIDTH};
  border-top: 1px solid ${({ theme }) => theme.colors.black};
  opacity: 0.4;
  margin: 0 auto;
`;

const ChatList = ({ chats, setChats }: ChatListProps<any>): JSX.Element => {
  const [message, onChangeMessage, onResetMessage] = useInput('');

  const sendMessage = useCallback(() => {
    setChats([...chats, { message }]);
    onResetMessage();
  }, [setChats, onResetMessage, chats, message]);

  const onKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && sendMessage(),
    [sendMessage],
  );

  return (
    <Container>
      <List>
        {chats.length &&
          chats.map((chat) => (
            <Chat>
              <ChatInfo></ChatInfo>
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
