import styled from 'styled-components';
import { VIDEO_BOX } from '@utils/styleConstant';
import defaultImage from '@assets/default-avatar.jpeg';

export const VideoWrap = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: ${VIDEO_BOX.width};
  height: ${VIDEO_BOX.height};
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${VIDEO_BOX.borderRadius};
  overflow: hidden;
  position: relative;
`;

export const VolumeVisualizer = styled.div`
  width: ${VIDEO_BOX.width};
  height: ${VIDEO_BOX.height};
  position: absolute;
  right: 0;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: ${VIDEO_BOX.borderRadius};
`;
