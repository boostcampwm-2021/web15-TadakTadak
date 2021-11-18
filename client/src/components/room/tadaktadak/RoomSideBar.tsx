import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Tab from '@components/common/Tab';
import ChatList from './ChatList';
import ParticipantList from './ParticipantList';
import { useUser } from '@contexts/userContext';
import socket from '@src/socket';

const SIDEBAR_MIN_WIDTH = '29rem';
const SIDEBAR_HEIGHT = '100vh';

const SideBarContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: flex;
  flex-direction: column;
  width: ${SIDEBAR_MIN_WIDTH};
  min-width: ${SIDEBAR_MIN_WIDTH};
  height: ${SIDEBAR_HEIGHT};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 9999;
`;

const SideBarTopMenus = styled.div``;

const SideBarBottomMenus = styled.div`
  height: 100%;
`;

const SideBarTabs = styled.div`
  display: flex;
`;

const initialTabState = {
  isChat: false,
  isParticipant: false,
};

interface RoomSideBarProps {
  uuid: string;
}

const RoomSideBar = ({ uuid }: RoomSideBarProps): JSX.Element => {
  const { nickname, devField, imageUrl } = useUser();
  const [tabs, setTabs] = useState({ ...initialTabState });
  const [chats, setChats] = useState<Array<Record<string, string | undefined>>>([]);
  const [participants, setParticipants] = useState({});
  const { isChat, isParticipant } = tabs;

  const onClickChatTap = () => setTabs({ ...initialTabState, isChat: !isChat });
  const onClickParticipantTap = () => setTabs({ ...initialTabState, isParticipant: !isParticipant });

  const initSocket = useCallback(() => {
    const joinPayload = { nickname, roomId: uuid, field: devField, img: imageUrl };
    socket.emit('join-room', joinPayload);
    socket.on('user-list', (data) => setParticipants({ ...data }));
  }, [nickname, devField, imageUrl, uuid]);

  const leaveSocket = useCallback(() => {
    const leavePayload = { nickname, roomId: uuid };
    socket.emit('leave-room', leavePayload);
  }, [nickname, uuid]);

  useEffect(() => {
    initSocket();
    return leaveSocket;
  }, [initSocket, leaveSocket]);

  return (
    <SideBarContainer>
      <SideBarTopMenus>
        <SideBarTabs>
          <Tab text="채팅" isActive={isChat} onClick={onClickChatTap} />
          <Tab text="참가자" isActive={isParticipant} onClick={onClickParticipantTap} />
        </SideBarTabs>
      </SideBarTopMenus>
      <SideBarBottomMenus>
        {isChat && <ChatList chats={chats} uuid={uuid} setChats={setChats} />}
        {isParticipant && <ParticipantList participants={participants} />}
      </SideBarBottomMenus>
    </SideBarContainer>
  );
};

export default RoomSideBar;
