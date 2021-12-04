import {
  createClient,
  ClientConfig,
  createMicrophoneAndCameraTracks,
  createMicrophoneAudioTrack,
  createScreenVideoTrack,
  ILocalAudioTrack,
  ILocalVideoTrack,
  AgoraRTCError,
} from 'agora-rtc-react';
import { SCREEN_SHARE_HEIGHT } from '@utils/constant';

const config: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useMicrophoneTrack = createMicrophoneAudioTrack();
const useScreenVideoTrack = (): {
  ready: boolean;
  tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack];
  error: AgoraRTCError | null;
} => {
  const screenShare = createScreenVideoTrack(
    {
      encoderConfig: `${SCREEN_SHARE_HEIGHT}p_1`,
      optimizationMode: 'detail',
    },
    'disable',
  );
  return screenShare();
};

export { useClient, useMicrophoneAndCameraTracks, useMicrophoneTrack, useScreenVideoTrack };
