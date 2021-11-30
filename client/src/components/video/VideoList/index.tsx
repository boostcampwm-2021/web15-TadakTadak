import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';
import { VideosContainer, VideosGrid, VideoCardWrapper, UserInfoDiv } from './style';
import VideoCard from '@components/video/VideoCard';
import { useUser } from '@contexts/userContext';

interface VideosProps {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const Videos = ({ users, tracks }: VideosProps): JSX.Element => {
  const myVideoTrack = tracks[1];
  const myAudioTrack = tracks[0];
  const userInfo = useUser();

  return (
    <VideosContainer>
      <VideosGrid id="videos">
        <VideoCardWrapper key={userInfo.nickname}>
          <VideoCard videoTrack={myVideoTrack} audioTrack={myAudioTrack} />
          <UserInfoDiv>{userInfo.nickname}(나)</UserInfoDiv>
        </VideoCardWrapper>
        {users.length > 0 &&
          users.map((user) => (
            <VideoCardWrapper key={user.uid}>
              <VideoCard videoTrack={user.videoTrack} audioTrack={user.audioTrack} />
              <UserInfoDiv>{decodeURI(String(user.uid))}</UserInfoDiv>
            </VideoCardWrapper>
          ))}
      </VideosGrid>
    </VideosContainer>
  );
};

export default Videos;
