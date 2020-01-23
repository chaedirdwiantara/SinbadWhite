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
  /** LINES  */
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
  /** BOX PADDING */
  boxPadding: {
    height: 10,
    backgroundColor: masterColor.fontBlack05
  },
  /** IMAGE SINBAD */
  fullImage: {
    height: 190,
    width: undefined,
    aspectRatio: 1 / 1
  },
  fullWidthDeviceImage: {
    height,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image46: {
    height: 46,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image60: {
    height: 60,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image65: {
    height: 65,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image74: {
    height: 74,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image77: {
    resizeMode: 'contain',
    width: 77,
    height: undefined,
    aspectRatio: 1 / 1
  },
  /** NOTIF */
  circleRedNotification16: {
    backgroundColor: masterColor.mainColor,
    borderWidth: 2,
    height: 16,
    width: 16,
    borderColor: masterColor.fontRed40,
    borderRadius: 10
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
  shadow5: {
    borderWidth: 0,
    marginHorizontal: 1,
    marginVertical: 2,
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  shadowForBox: {
    borderWidth: 0,
    backgroundColor: masterColor.backgroundWhite,
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
  shadowForBox5: {
    borderWidth: 0,
    backgroundColor: masterColor.backgroundWhite,
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  shadowForBox10: {
    borderWidth: 0,
    backgroundColor: masterColor.backgroundWhite,
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10
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
