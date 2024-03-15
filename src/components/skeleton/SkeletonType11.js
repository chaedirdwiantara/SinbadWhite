import {
  React,
  Component,
  View,
  StyleSheet
} from '../../library/reactPackage'
import {
  SkeletonPlaceholder
} from '../../library/thirdPartyPackage'
import {
  GlobalMenuList
} from '../../library/component'
import masterColor from '../../config/masterColor.json';
/**
 * ==========================
 * NOTE
 * =========================
 * this for skeleton category
 */

class SkeletonType11 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4]
    };
  }
  /**
   * =======================
   * RENDER VIEW
   * ======================
   */
  /** === ITEM DATA === */
  renderItem(index, item) {
    return item !== undefined ? (
      <SkeletonPlaceholder>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={styles.square} />
          <View style={styles.squareText} />
        </View>
      </SkeletonPlaceholder>
    ) : (
      <View />
    );
  }
  /** === MAIN VIEW === */
  render() {
    return (
      <View style={styles.mainContainer}>
        <GlobalMenuList
          flexLayout
          data={this.state.data}
          column={4}
          renderView={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    backgroundColor: masterColor.backgroundWhite
  },
  square: {
    borderRadius: 16,
    height: 50,
    width: 50
  },
  squareText: {
    marginTop: 13,
    borderRadius: 10,
    marginHorizontal: 12,
    height: 11,
    width: 60
  }
});

export default SkeletonType11;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: tatas
* updatedDate: 25062020
* updatedFunction:
* -> Refactoring Module Import
* 
*/
