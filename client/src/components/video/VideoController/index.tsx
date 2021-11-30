import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { MdOutlineExitToApp, MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import socket from '@socket/socket';
import { SocketEvents } from '@socket/socketEvents';
import { ButtonContainer, Controls, Getout } from './style';
import Button from '@components/common/Button';
import ScreenShare from '../Screenshare';
import { useClient } from '../config';
import { deleteRoom } from '@src/apis';
import { useUser } from '@contexts/userContext';
import { useTheme } from '@contexts/themeContext';

interface VideoControllerProps {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  uuid: string;
  ownerId: number | undefined;
}

const VideoController = ({ tracks, setStart, uuid, ownerId }: VideoControllerProps): JSX.Element => {
  const client = useClient();
  const history = useHistory();
  const user = useUser();
  const theme = useTheme();
  const [trackState, setTrackState] = useState({ video: false, audio: false });
  const [screenShare, setScreenShare] = useState(false);

  const mute = async (type: 'audio' | 'video') => {
    if (type === 'audio') {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === 'video') {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
      if (trackState.video) await client.publish(tracks[1]);
    }
  };

  const handleScreenShare = () => setScreenShare(!screenShare);

  const leaveChannel = useCallback(async () => {
    if (ownerId === user.id) {
      socket.emit(SocketEvents.deleteRoom, { uuid });
      deleteRoom({ uuid });
    }
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
  }, [client, tracks, uuid, ownerId, user, setStart]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveChannel);
    return () => {
      window.removeEventListener('beforeunload', leaveChannel);
      history.listen(() => {
        if (history.action === 'POP') {
          leaveChannel();
        }
      });
    };
  }, [history, leaveChannel]);

  return (
    <ButtonContainer>
      <Controls>
        <Button
          icon={trackState.audio ? <FaMicrophone fill="white" /> : <FaMicrophoneSlash />}
          text={''}
          className={trackState.audio ? 'on' : ''}
          onClick={() => mute('audio')}
        />
        <Button
          icon={trackState.video ? <FaVideo fill="white" /> : <FaVideoSlash />}
          text={''}
          className={trackState.video ? 'on' : ''}
          onClick={() => mute('video')}
        />
        <Button
          icon={screenShare ? <MdScreenShare fill="white" /> : <MdStopScreenShare />}
          text={''}
          className={screenShare ? 'on' : ''}
          onClick={handleScreenShare}
        />
        {screenShare && (
          <ScreenShare
            preTracks={tracks}
            trackState={trackState}
            screenShare={screenShare}
            setStart={setStart}
            setScreenShare={setScreenShare}
          />
        )}
      </Controls>
      <Getout>
        <Button
          icon={<MdOutlineExitToApp fill="white" />}
          text={''}
          color={theme.colors.secondary}
          onClick={() => {
            leaveChannel();
            history.replace('/main');
          }}
        />
      </Getout>
    </ButtonContainer>
  );
};

export default VideoController;
