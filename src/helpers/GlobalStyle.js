import { StyleSheet, Dimensions } from 'react-native';
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
  cardContainerRadius15: {
    borderWidth: 0,
    backgroundColor: masterColor.backgroundWhite,
    borderRadius: 15,
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
  boxPaddingOms: {
    height: 10,
    backgroundColor: masterColor.fontBlack10
  },
  /** ICON MENU */
  icon54Box: {
    borderRadius: 16,
    height: 54,
    marginHorizontal: 15,
    width: 54
  },
  icon54Title: {
    flex: 1,
    marginTop: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  icon44Box: {
    borderRadius: 16,
    height: 44,
    marginHorizontal: 15,
    width: 44
  },
  icon44Title: {
    flex: 1,
    marginTop: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'center'
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
  fullWidthRatioContainImage: {
    resizeMode: 'contain',
    height: undefined,
    width: '100%',
    aspectRatio: 1 / 1
  },
  fullWidthRatioContainRadius5Image: {
    resizeMode: 'contain',
    height: undefined,
    width: '100%',
    aspectRatio: 1 / 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  image34Contain: {
    height: 34,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain'
  },
  image44Contain: {
    height: 44,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain'
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
  image54Contain: {
    height: 54,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain'
  },
  image65Contain: {
    height: 65,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain'
  },
  image70Contain: {
    height: 70,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain'
  },
  image77Contain: {
    height: 77,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain'
  },
  image70ContainRadius5: {
    height: 70,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
    borderRadius: 5
  },
  image80ContainRadius4: {
    height: 80,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
    borderRadius: 4
  },
  image145Contain: {
    height: 145,
    width: undefined,
    aspectRatio: 1 / 1,
    resizeMode: 'contain'
  },
  image74: {
    height: 74,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image100: {
    height: 100,
    width: undefined,
    aspectRatio: 1 / 1
  },
  image77: {
    resizeMode: 'contain',
    width: 77,
    height: undefined,
    aspectRatio: 1 / 1
  },
  image24: {
    resizeMode: 'contain',
    width: 24,
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
