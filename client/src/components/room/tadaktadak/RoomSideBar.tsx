import React, { useState } from 'react';
import styled from 'styled-components';
import Tab from '@components/Tab';
import ChatList from './ChatList';
import ParticipantList from './ParticipantList';

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

const RoomSideBar: React.FC = () => {
  const [tabs, setTabs] = useState({ ...initialTabState });
  const [chats, setChats] = useState([{ message: 'hello' }, { message: 'hi' }]);
  const [participants, setParticipants] = useState([
    { nickname: 'Tom' },
    { nickname: 'James' },
    { nickname: 'Work' },
    { nickname: 'Bob' },
  ]);
  const { isChat, isParticipant } = tabs;

  const onClickChatTap = () => setTabs({ ...initialTabState, isChat: !isChat });
  const onClickParticipantTap = () => setTabs({ ...initialTabState, isParticipant: !isParticipant });

  return (
    <SideBarContainer>
      <SideBarTopMenus>
        <SideBarTabs>
          <Tab text="채팅" isActive={isChat} onClick={onClickChatTap} />
          <Tab text="참가자" isActive={isParticipant} onClick={onClickParticipantTap} />
        </SideBarTabs>
      </SideBarTopMenus>
      <SideBarBottomMenus>
        {isChat && <ChatList chats={chats} setChats={setChats} />}
        {isParticipant && <ParticipantList participants={participants} />}
      </SideBarBottomMenus>
    </SideBarContainer>
  );
};

export default RoomSideBar;
