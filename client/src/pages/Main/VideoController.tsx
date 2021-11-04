import React, { useState } from 'react';
import { ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-react';
import { useClient } from './videoConfig';
import { FaVolumeMute, FaVolumeUp, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { MdOutlineExitToApp } from 'react-icons/md';
import Button from '../../components/Button';
import styled, { css } from 'styled-components';

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
  setInCall: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
  const client = useClient();
  const { tracks, setStart, setInCall } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

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
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <ButtonContainer>
      <Controls>
        <Button
          icon={trackState.audio ? <FaVolumeUp /> : <FaVolumeMute />}
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
      </Controls>
      <GetoutDiv>
        <Button icon={<MdOutlineExitToApp />} text={''} onClick={() => leaveChannel()} />
      </GetoutDiv>
    </ButtonContainer>
  );
};

export default VideoController;
