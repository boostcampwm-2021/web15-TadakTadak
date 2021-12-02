import styled from 'styled-components';

export const ButtonWrapper = styled.div`
  width: ${({ theme }) => theme.buttonSizes.base};
  height: ${({ theme }) => theme.buttonSizes.base};
  background-color: ${({ theme }) => theme.colors.blue2};
  border-radius: 50%;
  position: fixed;
  ${({ theme }) => theme.flexCenter};
  bottom: ${({ theme }) => theme.paddings.xl};
  right: ${({ theme }) => theme.paddings.xl};
  padding-bottom: ${({ theme }) => theme.paddings.sm};
  &:hover {
    background: ${({ theme }) => theme.colors.blue};
  }
  ${({ theme }) => theme.active}
`;
