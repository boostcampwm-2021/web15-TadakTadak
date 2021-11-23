import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import Tab from '@components/common/Tab';
import ChatList from './ChatList';
import ParticipantList from './ParticipantList';
import { useUser } from '@contexts/userContext';
import socket from '@src/socket';
import { postLeaveRoom } from '@src/apis';

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
  hostNickname: string | undefined;
}

const RoomSideBar = ({ uuid, hostNickname }: RoomSideBarProps): JSX.Element => {
  const { nickname, devField, imageUrl } = useUser();
  const history = useHistory();
  const [tabs, setTabs] = useState({ ...initialTabState });
  const [chats, setChats] = useState<Array<Record<string, string | undefined>>>([]);
  const [participants, setParticipants] = useState({});
  const { isChat, isParticipant } = tabs;

  const onClickChatTap = () => setTabs({ ...initialTabState, isChat: !isChat });
  const onClickParticipantTap = () => setTabs({ ...initialTabState, isParticipant: !isParticipant });

  const leaveSocket = useCallback(() => {
    const leavePayload = { nickname, roomId: uuid };
    socket.emit('leave-room', leavePayload);
    postLeaveRoom(uuid);
  }, [nickname, uuid]);

  const exitRoom = useCallback(() => {
    leaveSocket();
    history.push('/main');
  }, [history, leaveSocket]);

  const registerParticipants = useCallback(
    (userList: { [key: string]: any }) => {
      if (!nickname || !userList[nickname]) {
        return exitRoom();
      }
      setParticipants({ ...userList });
    },
    [nickname, exitRoom],
  );

  const initSocket = useCallback(() => {
    const joinPayload = { nickname, roomId: uuid, field: devField, img: imageUrl };
    socket.emit('join-room', joinPayload);
    socket.on('user-list', registerParticipants);
  }, [nickname, devField, imageUrl, uuid, registerParticipants]);

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
        {isParticipant && <ParticipantList participants={participants} hostNickname={hostNickname} uuid={uuid} />}
      </SideBarBottomMenus>
    </SideBarContainer>
  );
};

export default RoomSideBar;
