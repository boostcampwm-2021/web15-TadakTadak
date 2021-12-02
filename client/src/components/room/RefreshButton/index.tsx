import { IoRefreshCircleOutline } from 'react-icons/io5';

interface RefreshButtonProps {
  onResetSearch: () => void;
}

function RefreshButton({ onResetSearch }: RefreshButtonProps): JSX.Element {
  return <IoRefreshCircleOutline onClick={onResetSearch} size="50" cursor="pointer" />;
}

export default RefreshButton;
