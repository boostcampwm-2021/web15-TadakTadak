import { IoRefresh } from 'react-icons/io5';
import { ButtonWrapper } from './style';

interface RefreshButtonProps {
  page: React.MutableRefObject<number>;
  search: string;
  getRoomList: (searchStr: string) => Promise<void>;
}

function RefreshButton({ page, search, getRoomList }: RefreshButtonProps): JSX.Element {
  const onClickButton = () => {
    page.current = 1;
    getRoomList(search);
  };
  return (
    <ButtonWrapper>
      <IoRefresh onClick={onClickButton} stroke="white" size="50" cursor="pointer" />
    </ButtonWrapper>
  );
}

export default RefreshButton;
