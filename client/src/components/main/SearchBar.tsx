import { useState } from 'react';
import styled, { css } from 'styled-components';
import { TabState } from './RoomList';
import { searchRoom } from '@src/apis';

interface SearchBarProps {
  tabState: TabState;
}

interface ButtonProps {
  search: string;
}

const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Button = styled.button<ButtonProps>`
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

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  width: ${({ theme }) => theme.buttonSizes.xl};
`;

function SearchBar({ tabState }: SearchBarProps): JSX.Element {
  const [search, setInput] = useState('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    const type = tabState.tadak ? '타닥타닥' : '캠프파이어';
    const response = await searchRoom(search, type);
  };
  return (
    <Form onSubmit={onSubmitForm}>
      <Input type="text" onChange={onChangeInput} value={search} placeholder="방을 검색하세요." />
      <Button search={search}>검색하기</Button>
    </Form>
  );
}

export default SearchBar;
