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
import { VIDEO_BOX, SPEAK } from '@src/utils/constant';

const VideoWrap = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: ${VIDEO_BOX.WIDTH};
  height: ${VIDEO_BOX.HEIGHT};
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${VIDEO_BOX.BORDER_RADIUS};
  overflow: hidden;
  position: relative;
`;

const VolumeVisualizer = styled.div`
  width: ${VIDEO_BOX.WIDTH};
  height: ${VIDEO_BOX.HEIGHT};
  position: absolute;
  right: 0;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: ${VIDEO_BOX.BORDER_RADIUS};
`;

interface VideoBoxProps {
  videoTrack: ICameraVideoTrack | IRemoteVideoTrack | undefined;
  audioTrack: IMicrophoneAudioTrack | IRemoteAudioTrack | undefined;
}

interface DivWithFullscreen extends HTMLDivElement {
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

const VideoBox = ({ videoTrack, audioTrack }: VideoBoxProps): JSX.Element => {
  const [isSpeak, setIsSpeak] = useState(false);
  const isInterval = useRef(false);
  const videoRef = useRef<DivWithFullscreen>(null);
  const initInterval = useCallback(
    function () {
      if (!isInterval.current) {
        setInterval(() => {
          if (audioTrack) {
            setIsSpeak(audioTrack?.getVolumeLevel() > SPEAK.VOLUME);
          }
        }, SPEAK.VISUAL_TIME);
      }
      isInterval.current = true;
    },
    [isInterval, audioTrack],
  );

  function openFullscreen() {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        /* Firefox */
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        /* Chrome, Safari & Opera */
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        /* IE/Edge */
        videoRef.current.msRequestFullscreen();
      }
    }
  }

  useEffect(() => {
    if (audioTrack) {
      initInterval();
    }
  }, [audioTrack, initInterval]);

  return (
    <VideoWrap
      onDoubleClick={() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        videoTrack?.getMediaStreamTrack().readyState === 'live' && openFullscreen();
      }}
      ref={videoRef}>
      {videoTrack && (
        <AgoraVideoPlayer style={{ height: '100%', width: '100%' }} className="video" videoTrack={videoTrack} />
      )}
      {isSpeak && <VolumeVisualizer />}
    </VideoWrap>
  );
};

export default VideoBox;
