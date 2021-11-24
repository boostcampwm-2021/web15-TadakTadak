import { useState } from 'react';
import styled, { css } from 'styled-components';
import { TabState } from './RoomList';
import { getRoom } from '@src/apis';
import { getRoomQueryObj } from '@src/utils/apiUtils';
import { RoomInfo } from './RoomList';

interface SearchBarProps {
  tabState: TabState;
  setRooms: React.Dispatch<React.SetStateAction<RoomInfo[]>>;
}

interface SearchBtnProps {
  search: string;
}

const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-evenly;
`;

const SearchBtn = styled.button<SearchBtnProps>`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.base};
    background-color: ${theme.colors.green};
    width: ${theme.buttonSizes.lg};
    padding: ${theme.paddings.sm};
    color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.base};
  `}
  opacity: 0.5;
  cursor: not-allowed;
  ${(props) =>
    props.search &&
    css`
      cursor: pointer;
      opacity: 1;
      :hover {
        opacity: 0.9;
      }
      ${({ theme }) => theme.active};
    `}
`;

const InitBtn = styled.button`
  ${({ theme }) => theme.flexCenter}
  ${({ theme }) => css`
    font-size: ${theme.fontSizes.base};
    background-color: ${theme.colors.blue2};
    width: ${theme.buttonSizes.lg};
    padding: ${theme.paddings.sm};
    color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.base};
    margin-left: ${theme.margins.sm};
  `}
  :hover {
    opacity: 0.9;
  }
  ${({ theme }) => theme.active};
`;

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  width: ${({ theme }) => theme.buttonSizes.xl};
`;

function SearchBar({ tabState, setRooms }: SearchBarProps): JSX.Element {
  const [search, setSearch] = useState('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  const onClickInit = () => setSearch('');
  const handleSearchRoom = async () => {
    const type = tabState.tadak ? '타닥타닥' : '캠프파이어';
    const queryObj = getRoomQueryObj(type, search, 1);
    const { isOk, data } = await getRoom(queryObj);
    if (isOk && data) {
      setRooms([...data.results]);
    }
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearchRoom();
  };
  return (
    <Form onSubmit={onSubmitForm}>
      <Input type="text" onChange={onChangeInput} value={search} placeholder="방 제목을 검색하세요." />
      <SearchBtn search={search}>검색하기</SearchBtn>
      <InitBtn onClick={onClickInit}>초기화</InitBtn>
    </Form>
  );
}

export default SearchBar;
