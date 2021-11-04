import styled from 'styled-components';

const ROOM_WIDTH = 20;
const ROOM_HEIGHT = ROOM_WIDTH * 0.75;

const RoomContainer = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.secondary};
  width: ${ROOM_WIDTH}rem;
  height: ${ROOM_HEIGHT}rem;
  border-radius: 2rem;
  cursor: pointer;
`;

const RoomBox = (props: {
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
  setChannelName: React.Dispatch<React.SetStateAction<string>>;
  roomInfo: {
    channelName: string;
    roomName: string;
  };
}): JSX.Element => {
  const {
    setInCall,
    setChannelName,
    roomInfo: { channelName, roomName },
  } = props;
  const onClick = () => {
    setChannelName(channelName);
    setInCall(true);
  };

  return (
    <RoomContainer onClick={onClick}>
      <p>{roomName}</p>
      <p>참가하기</p>
    </RoomContainer>
  );
};

export default RoomBox;
