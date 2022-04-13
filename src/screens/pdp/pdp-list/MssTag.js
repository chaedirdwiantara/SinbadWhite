import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../../library/reactPackage';
import {
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import { Fonts } from '../../../helpers';

export class MssTag extends Component {
  render() {
    const { item } = this.props;

    if (item.mssSetting?.id) {
      return (
        <View style={[styles.mainContainer]}>
          <View
            style={[styles.tagContainer, {
              backgroundColor: item.mssSetting?.backgroundColor //core ? Color.fontRed10OP10 : Color.fontGreen50OP10
            }]}
          >
            <MaterialIcon name="stars" color={item.mssSetting?.color} size={18} />
            <Text style={[Fonts.type108, { 
              paddingHorizontal: 4,
              color: item.mssSetting?.color
            }]}>
              {item.mssSetting?.name}
            </Text>
          </View>
        </View>
      )
    }

    return <View />
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingBottom: 8
  },
  tagContainer: {
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default MssTag

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
