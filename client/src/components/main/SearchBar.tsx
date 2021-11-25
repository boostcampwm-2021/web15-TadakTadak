import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';

interface SearchBarProps {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onReset: () => void;
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

function SearchBar({ search, onChange, onReset }: SearchBarProps): JSX.Element {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <Form onSubmit={onSubmitForm}>
      <Input type="text" onChange={onChange} value={search} placeholder="방 제목을 검색하세요." />
      <InitBtn>
        <TiDelete className="icon" style={InitBtnStyle} onClick={onReset} />
      </InitBtn>
    </Form>
  );
}

export default SearchBar;
