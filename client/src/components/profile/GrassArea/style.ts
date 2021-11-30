import styled, { css } from 'styled-components';
import { GRASS } from '@utils/styleConstant';

export const InfoSet = styled.fieldset`
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.base};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;

export const Legend = styled.legend`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(${GRASS.rowNumbers}, ${GRASS.height});
  grid-template-columns: repeat(${GRASS.columnNumbers}, ${GRASS.width});
  grid-gap: ${GRASS.gridGap};
`;

export const FireGrass = styled.div`
  width: ${GRASS.width};
  height: ${GRASS.height};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

export const GreyGrass = styled.div`
  width: ${GRASS.width};
  height: ${GRASS.height};
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  opacity: 0.3;
`;
