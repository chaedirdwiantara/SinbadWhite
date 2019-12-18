import Fonts from '../utils/Fonts';
import { StyleSheet } from 'react-native';
import masterColor from '../config/masterColor.json';

const styles = StyleSheet.create({
  /** === regular text === */
  type1: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 40,
    color: masterColor.fontWhite
  },
  type2: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.fontWhite
  },
  type3: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 14,
    lineHeight: 18,
    color: masterColor.fontBlack50
  },
  /** === button text === */
  textButtonRedActive: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: masterColor.fontWhite
  },
  textButtonRedDisabled: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: masterColor.buttonActiveColorWhite
  },
  textButtonWhiteActive: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: masterColor.mainColor
  },
  textButtonWhiteDisabled: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
    color: masterColor.buttonRedDisableColor
  }
});

export default styles;
