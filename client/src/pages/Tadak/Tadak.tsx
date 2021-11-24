import { useState, useEffect } from 'react';
import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import { useClient, useMicrophoneAndCameraTracks } from '../../components/room/tadaktadak/videoConfig';
import { RoomInfo } from '@components/main/RoomList';
import { TadakContainer, TadakWrapper } from '@src/pages/Tadak/style';
import RoomSideBar from '@components/room/tadaktadak/RoomSideBar';
import VideoController from '@components/room/tadaktadak/VideoController';
import Videos from '@components/room/tadaktadak/Videos';

interface LocationProps {
  pathname: string;
  state: RoomInfo;
}

interface TadakProps {
  location: LocationProps;
}

const Tadak = ({ location }: TadakProps): JSX.Element => {
  const { agoraAppId, agoraToken, uuid, owner, maxHeadcount } = location?.state;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    const init = async () => {
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log('subscribe success');
        if (mediaType === 'video') {
          setUsers((prevUsers) => [...new Set([...prevUsers, user])]);
        }
        if (mediaType === 'audio') {
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
        if (type === 'video') {
          user.videoTrack?.stop();
        }
      });

      client.on('user-left', (user) => {
        console.log('leaving', user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(agoraAppId, uuid, agoraToken, null);
      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
        await tracks[1].setEnabled(false);
        await tracks[0].setEnabled(false);
      }
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init();
    }
  }, [uuid, agoraAppId, agoraToken, client, ready, tracks]);

  return (
    <TadakWrapper>
      <RoomSideBar uuid={uuid} hostNickname={owner?.nickname} maxHeadcount={maxHeadcount} />
      <TadakContainer>
        {start && tracks && <Videos users={users} tracks={tracks} />}
        {ready && tracks && <VideoController tracks={tracks} setStart={setStart} uuid={uuid} ownerId={owner?.id} />}
      </TadakContainer>
    </TadakWrapper>
  );
};
export default Tadak;
