import styled from 'styled-components';

const MessageWrap = styled.div`
  color: white;
  position: absolute;
  ${({ theme }) => theme.flexCenter}
  text-align: center;
  left: 0;
  right: 0px;
  bottom: -4rem;
`;

const MessageBox = styled.div`
  width: 100%;
  background-color: tomato;
  padding: 1rem 2rem;
  border-radius: 1.5rem;
`;

interface InfoMessageProps {
  message: string;
}

function InfoMessage({ message }: InfoMessageProps): JSX.Element {
  return <MessageWrap>{message && <MessageBox>{message}</MessageBox>}</MessageWrap>;
}

export default InfoMessage;
