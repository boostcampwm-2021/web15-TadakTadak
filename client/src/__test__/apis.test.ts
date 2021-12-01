import { getUrl } from '../apis/apiUtils';
import { postLogin } from '../apis/index';

describe('API 유틸 함수 테스트', () => {
  it('환경변수 설정이 안돼있는 경우', () => {
    const inputUrl = 'tadaktadak.com';
    const resUrl = getUrl(inputUrl);
    expect(resUrl).toEqual('tadaktadak.com');
  });
});

describe('api 실패 테스트', () => {
  const mockFetch = (body: any) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => body,
    });
  };

  beforeEach(() => jest.clearAllMocks());

  it('올바르지 않은 정보 입력시', async () => {
    mockFetch({ message: '입력하신 사용자 정보가 올바르지 않습니다.', statusCode: 401 });
    const loginBody = {
      email: 'test@naver.com',
      password: 'test',
    };
    const response = await postLogin(loginBody);
    expect(response.isOk).toBe(false);
    expect(response.errorData?.message).toBe('입력하신 사용자 정보가 올바르지 않습니다.');
  });
});

describe('api 성공 테스트', () => {
  const mockFetch = (body: any) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => body,
    });
  };

  beforeEach(() => jest.clearAllMocks());

  it('회원가입 성공', async () => {
    mockFetch({ statusCode: 201, data: true, message: 'success' });
    const loginBody = {
      email: 'test@naver.com',
      password: 'test',
    };
    const response = await postLogin(loginBody);
    expect(response.isOk).toBe(true);
    expect(response.data).toBe(true);
  });

  it('로그인 성공', async () => {
    mockFetch({ statusCode: 201, data: { id: 1, nickname: 'test' }, message: 'success' });
    const loginBody = {
      email: 'test@naver.com',
      password: 'test',
    };
    const { isOk, data } = await postLogin(loginBody);
    expect(isOk).toBe(true);
    expect(data?.nickname).toBe('test');
  });
});
