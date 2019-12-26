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
  type4: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 21,
    lineHeight: 25,
    color: masterColor.fontBlack50
  },
  type5: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 15,
    lineHeight: 20,
    color: masterColor.fontBlack50
  },
  type6: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 25,
    lineHeight: 30,
    color: masterColor.fontWhite
  },
  type7: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 14,
    lineHeight: 18,
    color: masterColor.fontBlack50
  },
  type8: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.fontBlack50
  },
  type9: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.fontBlack60
  },
  type10: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 11,
    lineHeight: 14,
    color: masterColor.fontBlack50
  },
  type11: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 11,
    lineHeight: 14,
    color: masterColor.mainColor
  },
  type12: {
    fontFamily: Fonts.MontserratRegular,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.fontBlack60
  },
  type13: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 10,
    lineHeight: 16,
    color: masterColor.fontRed50
  },
  /** === bottom nav ==== */
  bottomNav: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 10.5,
    lineHeight: 16
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
