import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { RoomInfo } from '@pages/Main/Main';

const ROOM_WIDTH = 20;
const ROOM_HEIGHT = ROOM_WIDTH * 0.75;

const RoomLink = styled(Link)`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.paddings.base};
  width: ${ROOM_WIDTH}rem;
  height: ${ROOM_HEIGHT}rem;
  border-radius: ${({ theme }) => theme.borderRadius.base};
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

const RoomBoxTop = styled.div`
  width: 100%;
  height: 60%;
  margin-top: ${({ theme }) => theme.margins.base};
  display: flex;
  flex-direction: column;
`;

const RoomTitle = styled.h6`
  display: block;
  width: 100%;
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.base};
    font-weight: ${theme.fontWeights.bold};
    margin-bottom: ${theme.margins.base};
  `}
`;
const RoomDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.9;
`;

const RoomBoxBottom = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const RoomType = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.sm};
    background-color: ${theme.colors.red};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
  `}
`;

const RoomAdmitNumber = styled.span``;

interface RoomBoxProps {
  roomInfo: RoomInfo;
}

const RoomBox = ({ roomInfo }: RoomBoxProps): JSX.Element => {
  const { uuid, title, description, nowHeadcount, maxHeadcount } = roomInfo;
  return (
    <RoomLink to={{ pathname: `/room/${uuid}`, state: roomInfo }}>
      <RoomBoxTop>
        <RoomTitle>{title}</RoomTitle>
        <RoomDescription>{description}</RoomDescription>
      </RoomBoxTop>
      <RoomBoxBottom>
        <RoomType>백엔드</RoomType>
        <RoomAdmitNumber>
          {nowHeadcount} / {maxHeadcount}
        </RoomAdmitNumber>
      </RoomBoxBottom>
    </RoomLink>
  );
};

export default RoomBox;
