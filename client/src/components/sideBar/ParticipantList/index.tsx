import { useCallback } from 'react';
import socket from '@socket/socket';
import { SocketEvents } from '@socket/socketEvents';
import { Container, List, Participant, Avatar, Nickname, DevField, Position, GetOutBtn } from './style';
import { useUser } from '@src/contexts/userContext';
import { useTheme } from '@contexts/themeContext';
import { ParticipantType } from '@src/types';
import { useToast } from '@hooks/useToast';
import { TOAST_MESSAGE } from '@utils/constant';

interface ParticipantListProps<T> {
  participants: Record<string, T>;
  hostNickname: string | undefined;
  uuid: string;
}

const ParticipantList = ({ participants, hostNickname, uuid }: ParticipantListProps<ParticipantType>): JSX.Element => {
  const theme = useTheme();
  const user = useUser();
  const toast = useToast();

  const onClickGetOutBtn = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const kickNickname = e.currentTarget.getAttribute('data-nickname');
      if (!kickNickname) return;
      socket.emit(SocketEvents.kickUser, { uuid, kickNickname });
    },
    [uuid],
  );
  const onClickHost = () => toast('easterEggRoom', TOAST_MESSAGE.introduceHost);
  const onClickMe = (name: string) => {
    if (name === hostNickname) toast('easterEggRoom', TOAST_MESSAGE.narcissism);
  };

  return (
    <Container>
      <List>
        {Object.values(participants).map(({ nickname, field, img }) => (
          <Participant key={nickname}>
            <Avatar src={img} />
            <Nickname onClick={() => onClickMe(nickname)}>{nickname}</Nickname>
            {field && <DevField bgColor={theme.tagColors[field.name]}>{field.name}</DevField>}
            {hostNickname === nickname && <Position onClick={onClickHost}>호스트</Position>}
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
