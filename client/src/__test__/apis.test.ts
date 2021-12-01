import { getUrl } from '../apis/apiUtils';
import { postLogin } from '../apis/index';

describe('API 유틸 함수 테스트', () => {
  it('환경변수 설정이 안돼있는 경우', () => {
    const inputUrl = 'tadaktadak.com';
    const resUrl = getUrl(inputUrl);
    expect(resUrl).toEqual('tadaktadak.com');
  });
});

describe('api 성공 테스트', () => {
  const mockFetch = (data: string | undefined, body: any | undefined = undefined) => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      ok: true,
      json: async () => {
        if (body) return body;
        if (data) return { data };
        throw Error();
      },
    });
  };

  beforeEach(() => jest.clearAllMocks());

  it('로그인 시도', async () => {
    mockFetch('로그인 성공!');
    const loginBody = {
      email: 'test@naver.com',
      password: 'test',
    };
    const { isOk, data } = await postLogin(loginBody);
    expect(isOk).toBe(true);
    expect(data).toBe('로그인 성공!');
  });
});
