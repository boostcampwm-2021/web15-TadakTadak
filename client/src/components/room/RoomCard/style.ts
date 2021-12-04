import styled, { css } from 'styled-components';
import { ROOM_CARD } from '@utils/styleConstant';
import { DevFieldType } from '@src/types';

export const RoomCardWrapper = styled.div`
  ${({ theme }) => theme.flexCenter};
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.paddings.base};
  min-width: 15rem;
  width: 100%;
  height: ${ROOM_CARD.height}rem;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  cursor: pointer;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  -webkit-transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  &:hover {
    transform: scale(1.02);
  }
  &:active {
    background: ${({ theme }) => theme.colors.blue};
    transform: scale(0.98);
  }
  &::after {
    content: '';
    border-radius: 5px;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
    -webkit-transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition: all 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  &:hover::after {
    opacity: 1;
  }
`;

export const RoomCardTop = styled.div`
  width: 100%;
  height: 60%;
  margin-top: ${({ theme }) => theme.margins.base};
  display: flex;
  flex-direction: column;
`;

export const RoomTopMenu = styled.div`
  display: flex;
`;

export const RoomTitle = styled.h6`
  display: block;
  width: 100%;
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.xl};
    font-weight: ${theme.fontWeights.normal};
    margin-bottom: ${theme.margins.base};
  `}
`;

export const RoomDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  opacity: 0.9;
`;

export const RoomCardBottom = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const RoomFieldType = styled.div<{ bgColor: DevFieldType }>`
  min-width: 5.1rem;
  width: 6rem;
  height: 2rem;
  ${({ theme, bgColor }) => css`
    ${theme.flexCenter};
    font-size: ${theme.fontSizes.sm};
    background-color: ${theme.colors.blue};
    padding: ${theme.paddings.sm};
    border-radius: ${theme.borderRadius.sm};
    background-color: ${theme.tagColors[bgColor]};
  `}
`;

export const RoomOwnerNickname = styled.span`
  color: ${({ theme }) => theme.colors.green};
`;

export const RoomAdmitNumber = styled.span``;
