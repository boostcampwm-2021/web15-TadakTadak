import { IRemoteAudioTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import styled from 'styled-components';
import defaultImage from '@assets/default-avatar.jpeg';
import { useEffect, useState, useRef, useCallback } from 'react';

const CAMPER_WIDTH = '5rem';
const CAMPER_HEIGHT = '5rem';
const BORDER_RADIUS = '3rem';

const CamperIcon = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: ${CAMPER_WIDTH};
  height: ${CAMPER_HEIGHT};
  margin: ${({ theme }) => theme.margins.sm};
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${BORDER_RADIUS};
  overflow: hidden;
  position: relative;
`;

const VolumeVisualizer = styled.div`
  width: ${CAMPER_WIDTH};
  height: ${CAMPER_HEIGHT};
  position: absolute;
  right: 0;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: ${BORDER_RADIUS};
`;

const SPEAK_VOLUME = 0.2;
const VOLUME_VISUAL_TIME = 1000;

interface CamperAvatarProps {
  audioTrack: IMicrophoneAudioTrack | IRemoteAudioTrack | undefined;
}

const CamperAvatar = ({ audioTrack }: CamperAvatarProps): JSX.Element => {
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

  return <CamperIcon>{isSpeak && <VolumeVisualizer />}</CamperIcon>;
};

export default CamperAvatar;
