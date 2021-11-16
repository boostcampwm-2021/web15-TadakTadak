import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { MdOutlineExitToApp, MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import styled, { css, ThemeContext } from 'styled-components';
import { useClient } from './videoConfig';
import Button from '@components/common/Button';
import ScreenShareDiv from './ScreenShareDiv';

const ButtonContainer = styled.div``;
const Controls = styled.div`
  position: fixed;
  ${({ theme }) => css`
    ${theme.flexCenter}
    bottom: ${theme.margins.xl};
    left: 0;
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

const VideoController = (props: {
  tracks: [IMicrophoneAudioTrack, ICameraVideoTrack];
  setStart: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const client = useClient();
  const history = useHistory();
  const { tracks, setStart } = props;
  const themeContext = useContext(ThemeContext);
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

  const handleScreenShare = () => setScreenShare(true);

  const leaveChannel = useCallback(async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
  }, [client, tracks, setStart]);

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
        <Button
          icon={trackState.audio ? <FaMicrophone /> : <FaMicrophoneSlash />}
          text={''}
          className={trackState.audio ? 'on' : ''}
          onClick={() => mute('audio')}
        />
        <Button
          icon={trackState.video ? <FaVideo /> : <FaVideoSlash />}
          text={''}
          className={trackState.video ? 'on' : ''}
          onClick={() => mute('video')}
        />
        <Button
          icon={screenShare ? <MdScreenShare /> : <MdStopScreenShare />}
          text={''}
          className={screenShare ? 'on' : ''}
          onClick={handleScreenShare}
        />
        {screenShare && (
          <ScreenShareDiv
            preTracks={tracks}
            trackState={trackState}
            screenShare={screenShare}
            setStart={setStart}
            setScreenShare={setScreenShare}
          />
        )}
      </Controls>
      <GetoutDiv>
        <Button
          icon={<MdOutlineExitToApp />}
          text={''}
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

export default VideoController;
