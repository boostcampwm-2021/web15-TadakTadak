import styled from 'styled-components';

interface ParticipantListProps<T> {
  participants: Record<string, T>;
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

const DevField = styled.div``;

const ParticipantList = ({
  participants,
}: ParticipantListProps<{ field: { id: number; name: string }; img: string }>): JSX.Element => {
  return (
    <Container>
      <List>
        {Object.entries(participants).map(([nickname, { field, img }]) => (
          <Participant key={nickname}>
            <Avatar src={img} />
            <Nickname>{nickname}</Nickname>
            {field && <DevField>{field.name}</DevField>}
          </Participant>
        ))}
      </List>
    </Container>
  );
};

export default ParticipantList;
