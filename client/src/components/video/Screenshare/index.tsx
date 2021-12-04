import React, { useEffect } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient, useScreenVideoTrack } from '@components/video/config';

interface ScreenShareDivProps {
  preTracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  trackState: { video: boolean; audio: boolean };
  screenShare: boolean;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setScreenShare: React.Dispatch<React.SetStateAction<boolean>>;
}

const ScreenShare = ({
  preTracks,
  trackState,
  screenShare,
  setStart,
  setScreenShare,
}: ScreenShareDivProps): JSX.Element => {
  const client = useClient();
  const { ready, tracks, error } = useScreenVideoTrack();

  useEffect(() => {
    const pulishScreenShare = async () => {
      await client.unpublish(preTracks[1]);
      await client.publish(tracks);
      if (!Array.isArray(tracks)) {
        tracks.on('track-ended', async () => {
          await client.unpublish(tracks);
          tracks.close();
          if (trackState.video) {
            await client.publish(preTracks[1]);
          }
          setScreenShare(false);
        });
      }
    };
    if (ready && tracks) pulishScreenShare();
    if (error) setScreenShare(false);

    return () => {
      if (!error && !Array.isArray(tracks)) {
        client.unpublish(tracks);
        tracks.close();
      }
    };
  }, [setStart, setScreenShare, screenShare, client, preTracks, trackState, tracks, ready, error]);

  return <div></div>;
};

export default ScreenShare;
