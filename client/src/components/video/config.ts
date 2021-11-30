import {
  createClient,
  ClientConfig,
  createMicrophoneAndCameraTracks,
  createMicrophoneAudioTrack,
  createScreenVideoTrack,
} from 'agora-rtc-react';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useMicrophoneTrack = createMicrophoneAudioTrack();
const useScreenVideoTrack = createScreenVideoTrack(
  {
    encoderConfig: '1080p_1',
    optimizationMode: 'detail',
  },
  'disable',
);

export { useClient, useMicrophoneAndCameraTracks, useMicrophoneTrack, useScreenVideoTrack };
