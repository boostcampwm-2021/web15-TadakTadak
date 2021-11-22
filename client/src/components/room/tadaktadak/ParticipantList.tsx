import { useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';

interface ParticipantListProps<T> {
  participants: Record<string, T>;
}

type FieldName = 'Front-end' | 'Back-end' | 'IOS' | 'Android';

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

const ParticipantList = ({
  participants,
}: ParticipantListProps<{ field: { id: number; name: FieldName }; img: string }>): JSX.Element => {
  const themeContext = useContext(ThemeContext);

  return (
    <Container>
      <List>
        {Object.entries(participants).map(([nickname, { field, img }]) => (
          <Participant key={nickname}>
            <Avatar src={img} />
            <Nickname>{nickname}</Nickname>
            {field && <DevField bgColor={themeContext.tagColors[field.name]}>{field.name}</DevField>}
          </Participant>
        ))}
      </List>
    </Container>
  );
};

export default ParticipantList;
