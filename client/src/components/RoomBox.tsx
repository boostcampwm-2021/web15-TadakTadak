import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RoomInfo } from '@pages/Main/Main';

const ROOM_WIDTH = 20;
const ROOM_HEIGHT = ROOM_WIDTH * 0.75;

const RoomLink = styled(Link)`
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

interface RoomBoxProps {
  roomInfo: RoomInfo;
}

const RoomBox = ({ roomInfo }: RoomBoxProps): JSX.Element => {
  return (
    <RoomLink to={{ pathname: `/room/${roomInfo.roomUid}`, state: roomInfo }}>
      <RoomTitle>{roomInfo.roomName}</RoomTitle>
      <p>참가하기</p>
    </RoomLink>
  );
};

export default RoomBox;
