import { IRemoteAudioTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import styled from 'styled-components';
import defaultImage from '@assets/default-avatar.jpeg';
import { useEffect, useState, useRef, useCallback } from 'react';
import { CAMPER } from '@src/utils/constant';
import { SPEAK } from '@src/utils/constant';

const CamperIcon = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: ${CAMPER.ICON_WIDTH};
  height: ${CAMPER.ICON_HEIGHT};
  margin: ${({ theme }) => theme.margins.sm};
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${CAMPER.ICON_BORDER_RADIUS};
  overflow: hidden;
  position: relative;
`;

const VolumeVisualizer = styled.div`
  width: ${CAMPER.ICON_WIDTH};
  height: ${CAMPER.ICON_HEIGHT};
  position: absolute;
  right: 0;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: ${CAMPER.ICON_BORDER_RADIUS};
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
            setIsSpeak(audioTrack?.getVolumeLevel() > SPEAK.VOLUME);
          }
        }, SPEAK.VISUAL_TIME);
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
