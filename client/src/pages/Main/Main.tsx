import { useState } from 'react';
import { MainContainer } from './style';
import VideoContainer from './VideoContainer';
import ChannelForm from './ChannelForm';

const Main = (): JSX.Element => {
  const [inCall, setInCall] = useState(false);
  const [channelName, setChannelName] = useState('');
  return (
    <MainContainer>
      <h1 className="heading">Agora RTC 테스트</h1>
      {inCall ? (
        <VideoContainer setInCall={setInCall} channelName={channelName} />
      ) : (
        <ChannelForm setInCall={setInCall} setChannelName={setChannelName} />
      )}
    </MainContainer>
  );
};

export default Main;
