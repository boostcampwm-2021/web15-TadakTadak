import { isEmail, isNickname, isPassword, getPrevYear, getDateListFromStartToLast } from './utils';

/*
    정규표현식을 통해 이메일의 유효성을 검증하는 isEmail 함수 테스트
*/

describe('유효한 이메일 검증하기', () => {
  test('무난한 유효한 이메일', () => {
    const validEmail1 = 'forExample12@naver.com';
    expect(isEmail(validEmail1)).toBeTruthy();
  });

  test('최소 조건을 만족한 유효한 이메일', () => {
    const validEmail2 = 'a@a.aa';
    expect(isEmail(validEmail2)).toBeTruthy();
  });

  test('숫자와 특수문자가 섞인 유효한 이메일', () => {
    const validEmail3 = '0forExample1_2@naver.com';
    expect(isEmail(validEmail3)).toBeTruthy();
  });
});

describe('유효하지 않은 이메일 검증하기', () => {
  test('마침표로 끝나는 유효하지 않은 이메일', () => {
    const invalidEmail1 = 'forExample12@r.t.';
    expect(isEmail(invalidEmail1)).toBeFalsy();
  });

  test('최소 조건을 만족하지 않는 이메일', () => {
    const invalidEmail2 = 'a@a.a';
    expect(isEmail(invalidEmail2)).toBeFalsy();
  });

  test('@ 뒤에 .을 생략한 이메일', () => {
    const invalidEmail3 = 'test@navercom';
    expect(isEmail(invalidEmail3)).toBeFalsy();
  });
});

/*
  정규표현식을 통해 닉네임 유효성을 검증하는 isNickname 함수 테스트
*/

describe('유효한 닉네임 검증하기', () => {
  test('유효한 영어 닉네임', () => {
    const validNickname = 'master';
    expect(isNickname(validNickname)).toBeTruthy();
  });

  test('유효한 한글 닉네임', () => {
    const validNickname = '가나다힣';
    expect(isNickname(validNickname)).toBeTruthy();
  });

  test('영어한글숫자를 섞은 닉네임', () => {
    const validNickname = 'Q평E평32평';
    expect(isNickname(validNickname)).toBeTruthy();
  });

  test('가장 짧은 닉네임', () => {
    const validNickname = 'a1';
    expect(isNickname(validNickname)).toBeTruthy();
  });

  test('가장 긴 닉네임', () => {
    const validNickname = '한글영어숫자-_.15자가능.';
    expect(isNickname(validNickname)).toBeTruthy();
  });
});

describe('유효하지 않은 닉네임 검증하기', () => {
  test('한글자음으로만 이루어진 닉네임', () => {
    const invalidNickname = 'ㄱㄴㄷㄹ';
    expect(isNickname(invalidNickname)).toBeFalsy();
  });

  test('-_. 외 특수문자를 포함한 닉네임', () => {
    const invalidNickname = 'goodman$';
    expect(isNickname(invalidNickname)).toBeFalsy();
  });

  test('최대길이를 넘는 닉네임', () => {
    const invalidNickname = '닉네임은16자이상이불가능합니다';
    expect(isNickname(invalidNickname)).toBeFalsy();
  });

  test('한글/영어로 시작하지 않는 닉네임', () => {
    const invalidNickname = '.qwer';
    expect(isNickname(invalidNickname)).toBeFalsy();
  });
});

/*
  정규표현식을 통해 비밀번호 유효성을 검증하는 isPassword 함수 테스트
*/

describe('유효한 비밀번호 검증하기', () => {
  test('영어와 숫자를 조합한 유효한 비밀번호', () => {
    const validPassword = 'nicePassword1';
    expect(isPassword(validPassword)).toBeTruthy();
  });

  test('영어,숫자,특수문자를 포함한 비밀번호', () => {
    const validPassword = 'qwer12!@';
    expect(isPassword(validPassword)).toBeTruthy();
  });

  test('가장 짧은 비밀번호', () => {
    const validPassword = 'qqqq12';
    expect(isPassword(validPassword)).toBeTruthy();
  });

  test('가장 긴 비밀번호', () => {
    const validPassword = 'qqqqqaaaaa1010101010';
    expect(isPassword(validPassword)).toBeTruthy();
  });
});

describe('유효하지 않은 비밀번호 검증하기', () => {
  test('영어만 포함한 비밀번호', () => {
    const invalidPassword = 'qwertyui';
    expect(isPassword(invalidPassword)).toBeFalsy();
  });

  test('숫자만 포함한 비밀번호', () => {
    const invalidPassword = '1234566789';
    expect(isPassword(invalidPassword)).toBeFalsy();
  });

  test('영어와 특수문자를 포함한 비밀번호', () => {
    const invalidPassword = 'qwert!@';
    expect(isPassword(invalidPassword)).toBeFalsy();
  });

  test('이상한 특수문자를 추가로 포함한 비밀번호', () => {
    const invalidPassword = 'qwer12!🌝';
    expect(isPassword(invalidPassword)).toBeFalsy();
  });

  test('특수문자로 시작하는 비밀번호', () => {
    const invalidPassword = '!qwer12';
    expect(isPassword(invalidPassword)).toBeFalsy();
  });

  test('숫자로 시작하는 비밀번호', () => {
    const invalidPassword = '1qwer12';
    expect(isPassword(invalidPassword)).toBeFalsy();
  });
});

/*
  특정 날짜로부터 n년 전 날짜를 알려주는 getPrevYear 함수 테스트
*/

describe('특정 날짜로부터 N년 전 날짜를 구하기', () => {
  test('2021-12-01의 1년 전', () => {
    const baseDate = new Date('2021-12-01');
    const targetDate = new Date('2020-12-02');
    const year = 1;
    expect(getPrevYear(baseDate, year)).toEqual(targetDate);
  });

  test('2021-12-31의 2년 전', () => {
    const baseDate = new Date('2021-12-31');
    const targetDate = new Date('2020-01-01');
    const year = 2;
    expect(getPrevYear(baseDate, year)).toEqual(targetDate);
  });

  test('2021-11-30의 3년 전', () => {
    const baseDate = new Date('2021-11-30');
    const targetDate = new Date('2018-12-01');
    const year = 3;
    expect(getPrevYear(baseDate, year)).toEqual(targetDate);
  });
});

/*
  기준 날짜부터 특정 날짜까지의 yyyy-mm-dd를 배열로 주는
  getDateListFromStartToLast 함수 테스트
*/

describe('A날짜부터 B날짜까지 모든 날짜에 대한 yyyy-mm-dd 배열을 반환하는 함수 테스트', () => {
  test('2021-12-01 ~ 2021-12-31 까지의 배열 크기 구하기', () => {
    const baseDate = '2021-12-01';
    const targetDate = '2021-12-31';
    const expectLength = 31;
    expect(getDateListFromStartToLast(baseDate, targetDate)).toHaveLength(expectLength);
  });

  test('2020-12-02 ~ 2021-12-01 까지의 배열 크기 구하기', () => {
    const baseDate = '2020-12-02';
    const targetDate = '2021-12-01';
    const expectLength = 365;
    expect(getDateListFromStartToLast(baseDate, targetDate)).toHaveLength(expectLength);
  });

  test('2021-01-01 ~ 2021-12-31 까지의 배열 크기 구하기', () => {
    const baseDate = '2021-01-01';
    const targetDate = '2021-12-31';
    const expectLength = 365;
    expect(getDateListFromStartToLast(baseDate, targetDate)).toHaveLength(expectLength);
  });
});
