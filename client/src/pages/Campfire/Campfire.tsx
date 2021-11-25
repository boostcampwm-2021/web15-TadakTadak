import { useState, useEffect } from 'react';
import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import { useClient, useMicrophoneTrack } from '../../components/room/tadaktadak/videoConfig';
import BGMContextProvider from '@contexts/bgmContext';
import { RoomInfo } from '@components/main/RoomList';
import { RoomContainer, RoomWrapper } from '@pages/Campfire/style';
import RoomSideBar from '@components/room/tadaktadak/RoomSideBar';
import FireAnimation from '@components/largeFireAnimation';
import CampfireController from '@components/room/campfire/CampfireController';
import CamperList from '@components/room/campfire/CamperList';

interface LocationProps {
  pathname: string;
  state: RoomInfo;
}

interface RoomProps {
  location: LocationProps;
}

const Campfire = ({ location }: RoomProps): JSX.Element => {
  const { agoraAppId, agoraToken, uuid, owner, maxHeadcount } = location.state;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, track } = useMicrophoneTrack();
  const [fireOn, setFireOn] = useState(false);

  useEffect(() => {
    const init = async () => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log('subscribe success');
        if (mediaType === 'audio') {
          setUsers((prevUsers) => [...new Set([...prevUsers, user])]);
          user.audioTrack?.play();
        }
      });

      client.on('user-joined', (user) => {
        setUsers((prevUsers) => [...new Set([...prevUsers, user])]);
      });

      client.on('user-unpublished', (user, type) => {
        console.log('unpublished', user, type);
        if (type === 'audio') {
          user.audioTrack?.stop();
        }
      });

      client.on('user-left', (user) => {
        console.log('leaving', user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(agoraAppId, uuid, agoraToken, null);
      if (track) {
        await client.publish(track);
        await track.setEnabled(false);
      }
      setStart(true);
    };

    if (ready && track) {
      console.log('init ready');
      init();
    }
  }, [uuid, agoraAppId, agoraToken, client, ready, track]);
  useEffect(() => setFireOn(true), []);

  return (
    <BGMContextProvider>
      <RoomWrapper>
        <RoomSideBar uuid={uuid} hostNickname={owner?.nickname} maxHeadcount={maxHeadcount} />
        <RoomContainer>
          <FireAnimation setFireOn={setFireOn} />
          {start && track && <CamperList users={users} track={track} />}
          {ready && track && <CampfireController track={track} setStart={setStart} uuid={uuid} ownerId={owner?.id} />}
        </RoomContainer>
      </RoomWrapper>
    </BGMContextProvider>
  );
};
export default Campfire;
