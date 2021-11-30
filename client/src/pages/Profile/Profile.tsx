import { ProfileWrapper, ProfileContainer } from './style';
import MainSideBar from '@components/sideBar/Main';
import UserInfo from '@components/profile/UserInfo';
import DevFieldContextProvider from '@src/contexts/devFieldContext';

const Profile = (): JSX.Element => {
  return (
    <ProfileWrapper>
      <DevFieldContextProvider>
        <MainSideBar />
        <ProfileContainer>
          <UserInfo />
        </ProfileContainer>
      </DevFieldContextProvider>
    </ProfileWrapper>
  );
};
export default Profile;
