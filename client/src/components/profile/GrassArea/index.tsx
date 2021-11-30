import { InfoSet, Legend, Container, FireGrass, GreyGrass } from './style';
import { CHECK_IN, GRASS } from '@utils/constant';

interface GrassAreaProps {
  grassList: string[];
}

const GrassArea = ({ grassList }: GrassAreaProps): JSX.Element => {
  return (
    <InfoSet>
      <Legend>{GRASS.title}</Legend>
      <Container>
        {grassList.length &&
          grassList.map((date, idx) => (date === CHECK_IN ? <FireGrass key={idx} /> : <GreyGrass key={idx} />))}
      </Container>
    </InfoSet>
  );
};

export default GrassArea;
