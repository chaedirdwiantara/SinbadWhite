import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../../library/reactPackage';
import { Fonts } from '../../../helpers';

export class MssTagV2 extends Component {
  render() {
    const { item } = this.props;

    if (item.mssSetting?.id) {
      return (
        <View style={[styles.mainContainer, { 
          backgroundColor: item.mssSetting?.backgroundColor
         }]}>
          <Text style={[Fonts.type108, {
            color: item.mssSetting?.color
          }]}>
            {item.mssSetting?.name}
          </Text>
        </View>
      )
    }

    return <View />
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'flex-start',
    marginHorizontal: 16,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4
  }
});

export default MssTagV2

/**
 * ============================
 * NOTES
 * ============================
 * createdBy: Raka
 * createdDate: 04042022
 * updatedBy:
 * updatedDate: 
 * updatedFunction:
 * -> 
 * -> 
 */
