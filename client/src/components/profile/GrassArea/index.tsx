import { InfoSet, Legend, Container, FireGrass, GreyGrass } from './style';
import { CHECK_IN, LEGEND_TEXT } from '@utils/constant';

interface GrassAreaProps {
  grassList: string[];
}

const GrassArea = ({ grassList }: GrassAreaProps): JSX.Element => {
  return (
    <InfoSet>
      <Legend>{LEGEND_TEXT.grass}</Legend>
      <Container>
        {grassList.length &&
          grassList.map((date, idx) => (date === CHECK_IN ? <FireGrass key={idx} /> : <GreyGrass key={idx} />))}
      </Container>
    </InfoSet>
  );
};

export default GrassArea;
