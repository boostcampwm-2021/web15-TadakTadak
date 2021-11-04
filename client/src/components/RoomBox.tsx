import styled from 'styled-components';

const ROOM_WIDTH = 20;
const ROOM_HEIGHT = ROOM_WIDTH * 0.75;

const RoomContainer = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  width: ${ROOM_WIDTH}rem;
  height: ${ROOM_HEIGHT}rem;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.bold};
  }
  &:active {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scale(0.9);
    transition: background 0.1s;
  }
`;

const RoomTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.title};
  margin-bottom: ${({ theme }) => theme.margins.base};
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
      <RoomTitle>{roomName}</RoomTitle>
      <p>참가하기</p>
    </RoomContainer>
  );
};

export default RoomBox;
