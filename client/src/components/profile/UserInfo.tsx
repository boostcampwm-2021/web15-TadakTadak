import styled, { css } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import InfoCard from './InfoCard';
import { useUser } from '@contexts/userContext';
import ModifyInfoCard from './ModifyInfoCard';
import { CANVAS } from '@utils/constant';
import GrassArea from '@components/profile/GrassArea';
import ProfileAvatar from '@components/profile/Avatar';
import { getUserLogList, getUserLogListPerMonth } from '@src/apis';
import {
  drawLineChartDots,
  drawLineChartLines,
  drawLineChartXaxis,
  drawLineChartYaxis,
  getGrassDateList,
  getHeights,
  getWidths,
} from '@utils/utils';
import { CHECK_IN, PATH } from '@utils/constant';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.lg};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
  :last-child {
    margin-top: ${({ theme }) => theme.margins.base};
  }
`;

const MainTitle = styled.h1`
  font-size: 10rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

const Canvas = styled.canvas`
  width: 650px;
  height: 450px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
`;

function UserInfo(): JSX.Element {
  const [isModify, setIsModify] = useState(false);
  const onClickModifyToggle = () => setIsModify(!isModify);
  const user = useUser();
  const history = useHistory();
  const [grassList, setGrassList] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderLineGraph = async () => {
    if (!canvasRef.current) {
      return;
    }
    const { isOk, data } = await getUserLogListPerMonth();
    if (!isOk || !data) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    canvas.width = CANVAS.width;
    canvas.height = CANVAS.height;

    const values = Object.keys(data).map((key: string) => data[key]);
    const maxMonths = Math.max.apply(null, values);
    const width = getWidths(canvas.width);
    const height = getHeights(data, maxMonths, canvas.height);
    drawLineChartXaxis(context, canvas.width, canvas.height);
    drawLineChartYaxis(context, canvas.width, canvas.height);
    drawLineChartLines(width, context, height, canvas.height);
    drawLineChartDots(context, width, height, data, canvas.height);
  };

  const loadUserGrassList = useCallback(async () => {
    const oneYearGrassDateList = getGrassDateList(1);
    const { isOk, data } = await getUserLogList();
    if (isOk && data) {
      data.forEach((date) => {
        const idx = oneYearGrassDateList.indexOf(date.checkIn);
        if (idx !== -1) {
          oneYearGrassDateList[idx] = CHECK_IN;
        }
      });
    }
    renderLineGraph();
    return setGrassList([...oneYearGrassDateList]);
  }, []);

  useEffect(() => {
    if (!user.login) {
      history.replace(PATH.introduction);
    }
    loadUserGrassList();
  }, [loadUserGrassList, history, user.login]);

  return (
    <div>
      <MainTitle>마이 프로필</MainTitle>
      <Wrapper>
        {isModify ? (
          <ModifyInfoCard onnClickCancelBtn={onClickModifyToggle} setIsModify={setIsModify} />
        ) : (
          <InfoCard onClickModifyToggle={onClickModifyToggle} />
        )}
        <ProfileAvatar />
        <div>
          <Canvas ref={canvasRef}></Canvas>
        </div>
      </Wrapper>
      <GrassArea grassList={grassList} />
    </div>
  );
}

export default UserInfo;
