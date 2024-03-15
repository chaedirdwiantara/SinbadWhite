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
import { GlobalStyle } from '../../helpers'
import { Color } from '../../config'

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "LIST TOKO"
 */

class SkeletonType1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7]
    };
  }
  /** === RENDER ITEM SKELETON === */
  renderItem({ item, index }) {
    return (
      <View key={index} style={styles.boxItem}>
        <SkeletonPlaceholder>
          <View style={styles.boxImage} />
        </SkeletonPlaceholder>
        <View
          style={{
            paddingHorizontal: 16,
            flex: 1
          }}
        >
          <SkeletonPlaceholder>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: '50%',
                  height: 12,
                  marginBottom: 5,
                  borderRadius: 10
                }}
              />
              <View style={{ width: '80%', height: 12, borderRadius: 10 }} />
            </View>
            <View style={{ flex: 1, marginTop: 10 }}>
              <View
                style={{
                  width: '50%',
                  height: 10,
                  borderRadius: 10,
                  marginBottom: 5
                }}
              />
              <View style={{ width: '80%', height: 10, borderRadius: 10 }} />
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  }
  /** === RENDER SEPARATOR === */
  renderSeparator() {
    return <View style={[GlobalStyle.lines, { marginLeft: 9 }]} />;
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return (
      <View>
        {/* <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <SkeletonPlaceholder>
            <View style={{ width: '40%', height: 12, borderRadius: 10 }} />
          </SkeletonPlaceholder>
        </View>
        <View style={GlobalStyle.lines} /> */}
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.state.data}
          scrollEnabled={false}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return <View style={styles.mainContainer}>{this.renderSkeleton()}</View>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    backgroundColor: Color.backgroundWhite
  },
  flatListContainer: {
    paddingBottom: 16
  },
  boxItem: {
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  boxImage: {
    height: 65,
    width: 65,
    borderRadius: 10
  }
});

export default SkeletonType1;

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

