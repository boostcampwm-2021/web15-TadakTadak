import { IRemoteVideoTrack, ICameraVideoTrack, AgoraVideoPlayer } from 'agora-rtc-react';
import styled from 'styled-components';
import defaultImage from '../assets/default-avatar.jpeg';

const VIDEO_WIDTH = 30;
const VIDEO_HEIGHT = 20;

const VideoWrap = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: ${VIDEO_WIDTH}rem;
  height: ${VIDEO_HEIGHT}rem;
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 3rem;
  overflow: hidden;
`;

const VideoBox = (props: { videoTrack: ICameraVideoTrack | IRemoteVideoTrack | undefined }): JSX.Element => {
  const { videoTrack } = props;
  return (
    <VideoWrap>
      {videoTrack && (
        <AgoraVideoPlayer style={{ height: '100%', width: '100%' }} className="video" videoTrack={videoTrack} />
      )}
    </VideoWrap>
  );
};

export default VideoBox;
