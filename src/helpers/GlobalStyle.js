import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import masterColor from '../config/masterColor.json';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  /** === FOR CARD CONTAINER */
  cardContainerRadius12: {
    borderWidth: 0,
    backgroundColor: masterColor.backgroundWhite,
    borderRadius: 12,
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
  /** LINES WITH PADDING 16 */
  lines: {
    borderTopWidth: 1,
    borderColor: masterColor.fontBlack10
  },
  /** IMAGE SINBAD */
  fullImage: {
    height: 0.3 * height,
    width: undefined,
    aspectRatio: 1 / 1
  },
  /** SHADOW */
  shadow: {
    borderWidth: 0,
    marginHorizontal: 1,
    marginVertical: 2,
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  }
});

export default styles;
