import styled from 'styled-components';
import { PAGE_TITLE } from '@utils/styleConstant';

export const MainTitle = styled.div`
  font-size: ${PAGE_TITLE.mainFontSize};
  color: ${({ theme }) => theme.colors.bgGreen};
  cursor: pointer;
`;

export const MainInfo = styled.div`
  font-size: 4rem;
`;
