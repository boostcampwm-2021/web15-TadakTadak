import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Tabs } from './style';
import { SocketEvents } from '@socket/socketEvents';
import socket from '@socket/socket';
import ParticipantList from '@components/sideBar/ParticipantList';
import ChatList from '@src/components/sideBar/chat/ChatList';
import SideBar from '@components/sideBar/SideBar';
import Tab from '@components/common/Tab';
import { useUser } from '@contexts/userContext';
import { useTheme } from '@contexts/themeContext';
import { useClient } from '@components/video/config';
import { postLeaveRoom } from '@src/apis';
import { PATH, RoomType, TabType } from '@utils/constant';
import { SIDEBAR } from '@utils/styleConstant';
import { ParticipantType } from '@src/types';

const initialTabState = {
  isChat: false,
  isParticipant: true,
};

interface ParticipantsProps {
  [key: string]: ParticipantType;
}

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
  const isKicked = useRef(false);

  const onClickChatTap = () => setTabs({ isChat: true, isParticipant: false });
  const onClickParticipantTap = () => setTabs({ isChat: false, isParticipant: true });

  const leaveSocket = useCallback(() => {
    if (!isKicked.current) {
      socket.emit(SocketEvents.leaveRoom, { uuid });
    }
    socket.removeAllListeners();
    postLeaveRoom(uuid);
  }, [uuid]);

  const leaveAgora = useCallback(() => {
    client.removeAllListeners();
    client.leave();
  }, [client]);

  const exitRoom = useCallback(() => {
    leaveAgora();
    history.replace(PATH.main);
  }, [history, leaveAgora]);

  const registerParticipants = useCallback(
    (userList: ParticipantsProps) => {
      if (!nickname || !userList[socket.id]) {
        isKicked.current = true;
        return exitRoom();
      }
      setParticipants({ ...userList });
    },
    [nickname, exitRoom],
  );

  const initSocket = useCallback(() => {
    if (!nickname) return;
    const joinPayload = { nickname, uuid, field: devField, img: imageUrl, maxHead: maxHeadcount };
    socket.emit(SocketEvents.joinRoom, joinPayload);
    socket.on(SocketEvents.receiveUserList, registerParticipants);
  }, [nickname, devField, imageUrl, uuid, maxHeadcount, registerParticipants]);

  useEffect(() => {
    initSocket();
    return leaveSocket;
  }, [initSocket, leaveSocket, uuid, isKicked]);

  return (
    <SideBar
      topMenus={
        <Tabs>
          <Tab text={TabType.chat} isActive={isChat} onClick={onClickChatTap} />
          <Tab text={TabType.participant} isActive={isParticipant} onClick={onClickParticipantTap} />
        </Tabs>
      }
      bottomMenus={
        <>
          {isChat && <ChatList chats={chats} uuid={uuid} setChats={setChats} roomType={roomType} />}
          {isParticipant && <ParticipantList participants={participants} hostNickname={hostNickname} uuid={uuid} />}
        </>
      }
      bottomMenuHeight={SIDEBAR.RoomBottomMenuHeight}
      bgColor={roomType === RoomType.campfire ? theme.colors.bgCampfire : undefined}
      borderColor={roomType === RoomType.campfire ? 'transparent' : undefined}
    />
  );
};

export default RoomSideBar;
