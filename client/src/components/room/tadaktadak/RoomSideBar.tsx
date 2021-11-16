import React, { useState } from 'react';
import styled from 'styled-components';
import Tab from '@components/Tab';

const SIDEBAR_MIN_WIDTH = '29rem';
const SIDEBAR_HEIGHT = '100vh';

const SideBarContainer = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${SIDEBAR_MIN_WIDTH};
  min-width: ${SIDEBAR_MIN_WIDTH};
  height: ${SIDEBAR_HEIGHT};
  background-color: ${({ theme }) => theme.colors.white};
`;

const SideBarTopMenus = styled.div``;

const SideBarBottomMenus = styled.div``;

const SideBarTaps = styled.div`
  display: flex;
`;

const initialTabState = {
  isChat: false,
  isParticipant: false,
};

const RoomSideBar: React.FC = () => {
  const [tabs, setTabs] = useState({ ...initialTabState });

  const onClickChatTap = () => setTabs({ ...initialTabState, isChat: !tabs.isChat });
  const onClickParticipantTap = () => setTabs({ ...initialTabState, isParticipant: !tabs.isParticipant });

  return (
    <SideBarContainer>
      <SideBarTopMenus>
        <SideBarTaps>
          <Tab text="채팅" isActive={tabs.isChat} onClick={onClickChatTap} />
          <Tab text="참가자" isActive={tabs.isParticipant} onClick={onClickParticipantTap} />
        </SideBarTaps>
      </SideBarTopMenus>
      <SideBarBottomMenus></SideBarBottomMenus>
    </SideBarContainer>
  );
};

export default RoomSideBar;
