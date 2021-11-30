import React from 'react';
import { Wrapper, InfoWrapper, InfoSet, Legend, Info, ModalToggleBtn } from './style';
import { useUser } from '@contexts/userContext';

interface InfoProps {
  onClickModifyToggle: React.MouseEventHandler<HTMLButtonElement>;
}

const InfoForm = ({ onClickModifyToggle }: InfoProps): JSX.Element => {
  const { email, nickname, devField } = useUser();

  return (
    <Wrapper>
      <InfoWrapper>
        <InfoSet>
          <Legend>{`이메일`}</Legend>
          <Info>{email}</Info>
        </InfoSet>
        <InfoSet>
          <Legend>{`닉네임`}</Legend>
          <Info>{nickname}</Info>
        </InfoSet>
        <InfoSet>
          <Legend>{`관심 분야`}</Legend>
          <Info>{devField?.name}</Info>
        </InfoSet>
      </InfoWrapper>
      <ModalToggleBtn onClick={onClickModifyToggle}>수정하기</ModalToggleBtn>
    </Wrapper>
  );
};

export default InfoForm;
