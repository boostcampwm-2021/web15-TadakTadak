import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { Wrapper, InfoContainer, Container, Title, Canvas, InfoSet, Legend } from './style';
import GrassArea from '@components/profile/GrassArea';
import ProfileAvatar from '@components/profile/Avatar';
import ModifyInfoCard from '../ModifyInfoCard';
import InfoCard from '../InfoCard';
import { useUser } from '@contexts/userContext';
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
import { CANVAS, CHECK_IN, PATH } from '@utils/constant';

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
    <Wrapper>
      <Title>마이 프로필</Title>
      <Container>
        <InfoContainer>
          <ProfileAvatar />
          <InfoSet>
            <Legend>유저 정보</Legend>
            {isModify ? (
              <ModifyInfoCard onnClickCancelBtn={onClickModifyToggle} setIsModify={setIsModify} />
            ) : (
              <InfoCard onClickModifyToggle={onClickModifyToggle} />
            )}
          </InfoSet>
        </InfoContainer>
        <InfoSet>
          <Legend>{'월별 출석 통계'}</Legend>
          <Canvas ref={canvasRef}></Canvas>
        </InfoSet>
      </Container>
      <GrassArea grassList={grassList} />
    </Wrapper>
  );
}

export default UserInfo;
