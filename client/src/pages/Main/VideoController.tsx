import React, { useState } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient } from './videoConfig';
import { FaVolumeMute, FaVolumeUp, FaVideo, FaVideoSlash } from 'react-icons/fa';

const VideoController = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <div className="controls">
      <button className={trackState.audio ? 'on' : ''} onClick={() => mute('audio')}>
        {trackState.audio ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
      <button className={trackState.video ? 'on' : ''} onClick={() => mute('video')}>
        {trackState.video ? <FaVideo /> : <FaVideoSlash />}
      </button>
      <button onClick={() => leaveChannel()}>나가기</button>
    </div>
  );
};

export default VideoController;
