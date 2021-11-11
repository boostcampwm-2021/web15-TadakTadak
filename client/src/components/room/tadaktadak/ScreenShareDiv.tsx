import React, { useEffect } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack, createScreenVideoTrack } from 'agora-rtc-react';
import { useClient } from './videoConfig';

const ScreenShareDiv = (props: {
  preTracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  trackState: { video: boolean; audio: boolean };
  screenShare: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setScreenShare: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const client = useClient();
  const { preTracks, trackState, screenShare, setStart, setScreenShare } = props;
  const useScreenVideoTrack = createScreenVideoTrack(
    {
      encoderConfig: '1080p_1',
      optimizationMode: 'detail',
    },
    'disable',
  );
  const { ready, tracks } = useScreenVideoTrack();

  useEffect(() => {
    const pulishScreenShare = async () => {
      setStart(false);
      await client.unpublish(preTracks[1]);
      await client.publish(tracks);
      setStart(true);
      if (!Array.isArray(tracks)) {
        tracks.on('track-ended', async () => {
          setScreenShare(false);
          await client.unpublish(tracks);
          if (trackState.video) {
            await client.publish(preTracks[1]);
          }
        });
      }
    };
    if (ready) pulishScreenShare();
  }, [setStart, setScreenShare, screenShare, client, preTracks, trackState, tracks, ready]);

  return <div></div>;
};

export default ScreenShareDiv;
