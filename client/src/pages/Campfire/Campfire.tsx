import { useState, useEffect } from 'react';
import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import { RoomContainer, RoomWrapper } from '@pages/Campfire/style';
import { useClient, useMicrophoneTrack } from '@components/video/config';
import RoomSideBar from '@components/sideBar/Room';
import FireAnimation from '@src/components/fireAnimation/Campfire';
import CampfireController from '@src/components/campfire/Controller';
import CamperList from '@src/components/campfire/CamperList';
import Loader from '@components/common/Loader';
import BGMContextProvider from '@contexts/bgmContext';
import { useUser } from '@contexts/userContext';
import { RoomType } from '@utils/constant';
import { RoomInfoType } from '@src/types';

interface LocationProps {
  pathname: string;
  state: RoomInfoType;
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
  const userInfo = useUser();

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

      await client.join(agoraAppId, uuid, agoraToken, encodeURI(userInfo.nickname ?? ''));
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
  }, [uuid, agoraAppId, agoraToken, client, ready, track, userInfo]);
  useEffect(() => setFireOn(true), []);

  return (
    <BGMContextProvider>
      {!start ? (
        <Loader isWholeScreen={true} />
      ) : (
        <RoomWrapper>
          <RoomSideBar
            uuid={uuid}
            hostNickname={owner?.nickname}
            maxHeadcount={maxHeadcount}
            roomType={RoomType.campfire}
          />
          <RoomContainer>
            <FireAnimation fireOn={fireOn} setFireOn={setFireOn} />
            {track && <CamperList users={users} track={track} />}
            {track && <CampfireController track={track} setStart={setStart} uuid={uuid} ownerId={owner?.id} />}
          </RoomContainer>
        </RoomWrapper>
      )}
    </BGMContextProvider>
  );
};
export default Campfire;
