// prettier-ignore
import {
  Dimensions
} from '../library/reactPackage';

const { width } = Dimensions.get('window');
const designWidth = 360;

const Scale = unit => {
  return (width * unit) / designWidth;
};

export default Scale;
