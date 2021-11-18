import {
  IRemoteVideoTrack,
  IRemoteAudioTrack,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  AgoraVideoPlayer,
} from 'agora-rtc-react';
import styled from 'styled-components';
import defaultImage from '@assets/default-avatar.jpeg';
import { useEffect, useState, useRef, useCallback } from 'react';

const VIDEO_WIDTH = 30;
const VIDEO_HEIGHT = 20;
const BORDER_RADIUS = '3rem';

const VideoWrap = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: ${VIDEO_WIDTH}rem;
  height: ${VIDEO_HEIGHT}rem;
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${BORDER_RADIUS};
  overflow: hidden;
  position: relative;
`;

const VolumeVisualizer = styled.div`
  width: ${VIDEO_WIDTH}rem;
  height: ${VIDEO_HEIGHT}rem;
  position: absolute;
  right: 0;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: ${BORDER_RADIUS};
`;

const SPEAK_VOLUME = 0.2;
const VOLUME_VISUAL_TIME = 1000;

interface VideoBoxProps {
  videoTrack: ICameraVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: IMicrophoneAudioTrack | IRemoteAudioTrack | undefined;
}

const VideoBox = ({ videoTrack, audioTrack }: VideoBoxProps): JSX.Element => {
  const [isSpeak, setIsSpeak] = useState(false);
  const isInterval = useRef(false);

  const initInterval = useCallback(
    function () {
      if (!isInterval.current) {
        setInterval(() => {
          if (audioTrack) {
            setIsSpeak(audioTrack?.getVolumeLevel() > SPEAK_VOLUME);
          }
        }, VOLUME_VISUAL_TIME);
      }
      isInterval.current = true;
    },
    [isInterval, audioTrack],
  );

  useEffect(() => {
    if (audioTrack) {
      initInterval();
    }
  }, [audioTrack, initInterval]);

  return (
    <VideoWrap>
      {videoTrack && (
        <AgoraVideoPlayer style={{ height: '100%', width: '100%' }} className="video" videoTrack={videoTrack} />
      )}
      {isSpeak && <VolumeVisualizer />}
    </VideoWrap>
  );
};

export default VideoBox;
