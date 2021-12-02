import { TOAST_TIME } from './constant';

const WINDOW_HEIGHT = window.innerHeight;

export const CHAT = {
  listHeight: '84vh',
  inputHeight: '10vh',
  inputWidth: '90%',
  msgWidth: '20rem',
  fontSize: '1.8rem',
};

export const FORM = {
  top: '20%',
  joinWidth: '40rem',
  joinHeight: '30rem',
  loginWidth: '40rem',
  loginHeight: '30rem',
  createWidth: '100%',
  createHeight: '30rem',
  btnWidth: '16rem',
  btnBorderRadius: '1rem',
};

export const MODAL = {
  width: '65rem',
  height: '50rem',
  topPosition: '-15vh',
};

export const SIDEBAR = {
  minWidth: '29rem',
  height: '100vh',
  zIndex: 10,
  userNicknameMaxWidth: '100px',
  RoomBottomMenuHeight: '100%',
};

export const CAMPER_ICON = {
  width: '5rem',
  height: '5rem',
  borderRadius: '3rem',
};

export const USER_AVATAR = {
  width: '3rem',
  height: '3rem',
};

export const VIDEO_BOX = {
  width: '30rem',
  height: '20rem',
  borderRadius: '3rem',
};

export const ROOM_CARD = {
  width: '20rem',
  height: '15rem',
};

export const GRASS = {
  containerHeight: '18vh',
  width: `${WINDOW_HEIGHT / 800}rem`,
  height: `${WINDOW_HEIGHT / 800}rem`,
  gridGap: '0.3rem',
  legendFontSize: '3rem',
  rowNumbers: 7,
  columnNumbers: 53,
};

export const TOAST = {
  width: '38rem',
  height: '4rem',
  second: `${TOAST_TIME / 1000}.2s`,
  topPosition: '10vh',
};

export const SEARCH_BAR = {
  initBtn: { fill: 'grey', fontSize: '2.2rem', cursor: 'pointer' },
};

export const PAGE_TITLE = {
  mainFontSize: '15rem',
  profileFontSize: '8rem',
  profileHeight: '10vh',
};

export const PROFILE = {
  containerHeight: '65vh',
  avatarWidth: '16rem',
  avatarHeight: '16rem',
  btnBorderRadius: '1rem',
  infoCardMinWidth: '20rem',
  infoCardWidth: '60rem',
  infoFontSize: '3rem',
  legendFontSize: '2.3rem',
};
