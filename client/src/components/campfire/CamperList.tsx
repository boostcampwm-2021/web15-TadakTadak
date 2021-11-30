import { useUser } from '@src/contexts/userContext';
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

const CamperWrapper = styled.div`
  margin: ${({ theme }) => theme.margins.base};
  ${({ theme }) => theme.flexColumn}
  align-items: center;
`;

const CamperInfoDiv = styled.div`
  width: 100%;
  ${({ theme }) => theme.flexCenter}
  margin-top: ${({ theme }) => theme.margins.sm};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.grey};
`;

const CamperAvatarList = styled.div`
  ${({ theme }) => css`
    ${theme.flexCenter};
    border-radius: ${theme.borderRadius.sm};
  `};
`;

interface CamperListProps {
  users: IAgoraRTCRemoteUser[];
  track: IMicrophoneAudioTrack;
}

const CamperList = ({ users, track }: CamperListProps): JSX.Element => {
  const userInfo = useUser();
  return (
    <CamperListWrapper>
      <CamperListContainer>
        <CamperAvatarList>
          <CamperWrapper>
            <CamperAvatar audioTrack={track} />
            <CamperInfoDiv>{userInfo.nickname}(나)</CamperInfoDiv>
          </CamperWrapper>
          {users.length > 0 &&
            users.map((user) => (
              <CamperWrapper>
                <CamperAvatar key={user.uid} audioTrack={user.audioTrack} />
                <CamperInfoDiv>{decodeURI(String(user.uid))}</CamperInfoDiv>
              </CamperWrapper>
            ))}
        </CamperAvatarList>
      </CamperListContainer>
    </CamperListWrapper>
  );
};

export default CamperList;
