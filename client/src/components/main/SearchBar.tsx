import { useState } from 'react';
import styled from 'styled-components';
import { TabState } from './RoomList';
import { searchRoom } from '@src/apis';

interface SearchBarProps {
  tabState: TabState;
}

const Form = styled.form`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Button = styled.button`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.green};
  width: ${({ theme }) => theme.buttonSizes.lg};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
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
      <Button>검색하기</Button>
    </Form>
  );
}

export default SearchBar;
