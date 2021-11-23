import styled, { css } from 'styled-components';
import { RoomInfo } from './main/RoomList';
import { getRoomByUuid, postEnterRoom } from '@src/apis';
import { useHistory } from 'react-router';
import { useCallback, useEffect, useRef } from 'react';
import socket from '@src/socket';

const ROOM_WIDTH = 20;
const ROOM_HEIGHT = ROOM_WIDTH * 0.75;

const RoomBoxWrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.paddings.base};
  width: 100%;
  height: ${ROOM_HEIGHT}rem;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  -webkit-transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    background: ${({ theme }) => theme.colors.blue};
    transform: scale(0.98);
  }
  &::after {
    content: '';
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    -webkit-transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover::after {
    opacity: 1;
  }
`;

const RoomBoxTop = styled.div`
  width: 100%;
  height: 60%;
  margin-top: ${({ theme }) => theme.margins.base};
  display: flex;
  flex-direction: column;
`;

const RoomTitle = styled.h6`
  display: block;
  width: 100%;
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.normal};
    margin-bottom: ${theme.margins.base};
  `}
`;
const RoomDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  opacity: 0.9;
`;

const RoomBoxBottom = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const RoomType = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.sm};
    background-color: ${theme.colors.blue};
    color: ${theme.colors.white};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
  `}
`;

const RoomAdmitNumber = styled.span``;

interface RoomBoxProps {
  roomInfo: RoomInfo;
}

const RoomBox = ({ roomInfo }: RoomBoxProps): JSX.Element => {
  const { uuid, title, description, nowHeadcount, maxHeadcount } = roomInfo;
  const roomDataRef = useRef<RoomInfo>();
  const history = useHistory();

  const verifyBySocket = useCallback(async () => {
    socket.emit('verify-room', { roomId: uuid });
  }, [uuid]);

  const onClickRoomBox = useCallback(async () => {
    const { isOk, data } = await getRoomByUuid(uuid);
    if (isOk && data) {
      if (data.nowHeadcount >= data.maxHeadcount) return;
      roomDataRef.current = data;
      verifyBySocket();
    }
  }, [uuid, verifyBySocket]);

  const enterRoom = useCallback(() => {
    postEnterRoom(uuid);
    history.push({ pathname: `/room/${uuid}`, state: roomDataRef.current });
  }, [history, uuid, roomDataRef]);

  useEffect(() => {
    socket.removeListener('is-verify');
    socket.on('is-verify', enterRoom);
  }, [enterRoom]);

  return (
    <RoomBoxWrapper onClick={onClickRoomBox}>
      <RoomBoxTop>
        <RoomTitle>{title}</RoomTitle>
        <RoomDescription>{description}</RoomDescription>
      </RoomBoxTop>
      <RoomBoxBottom>
        <RoomType>백엔드</RoomType>
        <RoomAdmitNumber>
          {nowHeadcount} / {maxHeadcount}
        </RoomAdmitNumber>
      </RoomBoxBottom>
    </RoomBoxWrapper>
  );
};

export default RoomBox;
