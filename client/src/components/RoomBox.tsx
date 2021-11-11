import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
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
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
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
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.lg};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.margins.base};
  `}
`;
const RoomDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  opacity: 0.9;
`;

const RoomEnter = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  position: absolute;
  bottom: ${({ theme }) => theme.margins.lg}; ;
`;

interface RoomBoxProps {
  roomInfo: RoomInfo;
}

const RoomBox = ({ roomInfo }: RoomBoxProps): JSX.Element => {
  return (
    <RoomLink to={{ pathname: `/room/${roomInfo.uuid}`, state: roomInfo }}>
      <RoomTitle>{roomInfo.title}</RoomTitle>
      <RoomDescription>{roomInfo.description}</RoomDescription>
      <RoomEnter>참가하기</RoomEnter>
    </RoomLink>
  );
};

export default RoomBox;
