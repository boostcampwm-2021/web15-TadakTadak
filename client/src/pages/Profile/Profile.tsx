import { ProfileWrapper, ProfileContainer } from './style';
import SideBar from '@components/main/SideBar';
import UserInfo from '@components/profile/UserInfo';
import DevFieldContextProvider from '@src/contexts/devFieldContext';
const Profile = (): JSX.Element => {
  return (
    <ProfileWrapper>
      <DevFieldContextProvider>
        <SideBar />
        <ProfileContainer>
          <UserInfo />
        </ProfileContainer>
      </DevFieldContextProvider>
    </ProfileWrapper>
  );
};
export default Profile;
