import { createClient, ClientConfig } from 'agora-rtc-react';
import 'dotenv/config';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const appId: string = process.env.REACT_APP_AGORA_APP_ID || '';
const token: string = process.env.REACT_APP_AGORA_TOKEN || ''; // channel-name : test (테스트용 채널)

const useClient = createClient(config);

export { appId, token, useClient };
