import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack } from 'agora-rtc-react';
import styled, { css } from 'styled-components';
import CamperAvatar from './CamperAvatar';

const CamperListWrapper = styled.div`
  position: relative;
`;

const CamperListContainer = styled.div`
  position: fixed;
  padding: ${({ theme }) => theme.paddings.lg};
  ${({ theme }) => css`
    ${theme.flexCenter};
    bottom: 12rem;
    left: 29rem;
    right: 0;
  `};
`;

const CamperAvatarList = styled.div`
  ${({ theme }) => css`
    ${theme.flexCenter};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.sm};
  `};
`;

interface CamperListProps {
  users: IAgoraRTCRemoteUser[];
  track: IMicrophoneAudioTrack;
}

const CamperList = ({ users, track }: CamperListProps): JSX.Element => {
  return (
    <CamperListWrapper>
      <CamperListContainer>
        <CamperAvatarList>
          <CamperAvatar audioTrack={track} />
          {users.length > 0 && users.map((user) => <CamperAvatar key={user.uid} audioTrack={user.audioTrack} />)}
        </CamperAvatarList>
      </CamperListContainer>
    </CamperListWrapper>
  );
};

export default CamperList;
