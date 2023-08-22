import { data } from './data';
import { Scatterplot } from './Scatterplot';

export const ScatterplotCanvasBasicDemo = ({ width = 700, height = 400 }) => (
  <Scatterplot data={data} width={width} height={height} />
);
