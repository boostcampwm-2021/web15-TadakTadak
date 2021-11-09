import { useState, useEffect } from 'react';
import { IAgoraRTCRemoteUser } from 'agora-rtc-react';
import { appId, token, useClient, useMicrophoneAndCameraTracks } from './videoConfig';
import VideoController from './VideoController';
import Videos from './Videos';

const Room = ({ location }: { location: any }): JSX.Element => {
  const { channelName } = location.state;
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [start, setStart] = useState<boolean>(false); // start: 서버에 초기화 완료
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks(); // ready: 클라이언트 트랙 준비 여부

  useEffect(() => {
    const init = async (name: string) => {
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

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      console.log('init ready');
      init(channelName);
    }
  }, [channelName, client, ready, tracks]);

  return (
    <div className="video-container">
      {start && tracks && <Videos users={users} tracks={tracks} />}
      {ready && tracks && <VideoController tracks={tracks} setStart={setStart} />}
    </div>
  );
};
export default Room;
