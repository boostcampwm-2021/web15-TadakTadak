import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';
import { VideosContainer, VideosGrid, VideoCardWrapper, UserInfoDiv } from './style';
import VideoCard from '@components/video/VideoCard';
import { useUser } from '@contexts/userContext';
import { useToast } from '@hooks/useToast';
import { TOAST_MESSAGE } from '@utils/constant';

interface VideosProps {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}

const Videos = ({ users, tracks }: VideosProps): JSX.Element => {
  const myVideoTrack = tracks[1];
  const myAudioTrack = tracks[0];
  const userInfo = useUser();
  const toast = useToast();

  const onClickMe = () => toast('easterEgg', TOAST_MESSAGE.narcissism);

  return (
    <VideosContainer>
      <VideosGrid id="videos">
        <VideoCardWrapper key={userInfo.nickname}>
          <VideoCard videoTrack={myVideoTrack} audioTrack={myAudioTrack} />
          <UserInfoDiv onClick={onClickMe}>{userInfo.nickname}(나)</UserInfoDiv>
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
