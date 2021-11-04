import { useState } from 'react';
import { MainContainer, MainTitle, RoomListGrid } from './style';
import VideoContainer from './VideoContainer';
import RoomBox from '../../components/RoomBox';

const roomInfos = [
  {
    channelName: 'test',
    roomName: 'test room',
  },
];

const Main = (): JSX.Element => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState('');
  return (
    <MainContainer>
      {inCall ? (
        <VideoContainer setInCall={setInCall} channelName={channelName} />
      ) : (
        <>
          <MainTitle className="heading">채널 목록</MainTitle>
          <RoomListGrid>
            {roomInfos &&
              roomInfos.map((roomInfo) => (
                <RoomBox
                  key={roomInfo.channelName}
                  setInCall={setInCall}
                  setChannelName={setChannelName}
                  roomInfo={roomInfo}
                />
              ))}
          </RoomListGrid>
        </>
      )}
    </MainContainer>
  );
};

export default Main;
