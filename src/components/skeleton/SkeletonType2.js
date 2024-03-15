import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList
} from '../../library/reactPackage'
import {
  SkeletonPlaceholder
} from '../../library/thirdPartyPackage'
/**
 * ==========================
 * NOTE
 * =========================
 * this for skeleton tag list (chips)
 */

class SkeletonType2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6]
    };
  }
  /**
   * =======================
   * RENDER VIEW
   * ======================
   */
  /** === ITEM DATA === */
  renderItem({ item, index }) {
    return (
      <View key={index}>
        <SkeletonPlaceholder>
          <View style={styles.boxChip} />
        </SkeletonPlaceholder>
      </View>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={styles.marginPerTag} />;
  }
  /** === DATA VIEW === */
  renderData() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.boxTag}
          initialScrollIndex={0}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  /** === MAIN VIEW === */
  render() {
    return <View>{this.renderData()}</View>;
  }
}

const styles = StyleSheet.create({
  boxTag: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  boxChip: {
    borderRadius: 20,
    height: 32,
    width: 120
  },
  marginPerTag: {
    width: 16
  }
});

export default SkeletonType2;

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 08072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/
