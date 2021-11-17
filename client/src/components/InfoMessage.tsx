import styled from 'styled-components';

const MessageWrap = styled.div`
  color: white;
  position: absolute;
  ${({ theme }) => theme.flexCenter}
  text-align: center;
  left: 0;
  right: 0px;
  bottom: -40px;
`;

const MessageBox = styled.div`
  width: 300px;
  background-color: tomato;
  padding: 10px 20px;
  border-radius: 15px;
`;

interface InfoMessageProps {
  message: string;
}

function InfoMessage({ message }: InfoMessageProps): JSX.Element {
  return <MessageWrap>{message && <MessageBox>{message}</MessageBox>}</MessageWrap>;
}

export default InfoMessage;
