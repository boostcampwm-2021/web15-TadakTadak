import styled from 'styled-components';
import defaultImage from '@assets/default-avatar.jpeg';
import { CAMPER_ICON } from '@utils/styleConstant';

export const CamperIcon = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: ${CAMPER_ICON.width};
  height: ${CAMPER_ICON.height};
  margin: ${({ theme }) => theme.margins.sm};
  background-image: url(${defaultImage});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: ${CAMPER_ICON.borderRadius};
  overflow: hidden;
  position: relative;
`;

export const VolumeVisualizer = styled.div`
  width: ${CAMPER_ICON.width};
  height: ${CAMPER_ICON.height};
  position: absolute;
  right: 0;
  border: 3px solid ${({ theme }) => theme.colors.blue};
  border-radius: ${CAMPER_ICON.borderRadius};
`;
