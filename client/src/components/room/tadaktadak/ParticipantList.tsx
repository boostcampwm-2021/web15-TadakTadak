import styled from 'styled-components';

interface ParticipantListProps<T> {
  participants: Array<T>;
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
  margin-bottom: ${({ theme }) => theme.margins.sm};
`;

const ParticipantList = ({ participants }: ParticipantListProps<any>): JSX.Element => {
  return (
    <Container>
      <List>
        {participants.map(({ nickname }, idx) => (
          <Participant key={idx}>{nickname}</Participant>
        ))}
      </List>
    </Container>
  );
};

export default ParticipantList;
