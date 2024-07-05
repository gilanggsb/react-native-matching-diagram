import Svg, {
  Line as SvgLine,
  type LineProps as SvgLineProps,
} from 'react-native-svg';
import type { CallBackWithParams } from '../generalType';
import type { ILines } from '../matchDiagramType';
import styles from './styles';

interface LineProps {
  lines: ILines[];
  lineStyle?: SvgLineProps;
  onPress?: CallBackWithParams<void, ILines>;
}

const Line = ({ lines, lineStyle, onPress }: LineProps) => {
  return (
    <Svg height="100%" width="100%" style={styles.container}>
      {lines.map((line, index) => (
        <SvgLine
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="blue"
          strokeWidth="2"
          {...lineStyle}
          onPress={() => onPress?.(line)}
        />
      ))}
    </Svg>
  );
};

export { Line };
