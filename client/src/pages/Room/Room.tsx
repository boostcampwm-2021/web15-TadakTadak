import { useState, useEffect } from 'react';
import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import { useClient, useMicrophoneAndCameraTracks } from '../../components/room/tadaktadak/videoConfig';
import { RoomInfo } from '@pages/Main/Main';
import { RoomContainer, RoomWrapper } from '@pages/Room/style';
import RoomSideBar from '@components/room/tadaktadak/RoomSideBar';
import VideoController from '@components/room/tadaktadak/VideoController';
import Videos from '@components/room/tadaktadak/Videos';

interface LocationProps {
  pathname: string;
  state: RoomInfo;
}

interface RoomProps {
  location: LocationProps;
}

const Room = ({ location }: RoomProps): JSX.Element => {
  const { agoraAppId, agoraToken, uuid, owner } = location.state;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false); // start: 서버에 초기화 완료
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks(); // ready: 클라이언트 트랙 준비 여부

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
    <RoomWrapper>
      <RoomSideBar uuid={uuid} />
      <RoomContainer>
        {start && tracks && <Videos users={users} tracks={tracks} />}
        {ready && tracks && <VideoController tracks={tracks} setStart={setStart} uuid={uuid} ownerId={owner?.id} />}
      </RoomContainer>
    </RoomWrapper>
  );
};
export default Room;
