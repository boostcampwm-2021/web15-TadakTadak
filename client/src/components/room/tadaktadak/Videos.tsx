import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack, ICameraVideoTrack } from 'agora-rtc-react';
import styled from 'styled-components';
import VideoBox from '@components/VideoBox';

const VideosContainer = styled.div`
  ${({ theme }) => theme.flexCenter}
  height: 100%;
`;

const VideosGrid = styled.div`
  padding: ${({ theme }) => theme.paddings.lg};
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 2rem;
`;

const Videos = (props: {
  users: IAgoraRTCRemoteUser[];
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
}): JSX.Element => {
  const { users, tracks } = props;
  const myVideoTrack = tracks[1];
  const myAudioTrack = tracks[0];
  return (
    <VideosContainer>
      <VideosGrid id="videos">
        <VideoBox videoTrack={myVideoTrack} audioTrack={myAudioTrack} />
        {users.length > 0 &&
          users.map((user) => <VideoBox key={user.uid} videoTrack={user.videoTrack} audioTrack={user.audioTrack} />)}
      </VideosGrid>
    </VideosContainer>
  );
};

export default Videos;
