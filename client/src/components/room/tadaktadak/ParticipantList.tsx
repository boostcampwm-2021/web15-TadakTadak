import { useCallback } from 'react';
import styled, { css } from 'styled-components';
import { FieldName, useUser } from '@src/contexts/userContext';
import socket from '@socket/socket';
import { SocketEvents } from '@socket/socketEvents';
import { useTheme } from '@contexts/themeContext';

interface ParticipantListProps<T> {
  participants: Record<string, T>;
  hostNickname: string | undefined;
  uuid: string;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => theme.flexColumn};
`;

const List = styled.ul`
  width: 100%;
  ${({ theme }) => theme.flexColumn};
  padding: ${({ theme }) => theme.paddings.sm};
`;

const Participant = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.margins.sm};
`;

const Avatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Nickname = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const DevField = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  ${({ theme }) => css`
    margin-left: ${theme.margins.base};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
  `}
`;

const Position = styled.div`
  margin-left: ${({ theme }) => theme.margins.xs};
`;

const GetOutBtn = styled.div`
  ${({ theme }) => css`
    margin-left: ${theme.margins.base};
    padding: ${theme.paddings.xs};
    border-radius: ${theme.borderRadius.sm};
    :hover {
      background-color: ${theme.colors.primary};
    }
  `}
  cursor: pointer;
`;

const ParticipantList = ({
  participants,
  hostNickname,
  uuid,
}: ParticipantListProps<{ field: { id: number; name: FieldName }; img: string }>): JSX.Element => {
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
