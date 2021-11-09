import { createClient, ClientConfig, createMicrophoneAndCameraTracks } from 'agora-rtc-react';
import 'dotenv/config';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const appId: string = process.env.REACT_APP_AGORA_APP_ID || '';
const token: string = process.env.REACT_APP_AGORA_TOKEN || ''; // channel-name : test (테스트용 채널)

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export { appId, token, useClient, useMicrophoneAndCameraTracks };
