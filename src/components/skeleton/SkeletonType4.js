import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList,
  Dimensions
} from '../../library/reactPackage'
import {
  SkeletonPlaceholder
} from '../../library/thirdPartyPackage'
import { Color } from '../../config'
import { GlobalStyle } from '../../helpers'

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "PDP GRID"
 */
const { width, height } = Dimensions.get('window');
class SkeletonType4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7]
    };
  }

  /** === RENDER ITEM SKELETON === */
  renderItem({ item, index }) {
    return (
      <View style={styles.mainContent} key={index}>
        <View style={styles.boxMainContent}>
          <View style={[GlobalStyle.shadow5, styles.cardMainContent]}>
            <SkeletonPlaceholder>
              <View style={{ alignItems: 'center', width: '100%' }}>
                <View style={{ width: '100%', height: 135 }} />
                <View style={{ width: '100%', paddingHorizontal: 11 }}>
                  <View
                    style={{
                      height: 13,
                      borderRadius: 15,
                      marginTop: 10,
                      width: '90%'
                    }}
                  />
                  <View
                    style={{
                      height: 13,
                      borderRadius: 15,
                      marginVertical: 5,
                      width: '70%'
                    }}
                  />
                  <View
                    style={{
                      height: 13,
                      borderRadius: 15,
                      marginVertical: 5,
                      width: '60%'
                    }}
                  />
                  <View
                    style={{
                      height: 10,
                      borderRadius: 15,
                      marginVertical: 5,
                      width: '60%'
                    }}
                  />
                </View>
                <View
                  style={{
                    height: 25,
                    borderRadius: 15,
                    marginVertical: 10,
                    width: 128
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    );
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.state.data}
          scrollEnabled={false}
          numColumns={2}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
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
    flex: 1,
    backgroundColor: Color.backgroundWhite
  },
  flatListContainer: {
    paddingTop: 16,
    paddingHorizontal: 11,
    paddingBottom: 30
  },
  mainContent: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxMainContent: {
    paddingBottom: 10,
    paddingHorizontal: 5,
    width: '100%'
  },
  cardMainContent: {
    borderRadius: 5,
    backgroundColor: Color.backgroundWhite
  }
});

export default SkeletonType4;

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

