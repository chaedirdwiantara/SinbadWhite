import {
  React,
  Component,
  View,
  StyleSheet,
  Text
} from '../../../library/reactPackage';
import { Color } from '../../../config';
import { Fonts } from '../../../helpers';

export class MssTagV2 extends Component {
  render() {
    const { item } = this.props;

    /** TODO: specify mss core/mss only */
    const core = false;

    if (item.isMss) {
      return (
        <View style={[styles.mainContainer, { 
          backgroundColor: core ? Color.fontRed10OP10 : Color.fontGreen50OP10
         }]}>
          <Text style={[Fonts.type108, {
            color: core ? Color.mainColor : Color.fontGreen50
          }]}>
            {core ? 'MSS Core' : 'MSS'}
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
