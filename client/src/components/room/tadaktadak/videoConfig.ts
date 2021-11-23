import {
  createClient,
  ClientConfig,
  createMicrophoneAndCameraTracks,
  createMicrophoneAudioTrack,
} from 'agora-rtc-react';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useMicrophoneTrack = createMicrophoneAudioTrack();

export { useClient, useMicrophoneAndCameraTracks, useMicrophoneTrack };
