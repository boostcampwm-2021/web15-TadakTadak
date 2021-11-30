import { useCallback } from 'react';
import socket from '@socket/socket';
import { SocketEvents } from '@socket/socketEvents';
import { Container, List, Participant, Avatar, Nickname, DevField, Position, GetOutBtn } from './style';
import { useUser } from '@src/contexts/userContext';
import { useTheme } from '@contexts/themeContext';
import { DevFieldType } from '@src/types';

interface ParticipantListProps<T> {
  participants: Record<string, T>;
  hostNickname: string | undefined;
  uuid: string;
}

const ParticipantList = ({
  participants,
  hostNickname,
  uuid,
}: ParticipantListProps<{ field: { id: number; name: DevFieldType }; img: string }>): JSX.Element => {
  const theme = useTheme();
  const user = useUser();

  const onClickGetOutBtn = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const kickNickname = e.currentTarget.getAttribute('data-nickname');
      if (!kickNickname) return;
      socket.emit(SocketEvents.kickUser, { uuid, kickNickname });
    },
    [uuid],
  );

  return (
    <Container>
      <List>
        {Object.entries(participants).map(([nickname, { field, img }]) => (
          <Participant key={nickname}>
            <Avatar src={img} />
            <Nickname>{nickname}</Nickname>
            {field && <DevField bgColor={theme.tagColors[field.name]}>{field.name}</DevField>}
            {hostNickname === nickname && <Position>호스트</Position>}
            {user.nickname === hostNickname && user.nickname !== nickname && (
              <GetOutBtn onClick={onClickGetOutBtn} data-nickname={nickname}>
                추방
              </GetOutBtn>
            )}
          </Participant>
        ))}
      </List>
    </Container>
  );
};

export default ParticipantList;
