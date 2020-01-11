import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import masterColor from '../../config/masterColor';
import GlobalStyles from '../../helpers/GlobalStyle';

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "History"
 */

class SkeletonType5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7]
    };
  }

  renderSeparator() {
    return <View style={GlobalStyles.boxPadding} />;
  }
  /** === RENDER ITEM SKELETON === */
  renderItem({ item, index }) {
    return (
      <View style={GlobalStyles.shadowForBox} key={index}>
        <View style={styles.boxContent}>
          <View>
            <SkeletonPlaceholder>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: '30%',
                    borderRadius: 10
                  }}
                />
                <View
                  style={{
                    height: 10,
                    width: '30%',
                    borderRadius: 10
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: '35%',
                    borderRadius: 10
                  }}
                />
                <View
                  style={{
                    height: 10,
                    width: '40%',
                    borderRadius: 10
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
          <View style={[GlobalStyles.lines, { marginVertical: 10 }]} />
          <SkeletonPlaceholder>
            <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
              <View
                style={[
                  GlobalStyles.image60,
                  { borderRadius: 10, marginHorizontal: 5 }
                ]}
              />
              <View
                style={[
                  GlobalStyles.image60,
                  { borderRadius: 10, marginHorizontal: 5 }
                ]}
              />
              <View
                style={[
                  GlobalStyles.image60,
                  { borderRadius: 10, marginHorizontal: 5 }
                ]}
              />
            </View>
          </SkeletonPlaceholder>
          <View style={[GlobalStyles.lines, { marginVertical: 10 }]} />
          <SkeletonPlaceholder>
            <View
              style={{
                height: 8,
                width: '30%',
                borderRadius: 10
              }}
            />
          </SkeletonPlaceholder>
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
    backgroundColor: masterColor.backgroundWhite
  },
  flatListContainer: {
    paddingBottom: 16
  },
  boxContent: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16
  }
});

export default SkeletonType5;
