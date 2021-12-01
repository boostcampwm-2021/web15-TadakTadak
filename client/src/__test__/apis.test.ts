import { getUrl } from '../apis/apiUtils';
import { postLogin, postJoin, postLogout } from '../apis/index';
import UserInfoType from '@src/types/userInfo';

describe('API 유틸 함수 테스트', () => {
  it('환경변수 설정이 안돼있는 경우', () => {
    const inputUrl = 'tadaktadak.com';
    const resUrl = getUrl(inputUrl);
    expect(resUrl).toEqual('tadaktadak.com');
  });
});

interface ResBody {
  message: string;
  statusCode: number;
  data?: boolean | string | UserInfoType;
}

describe('api 실패 테스트', () => {
  const mockFetch = (body: ResBody) => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => body,
    });
  };

  beforeEach(() => jest.clearAllMocks());

  it('올바르지 않은 로그인 정보 입력시', async () => {
    mockFetch({ message: '입력하신 사용자 정보가 올바르지 않습니다.', statusCode: 401 });
    const loginBody = {
      email: 'test@naver.com',
      password: 'test',
    };
    const response = await postLogin(loginBody);
    expect(response.isOk).toBe(false);
    expect(response.errorData?.message).toBe('입력하신 사용자 정보가 올바르지 않습니다.');
  });
  it('중복된 이메일로 가입하는 경우', async () => {
    mockFetch({
      statusCode: 400,
      message: '이미 존재하는 회원입니다.',
    });
    const loginBody = {
      email: 'test@naver.com',
      password: 'test',
      nickname: 'testman2',
    };
    const response = await postJoin(loginBody);
    expect(response.isOk).toBe(false);
    expect(response.errorData?.message).toBe('이미 존재하는 회원입니다.');
  });
});

describe('api 성공 테스트', () => {
  const mockFetch = (body: ResBody) => {
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
      nickname: 'testman',
    };
    const response = await postJoin(loginBody);
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

  it('로그아웃 성공', async () => {
    mockFetch({ statusCode: 201, data: true, message: 'success' });
    const { isOk, data } = await postLogout();
    expect(isOk).toBe(true);
    expect(data).toBe(true);
  });
});
