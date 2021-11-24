import { useState, useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import { TabState } from './RoomList';
import { getRoom } from '@src/apis';
import { getRoomQueryObj } from '@src/utils/apiUtils';
import { RoomInfo } from './RoomList';
import { TiDelete } from 'react-icons/ti';

interface SearchBarProps {
  tabState: TabState;
  setRooms: React.Dispatch<React.SetStateAction<RoomInfo[]>>;
}

const Form = styled.form`
  ${({ theme }) => theme.flexCenter}
  justify-content: space-evenly;
  position: relative;
`;

const InitBtn = styled.span`
  .icon:hover {
    opacity: 0.8;
  }
`;

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  width: ${({ theme }) => theme.buttonSizes.xl};
`;

const InitBtnStyle = {
  fill: 'grey',
  fontSize: '2.2rem',
  cursor: 'pointer',
};

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
      <InitBtn>
        <TiDelete className="icon" style={InitBtnStyle} onClick={onClickInit} />
      </InitBtn>
    </Form>
  );
}

export default SearchBar;
