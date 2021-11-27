import styled, { css } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import InfoForm from './InfoForm';
import { useUser, useUserFns } from '@contexts/userContext';
import ModifyForm from './ModifyForm';
import { deleteImage, getUserLogList, getUserLogListPerMonth, postAvatar } from '@src/apis';
import {
  drawLineChartDots,
  drawLineChartLines,
  drawLineChartXaxis,
  drawLineChartYaxis,
  getGrassDateList,
  getHeights,
  getWidths,
} from '@utils/utils';
import { GRASS } from '@utils/styleConstant';
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

const UserAvatar = styled.img`
  margin-right: ${({ theme }) => theme.margins.base};
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.margins.xl};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainTitle = styled.h1`
  font-size: 10rem;
  color: ${({ theme }) => theme.colors.bgGreen};
`;

const UploadButton = styled.label`
  ${({ theme }) => theme.flexCenter}
  width:100%;
  background-color: ${({ theme }) => theme.colors.green};
  margin-top: ${({ theme }) => theme.margins.sm};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DeleteButton = styled.button`
  ${({ theme }) => theme.flexCenter}
  width:100%;
  background-color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.margins.sm};
  padding: ${({ theme }) => theme.paddings.sm};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const GrassContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(53, ${GRASS.width});
  grid-template-rows: repeat(7, ${GRASS.height});
  grid-gap: ${GRASS.gridGap};
`;

const FireBlock = styled.div`
  width: ${GRASS.width};
  height: ${GRASS.height};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

const GreyBlock = styled.div`
  width: ${GRASS.width};
  height: ${GRASS.height};
  background-color: ${({ theme }) => theme.colors.black};
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  opacity: 0.3;
`;

const InfoSet = styled.fieldset`
  ${({ theme }) => css`
    background-color: ${theme.colors.grey};
    padding: ${theme.paddings.base};
    border: 1px solid ${theme.colors.borderGrey};
    border-radius: ${theme.borderRadius.base};
  `};
`;

const Legend = styled.legend`
  font-size: 3rem;
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
  const { logUserIn } = useUserFns();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || !fileList[0]) return;
    const formData = new FormData();
    formData.append('image', fileList[0]);

    const { isOk, data } = await postAvatar(formData);
    if (isOk && data) {
      logUserIn(data);
    }
  };

  const handleFileDelete = async () => {
    const { data } = await deleteImage();
    if (data) {
      if (data === true) return;
      logUserIn(data);
    }
  };

  const renderLineGraph = async () => {
    if (!canvasRef.current) {
      return;
    }
    const { isOk, data } = await getUserLogListPerMonth();
    if (!isOk || !data) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    canvas.width = 800;
    canvas.height = 400;

    const values = Object.keys(data).map((key: string) => data[key]);
    const maxMonths = Math.max.apply(null, values);
    const width = getWidths(canvas.width);
    const height = getHeights(data, maxMonths, canvas.height);
    drawLineChartXaxis(context, canvas.width, canvas.height);
    drawLineChartYaxis(context, canvas.width, canvas.height);
    drawLineChartLines(width, context, height, canvas.height);
    drawLineChartDots(context, width, height, data, canvas.height);
  };
  renderLineGraph();

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
    console.log(oneYearGrassDateList);
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
          <ModifyForm onClickModifyToggle={onClickModifyToggle} setIsModify={setIsModify} />
        ) : (
          <InfoForm onClickModifyToggle={onClickModifyToggle} />
        )}
        <ImageWrapper>
          <UserAvatar src={user.imageUrl}></UserAvatar>
          <ButtonWrapper>
            <UploadButton htmlFor="upload">업로드</UploadButton>
            <input type="file" onChange={handleFileInput} id="upload" style={{ display: 'none' }}></input>
            <DeleteButton onClick={handleFileDelete}>삭제</DeleteButton>
          </ButtonWrapper>
        </ImageWrapper>
        <div>
          <Canvas ref={canvasRef}></Canvas>
        </div>
      </Wrapper>

      <InfoSet>
        <Legend>{`잔디 🔥`}</Legend>
        <GrassContainer>
          {grassList.length &&
            grassList.map((date, idx) => (date === CHECK_IN ? <FireBlock key={idx} /> : <GreyBlock key={idx} />))}
        </GrassContainer>
      </InfoSet>
    </div>
  );
}

export default UserInfo;
