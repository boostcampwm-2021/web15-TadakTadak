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

export const TOAST_TIME = 2000;

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
  logoutSuccess: '로그아웃 되었습니다.',
  updateSuccess: '회원 정보를 변경했습니다.',
  nothingChange: '변경 사항이 없습니다.',
  deleteImgSuccess: '아바타를 성공적으로 제거했습니다.',
  updateImgSuccess: '아바타를 성공적으로 변경했습니다.',
  inputEmpty: '모두 입력해주세요.',
  invalidFormatEmail: '이메일 형식을 확인해주세요.',
  invalidFormatPwd: '비밀번호는 6자 이상 20자 이하 영문, 숫자를 반드시 포함해야 합니다.',
  invalidFormatNickname: '닉네임은 2자 이상 15자 이하 영문,숫자,한글만 입력할 수 있습니다.',
  notAllowedNonLogin: '로그인 후 입장할 수 있습니다.',
  loginConfirm: '이메일 및 비밀번호를 확인해주세요',
  alreadyEmail: '이미 등록되어 있는 이메일입니다.',
  alreadyRoom: '방은 최대 1개까지 생성할 수 있습니다.',
  emptyDevField: '개발 분야를 선택해주세요.',
  emptyTitle: '방 제목을 입력해주세요.',
  emptyRoomType: '방 유형을 선택해주세요.',
  emptyHeadcount: '최대 입장 가능한 인원을 선택해주세요.',
};

export const PLACEHOLDER_TXT = {
  roomTitle: `방 제목을 입력해주세요. (최대 ${INPUT.roomTitleMaxLen}자)`,
  roomDiscrpt: '방에 대한 설명을 입력해주세요.(선택)',
  email: '이메일 (Ex : user@tadaktadak.com)',
  nickname: `닉네임 (최소 2자, 최대 ${INPUT.nicknameMaxLen}자, 영문/숫자/한글)`,
  password: `비밀번호 (최소 ${INPUT.pwdMinLen}자, 최대 ${INPUT.pwdMaxLen}자, 영문, 숫자 조합 / 특수문자 가능)`,
};

export const SELECT_TEXT = {
  roomType: '방 유형',
  headCount: '인원',
  devField: '개발 필드',
};

export const CHECK_IN = 'check-in';

export const CANVAS = {
  width: 800,
  height: 400,
  YLine: '#888888',
  XLine: '#f5f5f5',
  resultLine: '#ee7f6e',
};
