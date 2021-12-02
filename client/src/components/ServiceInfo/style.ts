import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { PAGE_TITLE } from '@utils/styleConstant';

export const MainTitleLink = styled(Link)`
  font-size: ${PAGE_TITLE.mainFontSize};
  color: ${({ theme }) => theme.colors.bgGreen};
`;

export const MainInfo = styled.div`
  font-size: 4rem;
`;
