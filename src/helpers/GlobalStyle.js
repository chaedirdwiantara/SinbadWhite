import { StyleSheet } from 'react-native';
import masterColor from '../config/masterColor.json';

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
  }
});

export default styles;
