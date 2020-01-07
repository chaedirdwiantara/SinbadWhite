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
  type14: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 10,
    lineHeight: 13,
    color: masterColor.fontRed50
  },
  type15: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 21,
    lineHeight: 25,
    color: masterColor.fontRed50
  },
  type16: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.fontBlack50
  },
  type17: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 11,
    lineHeight: 14,
    color: masterColor.fontBlack50
  },
  type18: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 10,
    lineHeight: 13,
    color: masterColor.fontWhite
  },
  type19: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 13,
    lineHeight: 16,
    color: masterColor.fontWhite
  },
  type20: {
    fontFamily: Fonts.MontserratRegular,
    fontSize: 13,
    lineHeight: 16,
    color: masterColor.fontWhite
  },
  type21: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.mainColor
  },
  type22: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 11,
    lineHeight: 14,
    color: masterColor.mainColor
  },
  type23: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.fontBlack80
  },
  type24: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.2,
    color: masterColor.fontBlack50
  },
  type25: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.fontWhite
  },
  type26: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 10,
    lineHeight: 13,
    color: masterColor.fontWhite
  },
  type27: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 18,
    lineHeight: 22,
    color: masterColor.fontWhite
  },
  type28: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 10,
    lineHeight: 13,
    color: masterColor.mainColor
  },
  type29: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.mainColor
  },
  type30: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 13,
    lineHeight: 16,
    color: masterColor.fontBlack50
  },
  type31: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 11,
    lineHeight: 14,
    color: masterColor.fontBlack40
  },
  type32: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.1,
    color: masterColor.fontBlack50
  },
  type33: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 13,
    lineHeight: 16,
    letterSpacing: 0.2,
    color: masterColor.fontBlack40
  },
  type34: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 13,
    lineHeight: 16,
    color: masterColor.fontBlack60
  },
  type35: {
    fontFamily: Fonts.MontserratBold,
    fontSize: 15,
    lineHeight: 20,
    color: masterColor.fontWhite
  },
  forCompare: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 12,
    lineHeight: 15,
    color: masterColor.fontBlack50
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
