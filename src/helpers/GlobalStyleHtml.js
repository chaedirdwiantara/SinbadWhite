import Fonts from '../utils/Fonts';
import { StyleSheet } from 'react-native';
import masterColor from '../config/masterColor.json';

const styles = StyleSheet.create({
  li: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 11,
    color: masterColor.fontBlack50
  },
  p: {
    fontFamily: Fonts.MontserratSemiBold,
    fontSize: 11,
    color: masterColor.fontBlack50,
    marginBottom: -20
  },
  ul: {
    color: masterColor.mainColor
  },
  ol: {
    fontFamily: Fonts.MontserratMedium,
    fontSize: 11,
    color: masterColor.fontBlack50
  }
});

export default styles;
