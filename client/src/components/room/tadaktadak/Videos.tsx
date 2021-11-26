import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';
import styled from 'styled-components';
import VideoBox from '@components/VideoBox';
import { useUser } from '@src/contexts/userContext';

const VideosContainer = styled.div`
  ${({ theme }) => theme.flexCenter}
  height: 100%;
`;

const VideoBoxWrapper = styled.div`
  ${({ theme }) => theme.flexColumn}
`;

const UserInfoDiv = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexCenter}
  margin-top: ${({ theme }) => theme.margins.sm};
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const VideosGrid = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 2rem;
`;

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
        <VideoBoxWrapper key={userInfo.nickname}>
          <VideoBox videoTrack={myVideoTrack} audioTrack={myAudioTrack} />
          <UserInfoDiv>{userInfo.nickname}(나)</UserInfoDiv>
        </VideoBoxWrapper>
        {users.length > 0 &&
          users.map((user) => (
            <VideoBoxWrapper key={user.uid}>
              <VideoBox videoTrack={user.videoTrack} audioTrack={user.audioTrack} />
              <UserInfoDiv>{decodeURI(String(user.uid))}</UserInfoDiv>
            </VideoBoxWrapper>
          ))}
      </VideosGrid>
    </VideosContainer>
  );
};

export default Videos;
