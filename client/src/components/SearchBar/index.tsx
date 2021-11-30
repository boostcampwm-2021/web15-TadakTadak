import { TiDelete } from 'react-icons/ti';
import { SearchBarForm, SearchBarInitBtn, SearchBarInput } from './style';
import { SEARCH_BAR } from '@utils/styleConstant';

interface SearchBarProps {
  search: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onReset: () => void;
}

function SearchBar({ search, onChange, onReset }: SearchBarProps): JSX.Element {
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <SearchBarForm onSubmit={onSubmitForm}>
      <SearchBarInput type="text" onChange={onChange} value={search} placeholder="방 제목을 검색하세요." />
      <SearchBarInitBtn>
        <TiDelete className="icon" style={SEARCH_BAR.initBtn} onClick={onReset} />
      </SearchBarInitBtn>
    </SearchBarForm>
  );
}

export default SearchBar;
