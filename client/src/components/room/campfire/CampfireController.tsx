import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { IMicrophoneAudioTrack } from 'agora-rtc-react';
import styled, { css, ThemeContext } from 'styled-components';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { MdOutlineExitToApp, MdMusicNote, MdMusicOff } from 'react-icons/md';
import { useClient } from '../tadaktadak/videoConfig';
import Button from '@components/common/Button';
import { deleteRoom } from '@src/apis';
import { useUser } from '@contexts/userContext';
import { usePlayBgm, usePlayBgmFns } from '@contexts/bgmContext';
import socket from '@src/socket/socket';
import { SocketEvents } from '@socket/socketEvents';

const ButtonContainer = styled.div`
  position: relative;
`;
const Controls = styled.div`
  position: fixed;
  ${({ theme }) => css`
    ${theme.flexCenter}
    bottom: ${theme.margins.xl};
    left: 29rem;
    right: 0;
  `}
`;

const GetoutDiv = styled.div`
  position: fixed;
  ${({ theme }) => css`
    top: ${theme.margins.xl};
    right: ${theme.margins.sm};
  `}
`;

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
