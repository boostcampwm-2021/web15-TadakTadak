import { isEmail } from '@src/utils/utils';

describe('유저 이메일 입력 테스트', () => {
  it('옳은 이메일 입력시', () => {
    const inputEmail = 'test@naver.com';
    const isOk = isEmail(inputEmail);
    expect(isOk).toBe(true);
  });
  it('@를 생략한 경우', () => {
    const inputEmail = 'testnaver.com';
    const isOk = isEmail(inputEmail);
    expect(isOk).toBe(false);
  });
  it('.를 생략한 경우', () => {
    const inputEmail = 'test@navercom';
    const isOk = isEmail(inputEmail);
    expect(isOk).toBe(false);
  });
  it('영문자만 입력한 경우', () => {
    const inputEmail = 'testnavercom';
    const isOk = isEmail(inputEmail);
    expect(isOk).toBe(false);
  });
});
