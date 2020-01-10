import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import masterColor from '../../config/masterColor';
import GlobalStyles from '../../helpers/GlobalStyle';

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "JOURNEY PLAN"
 */

class SkeletonType3 extends Component {
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
        <View style={styles.boxIcon}>
          <SkeletonPlaceholder>
            <View style={styles.circle} />
          </SkeletonPlaceholder>
        </View>

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
    return <View style={[GlobalStyles.lines, { marginLeft: 9 }]} />;
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
    paddingTop: 10,
    paddingBottom: 16
  },
  boxItem: {
    flexDirection: 'row',
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  boxIcon: {
    height: 65,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 24
  }
});

export default SkeletonType3;
