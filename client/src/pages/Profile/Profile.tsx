import { ProfileWrapper, ProfileContainer } from './style';
import SideBar from '@components/main/SideBar';
import UserInfo from '@components/profile/UserInfo';
const Profile = (): JSX.Element => {
  return (
    <ProfileWrapper>
      <SideBar />
      <ProfileContainer>
        <UserInfo />
      </ProfileContainer>
    </ProfileWrapper>
  );
};
export default Profile;
