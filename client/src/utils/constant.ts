export enum RoomType {
  tadak = '타닥타닥',
  campfire = '캠프파이어',
}

export const DEBOUNCE = {
  time: 500,
};

export const INFINITE_SCROLL = {
  unit: 15,
  threshold: 0.9,
};

export const SPEAK = {
  volume: 0.2,
  visualTime: 1000,
};

export const INPUT = {
  emailMaxLen: 25,
  nicknameMaxLen: 15,
  pwdMinLen: 6,
  pwdMaxLen: 20,
  roomTitleMaxLen: 20,
  roomDescMaxLen: 30,
  chatMaxLen: 100,
};

export const TOAST_TIME = 4000;

export const MODAL_NAME = {
  login: '로그인',
  join: '회원가입',
};

export const PATH = {
  introduction: '/',
  main: '/main',
  tadak: '/room/tadak',
  campfire: '/room/campfire',
  profile: '/profile',
};

export const PAGE_NAME = {
  main: 'MAIN',
};

export const MAIN = 'MAIN';

export const ROOM_DESCRIPTION = {
  tadak: '개발 공부를 하는 예비 개발자들이 함께 학습하는 공간이에요.',
  campfire: '모닥불 주변에 모여서 대화를 나누는 아늑한 공간이에요.',
};

export const TOAST_MESSAGE = {
  loginSuccess: '로그인에 성공하였습니다.',
  joinSuccess: '회원가입에 성공하였습니다.',
  inputEmpty: '모두 입력해주세요.',
  loginConfirm: '이메일 및 비밀번호를 확인해주세요',
  alreadyEmail: '이미 등록되어 있는 이메일입니다.',
};

export const CHECK_IN = 'check-in';
