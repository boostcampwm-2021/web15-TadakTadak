import { IRemoteAudioTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import styled from 'styled-components';
import defaultImage from '@assets/default-avatar.jpeg';
import { useEffect, useState, useRef, useCallback } from 'react';
import { SPEAK } from '@utils/constant';
import { CAMPER_ICON } from '@utils/styleConstant';

const CamperIcon = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: ${CAMPER_ICON.width};
  height: ${CAMPER_ICON.height};
  margin: ${({ theme }) => theme.margins.sm};
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${CAMPER_ICON.borderRadius};
  overflow: hidden;
  position: relative;
`;

const VolumeVisualizer = styled.div`
  width: ${CAMPER_ICON.width};
  height: ${CAMPER_ICON.height};
  position: absolute;
  right: 0;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: ${CAMPER_ICON.borderRadius};
`;

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
            setIsSpeak(audioTrack?.getVolumeLevel() > SPEAK.volume);
          }
        }, SPEAK.visualTime);
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
