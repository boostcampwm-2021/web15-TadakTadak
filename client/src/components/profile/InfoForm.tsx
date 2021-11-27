import React from 'react';
import styled, { css } from 'styled-components';
import { useUser } from '@contexts/userContext';

interface InfoProps {
  onClickModifyToggle: React.MouseEventHandler<HTMLButtonElement>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3px;
`;
const Legend = styled.legend`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

const Info = styled.div`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.bgGreen};
  width: 40rem;
  word-break: break-all;
`;

const InfoSet = styled.fieldset`
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;

const ModalToggleSpan = styled.span`
  ${({ theme }) => theme.flexCenter}
  background-color: ${({ theme }) => theme.colors.green};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const InfoForm = ({ onClickModifyToggle }: InfoProps): JSX.Element => {
  const user = useUser();
  return (
    <Wrapper>
      <InfoWrapper>
        <InfoSet>
          <Legend>{`이메일`}</Legend>
          <Info>{user.email}</Info>
        </InfoSet>
        <InfoSet>
          <Legend>{`닉네임`}</Legend>
          <Info>{user.nickname}</Info>
        </InfoSet>
        <InfoSet>
          <Legend>{`관심 분야`}</Legend>
          <Info>{user.devField?.name}</Info>
        </InfoSet>
      </InfoWrapper>
      <ModalToggleSpan onClick={onClickModifyToggle}>수정하기</ModalToggleSpan>
    </Wrapper>
  );
};

export default InfoForm;
