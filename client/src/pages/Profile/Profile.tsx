import { ProfileWrapper, ProfileContainer } from './style';
import MainSideBar from '@components/sideBar/Main';
import ProfilePageContainer from '@components/profile/PageContainer';
import DevFieldContextProvider from '@contexts/devFieldContext';

const Profile = (): JSX.Element => {
  return (
    <ProfileWrapper>
      <DevFieldContextProvider>
        <MainSideBar />
        <ProfileContainer>
          <ProfilePageContainer />
        </ProfileContainer>
      </DevFieldContextProvider>
    </ProfileWrapper>
  );
};
export default Profile;
