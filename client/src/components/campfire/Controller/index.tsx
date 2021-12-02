import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { IMicrophoneAudioTrack } from 'agora-rtc-react';
import { ButtonContainer, Controls, GetoutDiv } from './style';
import { ThemeContext } from 'styled-components';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { MdOutlineExitToApp, MdMusicNote, MdMusicOff } from 'react-icons/md';
import { useClient } from '@components/video/config';
import Button from '@components/common/CircleButton';
import { deleteRoom } from '@src/apis';
import { useUser } from '@contexts/userContext';
import { usePlayBgm, usePlayBgmFns } from '@contexts/bgmContext';
import socket from '@src/socket/socket';
import { SocketEvents } from '@socket/socketEvents';

interface CampfireControllerProps {
  track: IMicrophoneAudioTrack;
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
  uuid: string;
  ownerId: number | undefined;
}

const CampfireController = ({ track, setStart, uuid, ownerId }: CampfireControllerProps): JSX.Element => {
  const client = useClient();
  const history = useHistory();
  const themeContext = useContext(ThemeContext);
  const user = useUser();
  const isPlay = usePlayBgm();
  const { togglePlay: onClickPlayMusicBtn } = usePlayBgmFns();
  const [trackState, setTrackState] = useState({ audio: false });

  const mute = async () => {
    await track.setEnabled(!trackState.audio);
    setTrackState((ps) => {
      return { ...ps, audio: !ps.audio };
    });
  };

  const leaveChannel = useCallback(async () => {
    if (ownerId === user.id) {
      socket.emit(SocketEvents.deleteRoom, { uuid });
      deleteRoom({ uuid });
    }
    await client.leave();
    client.removeAllListeners();
    track.close();
    setStart(false);
  }, [client, track, uuid, ownerId, user, setStart]);

  useEffect(() => {
    return history.listen(() => {
      if (history.action === 'POP') {
        leaveChannel();
      }
    });
  }, [history, leaveChannel]);

  return (
    <ButtonContainer>
      <Controls>
        <Button icon={isPlay ? <MdMusicNote fill={'white'} /> : <MdMusicOff />} onClick={onClickPlayMusicBtn} />
        <Button
          icon={trackState.audio ? <FaMicrophone fill="white" /> : <FaMicrophoneSlash />}
          className={trackState.audio ? 'on' : ''}
          onClick={() => mute()}
        />
      </Controls>
      <GetoutDiv>
        <Button
          icon={<MdOutlineExitToApp fill="white" />}
          color={themeContext.colors.secondary}
          onClick={() => {
            leaveChannel();
            history.replace('/main');
          }}
        />
      </GetoutDiv>
    </ButtonContainer>
  );
};

export default CampfireController;
