import { isEmail } from './utils';

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
