import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import SideBar from '@components/common/SideBar';
import Tab from '@components/common/Tab';
import ChatList from './ChatList';
import ParticipantList from './ParticipantList';
import { useUser } from '@contexts/userContext';
import { useTheme } from '@contexts/themeContext';
import socket from '@socket/socket';
import { postLeaveRoom } from '@src/apis';
import { SocketEvents } from '@socket/socketEvents';
import { RoomType } from '@utils/constant';
import { useClient } from './videoConfig';

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
  maxHeadcount: number;
  roomType?: string;
}

const RoomSideBar = ({ uuid, hostNickname, maxHeadcount, roomType }: RoomSideBarProps): JSX.Element => {
  const { nickname, devField, imageUrl } = useUser();
  const theme = useTheme();
  const client = useClient();
  const history = useHistory();
  const [tabs, setTabs] = useState({ ...initialTabState });
  const [chats, setChats] = useState<Array<Record<string, string | undefined>>>([]);
  const [participants, setParticipants] = useState({});
  const { isChat, isParticipant } = tabs;

  const onClickChatTap = () => setTabs({ ...initialTabState, isChat: !isChat });
  const onClickParticipantTap = () => setTabs({ ...initialTabState, isParticipant: !isParticipant });

  const leaveSocket = useCallback(() => {
    const leavePayload = { nickname, uuid };
    socket.emit(SocketEvents.leaveRoom, leavePayload);
    postLeaveRoom(uuid);
  }, [nickname, uuid]);

  const exitRoom = useCallback(() => {
    client.removeAllListeners();
    client.leave();
    history.replace('/main');
  }, [history, client]);

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
    const joinPayload = { nickname, uuid, field: devField, img: imageUrl, maxHead: maxHeadcount };
    socket.emit(SocketEvents.joinRoom, joinPayload);
    socket.on(SocketEvents.receiveUserList, registerParticipants);
  }, [nickname, devField, imageUrl, uuid, maxHeadcount, registerParticipants]);

  useEffect(() => {
    initSocket();
    return leaveSocket;
  }, [initSocket, leaveSocket]);

  return (
    <SideBar
      topMenus={
        <SideBarTabs>
          <Tab text="채팅" isActive={isChat} onClick={onClickChatTap} />
          <Tab text="참가자" isActive={isParticipant} onClick={onClickParticipantTap} />
        </SideBarTabs>
      }
      bottomMenus={
        <>
          {isChat && <ChatList chats={chats} uuid={uuid} setChats={setChats} roomType={roomType} />}
          {isParticipant && <ParticipantList participants={participants} hostNickname={hostNickname} uuid={uuid} />}
        </>
      }
      bottomMenuHeight={'100%'}
      bgColor={roomType === RoomType.campfire ? theme.colors.bgCampfire : undefined}
      borderColor={roomType === RoomType.campfire ? 'transparent' : undefined}
    />
  );
};

export default RoomSideBar;
