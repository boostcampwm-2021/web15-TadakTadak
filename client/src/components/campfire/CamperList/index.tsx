import { useUser } from '@src/contexts/userContext';
import { IAgoraRTCRemoteUser, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { CamperListWrapper, CamperListContainer, CamperAvatarList, CamperWrapper, CamperInfoDiv } from './style';
import CamperAvatar from '../CamperAvatar';

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
              <CamperWrapper key={user.uid}>
                <CamperAvatar audioTrack={user.audioTrack} />
                <CamperInfoDiv>{decodeURI(String(user.uid))}</CamperInfoDiv>
              </CamperWrapper>
            ))}
        </CamperAvatarList>
      </CamperListContainer>
    </CamperListWrapper>
  );
};

export default CamperList;
