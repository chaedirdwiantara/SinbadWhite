import {
  React,
  Component,
  View,
  StyleSheet,
  FlatList
} from '../../library/reactPackage';
import { SkeletonPlaceholder } from '../../library/thirdPartyPackage';
import { Color } from '../../config';
import { GlobalStyle } from '../../helpers';

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "History"
 */

class SkeletonType29 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7]
    };
  }

  renderSeparator() {
    return <View style={GlobalStyle.boxPadding} />;
  }
  /** === RENDER ITEM SKELETON === */
  renderItem({ item, index }) {
    return (
      <View key={index}>
        <View style={styles.boxContent}>
          <SkeletonPlaceholder>
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <View
                style={{
                  flex: 1
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: '50%',
                    borderRadius: 10,
                    marginBottom: 8
                  }}
                />
                <View
                  style={{
                    height: 10,
                    width: '80%',
                    borderRadius: 10
                  }}
                />
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <View
                  style={{
                    height: 36,
                    width: '30%',
                    borderRadius: 10
                  }}
                />
              </View>
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  }
  /** RENDER SUMMARY SKELETON */
  renderSummarySkeleton() {
    return (
      <View style={{ paddingVertical: 16, marginHorizontal: 16 }}>
        <SkeletonPlaceholder>
          <View
            style={{
              height: 15,
              width: '50%',
              borderRadius: 10,
              marginBottom: 8
            }}
          />
          <View style={[GlobalStyle.lines, { marginBottom: 8 }]} />
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                flex: 1
              }}
            >
              <View
                style={{
                  height: 10,
                  width: '50%',
                  borderRadius: 10,
                  marginBottom: 8
                }}
              />
              <View
                style={{
                  height: 10,
                  width: '60%',
                  borderRadius: 10
                }}
              />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <View
                style={{
                  height: 10,
                  width: '50%',
                  borderRadius: 10,
                  marginBottom: 8
                }}
              />
              <View
                style={{
                  height: 10,
                  width: '80%',
                  borderRadius: 10
                }}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return (
      <View style={{ marginTop: 8 }}>
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
    return (
      <View style={styles.mainContainer}>
        {this.renderSummarySkeleton()}
        {this.renderSkeleton()}
      </View>
    );
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
  boxContent: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    height: 70,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Color.fontBlack10,
    borderRadius: 8,
    marginHorizontal: 16
  }
});

export default SkeletonType29;
