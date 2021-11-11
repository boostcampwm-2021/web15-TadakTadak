import { createClient, ClientConfig, createMicrophoneAndCameraTracks } from 'agora-rtc-react';
import 'dotenv/config';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();

export { useClient, useMicrophoneAndCameraTracks };
