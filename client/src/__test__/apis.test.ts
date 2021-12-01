import { getUrl } from '../apis/apiUtils';

describe('API 유틸 함수 테스트', () => {
  it('환경변수 설정이 안돼있는 경우', () => {
    const inputUrl = 'tadaktadak.com';
    const resUrl = getUrl(inputUrl);
    expect(resUrl).toEqual('tadaktadak.com');
  });
});
