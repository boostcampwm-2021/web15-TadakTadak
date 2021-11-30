import { Container, TopMenus, BottomMenus } from './style';

interface SideBarProps {
  topMenus: React.ReactNode;
  bottomMenus: React.ReactNode;
  bottomMenuHeight?: string;
  bgColor?: string;
  borderColor?: string;
}

const SideBar = ({ topMenus, bottomMenus, bottomMenuHeight, bgColor, borderColor }: SideBarProps): JSX.Element => {
  return (
    <Container bgColor={bgColor} borderColor={borderColor}>
      <TopMenus>{topMenus}</TopMenus>
      <BottomMenus bottomMenuHeight={bottomMenuHeight}>{bottomMenus}</BottomMenus>
    </Container>
  );
};

export default SideBar;
