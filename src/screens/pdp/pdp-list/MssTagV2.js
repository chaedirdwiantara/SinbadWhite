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

    if (item.mssSettings?.id) {
      return (
        <View style={[styles.mainContainer, { 
          backgroundColor: item.mssSettings?.backgroundColor
         }]}>
          <Text style={[Fonts.type108, {
            color: item.mssSettings?.color
          }]}>
            {item.mssSettings?.name}
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
