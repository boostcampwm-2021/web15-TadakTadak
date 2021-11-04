import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack, AgoraVideoPlayer } from 'agora-rtc-react';
import styled from 'styled-components';
import defaultImage from '../../assets/default-avatar.jpeg';

const VIDEO_WIDTH = 300;
const VIDEO_HEIGHT = 300;

const VideoWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${VIDEO_WIDTH}px;
  height: ${VIDEO_HEIGHT}px;
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
  overflow: hidden;
`;

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}): JSX.Element => {
  const { users, tracks } = props;
  return (
    <div>
      <div id="videos">
        <VideoWrap>
          <AgoraVideoPlayer style={{ height: '100%', width: '100%' }} className="video" videoTrack={tracks[1]} />
        </VideoWrap>
        {users.length > 0 &&
          users.map((user) => (
            <VideoWrap key={user.uid}>
              {user.videoTrack && (
                <AgoraVideoPlayer
                  style={{ height: '100%', width: '100%' }}
                  className="video"
                  videoTrack={user.videoTrack}
                />
              )}
            </VideoWrap>
          ))}
      </div>
    </div>
  );
};

export default Videos;
