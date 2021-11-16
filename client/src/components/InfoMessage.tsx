import styled from 'styled-components';

const MessageWrap = styled.div`
  color: white;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  left: 0;
  right: 0px;
  top: 60px;
`;

const MessageBox = styled.div`
  width: 300px;
  background-color: tomato;
  padding: 10px 20px;
  border-radius: 15px;
`;

function InfoMessage({ message }: { message: string }): JSX.Element {
  return <MessageWrap>{message && <MessageBox>{message}</MessageBox>}</MessageWrap>;
}

export default InfoMessage;
