import { useState } from 'react';
import styled, { css } from 'styled-components';
import { TabState } from './RoomList';
import { searchRoom } from '@src/apis';

interface SearchBarProps {
  tabState: TabState;
}

interface ButtonProps {
  input: string;
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
    props.input &&
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
  const [input, setInput] = useState('');
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    const response = await searchRoom();
  };
  return (
    <Form onSubmit={onSubmitForm}>
      <Input type="text" onChange={onChangeInput} value={input} placeholder="방을 검색하세요." />
      <Button input={input}>검색하기</Button>
    </Form>
  );
}

export default SearchBar;
