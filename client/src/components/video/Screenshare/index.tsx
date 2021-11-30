import React, { useEffect } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient, useScreenVideoTrack } from '../videoConfig';

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
    if (error) setScreenShare(false);
    return () => {
      client.unpublish(tracks);
    };
  }, [setStart, setScreenShare, screenShare, client, preTracks, trackState, tracks, ready, error]);

  return <div></div>;
};

export default ScreenShare;
