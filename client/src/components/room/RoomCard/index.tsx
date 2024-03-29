import React, { useCallback, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import { SocketEvents } from '@socket/socketEvents';
import socket from '@socket/socket';
import {
  RoomCardWrapper,
  RoomCardTop,
  RoomCardBottom,
  RoomTopMenu,
  RoomTitle,
  RoomFieldType,
  RoomDescription,
  RoomOwnerNickname,
  RoomAdmitNumber,
} from './style';
import { useUser } from '@contexts/userContext';
import { useToast } from '@hooks/useToast';
import { RoomType, TOAST_MESSAGE } from '@utils/constant';
import { RoomInfoType } from '@src/types';
import { getRoomByUuid, postEnterRoom } from '@src/apis';

interface RoomCardProps {
  roomInfo: RoomInfoType;
}

const RoomCard = React.memo(({ roomInfo }: RoomCardProps): JSX.Element => {
  const { uuid, title, description, nowHeadcount, maxHeadcount, roomType, owner } = roomInfo;
  const { login, nickname } = useUser();
  const toast = useToast();
  const roomDataRef = useRef<RoomInfoType>();
  const history = useHistory();

  const verifyBySocket = useCallback(async () => {
    socket.emit(SocketEvents.canIEnter, { uuid, nickname });
  }, [uuid, nickname]);

  const onClickRoomCard = useCallback(async () => {
    if (!login) return toast('error', TOAST_MESSAGE.notAllowedNonLogin);
    const { isOk, data } = await getRoomByUuid(uuid);
    if (isOk && data) {
      if (data.nowHeadcount >= data.maxHeadcount) return;
      roomDataRef.current = data;
      verifyBySocket();
    }
  }, [uuid, login, toast, verifyBySocket]);

  const enterRoom = useCallback(
    (iCanEnter) => {
      if (!iCanEnter) return;
      const pathname = roomType === RoomType.tadak ? `/room/tadak/${uuid}` : `/room/campfire/${uuid}`;
      postEnterRoom(uuid);
      history.push({ pathname, state: roomDataRef.current });
    },
    [history, uuid, roomType, roomDataRef],
  );

  useEffect(() => {
    socket.removeListener(SocketEvents.youCanEnter);
    socket.on(SocketEvents.youCanEnter, enterRoom);
  }, [enterRoom]);

  return (
    <RoomCardWrapper onClick={onClickRoomCard}>
      <RoomCardTop>
        <RoomTopMenu>
          <RoomTitle>{title}</RoomTitle>
          <RoomFieldType bgColor={owner?.devField?.name || 'None'}>{owner?.devField?.name}</RoomFieldType>
        </RoomTopMenu>
        <RoomDescription>{description}</RoomDescription>
      </RoomCardTop>
      <RoomCardBottom>
        <RoomOwnerNickname>호스트 : {owner?.nickname}</RoomOwnerNickname>
        <RoomAdmitNumber>
          {nowHeadcount} / {maxHeadcount}
        </RoomAdmitNumber>
      </RoomCardBottom>
    </RoomCardWrapper>
  );
});

export default RoomCard;
