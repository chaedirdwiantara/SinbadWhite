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
  linesSwipeModal: {
    borderColor: masterColor.fontBlack10,
    borderTopWidth: 5,
    borderRadius: 10,
    marginTop: 9,
    width: 63
  },
  lineVerticalDash: {
    borderLeftColor: masterColor.fontBlack10,
    borderLeftWidth: 2,
    flex: 1,
    borderStyle: 'dotted'
  },
  /** IMAGE SINBAD */
  fullImage: {
    height: 190,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image46: {
    height: 46,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image74: {
    height: 74,
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
  },
  shadowForBox: {
    borderWidth: 0,
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
  shadowBottom: {
    borderWidth: 0,
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2
  }
});

export default styles;
