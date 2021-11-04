import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';
import VideoBox from '../../components/VideoBox';

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}): JSX.Element => {
  const { users, tracks } = props;
  const myVideoTrack = tracks[1];
  return (
    <div>
      <div id="videos">
        <VideoBox videoTrack={myVideoTrack} />
        {users.length > 0 && users.map((user) => <VideoBox key={user.uid} videoTrack={user.videoTrack} />)}
      </div>
    </div>
  );
};

export default Videos;
