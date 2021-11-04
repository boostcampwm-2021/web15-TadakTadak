import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack, AgoraVideoPlayer } from 'agora-rtc-react';

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}): JSX.Element => {
  const { users, tracks } = props;

  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer style={{ height: '500px', width: '500px' }} className="video" videoTrack={tracks[1]} />
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: '500px', width: '500px' }}
                  className="video"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            } else return;
          })}
      </div>
    </div>
  );
};

export default Videos;
