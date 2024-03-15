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
import { GlobalStyle } from '../../helpers'
import masterColor from '../../config/masterColor';

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "PDP GRID RECOMMENDATION"
 */
const { width, height } = Dimensions.get('window');
class SkeletonType21 extends Component {
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
              <View style={{ alignItems: 'center', width: 130 }}>
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
                    width: '90%'
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={styles.marginPerContent} />;
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          initialScrollIndex={0}
          data={this.state.data}
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={this.renderItem.bind(this)}
          ItemSeparatorComponent={this.renderSeparator}
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
    backgroundColor: masterColor.backgroundWhite
  },
  flatListContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12
  },
  marginPerContent: {
    width: 10
  },
  mainContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxMainContent: {
    paddingBottom: 10,
    paddingHorizontal: 5
  },
  cardMainContent: {
    borderRadius: 5,
    backgroundColor: masterColor.backgroundWhite
  }
});

export default SkeletonType21;
