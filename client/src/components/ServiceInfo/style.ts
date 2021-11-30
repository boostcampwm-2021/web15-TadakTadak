import styled from 'styled-components';
import { PAGE_TITLE } from '@utils/styleConstant';

export const MainTitle = styled.h1`
  font-size: ${PAGE_TITLE.mainFontSize};
  color: ${({ theme }) => theme.colors.bgGreen};
`;

export const MainInfo = styled.div`
  font-size: 4rem;
`;
