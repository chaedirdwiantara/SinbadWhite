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
import { Color } from '../../../config';
import { Fonts } from '../../../helpers';

export class MssTag extends Component {
  render() {
    const { item } = this.props;

    /** TODO: specify mss core/mss only */
    const core = false;

    if (item.isMss) {
      return (
        <View style={[styles.mainContainer]}>
          <View
            style={[styles.tagContainer, {
              backgroundColor: core ? Color.fontRed10OP10 : Color.fontGreen50OP10
            }]}
          >
            <MaterialIcon name="stars" color={core ? Color.mainColor : Color.fontGreen50} size={18} />
            <Text style={[Fonts.type108, { 
              paddingHorizontal: 4,
              color: core ? Color.mainColor : Color.fontGreen50 
            }]}>
              {core ? 'MSS Core' : 'MSS'}
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
