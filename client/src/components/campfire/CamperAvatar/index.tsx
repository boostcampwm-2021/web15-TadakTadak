import { useEffect, useState, useRef, useCallback } from 'react';
import { IRemoteAudioTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { CamperIcon, VolumeVisualizer } from './style';
import { SPEAK } from '@utils/constant';

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
