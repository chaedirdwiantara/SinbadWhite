import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import masterColor from '../../config/masterColor';
import GlobalStyles from '../../helpers/GlobalStyle';

const { height } = Dimensions.get('window');

/**
 * =============================
 * NOTE
 * =============================
 * this skeleton for "JOURNEY PLAN"
 */

class SkeletonType8 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3]
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
            paddingHorizontal: 10,
            flex: 1
          }}
        >
          <SkeletonPlaceholder>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: '50%',
                  height: 12,
                  borderRadius: 10
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  width: '90%',
                  height: 10,
                  borderRadius: 10,
                  marginTop: 8
                }}
              />
              <View
                style={{
                  width: '90%',
                  height: 10,
                  borderRadius: 10,
                  marginTop: 8
                }}
              />
            </View>
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  }
  /** === RENDER SEPARATOR === */
  renderSeparator() {
    return (
      <View
        style={[GlobalStyles.lines, { marginLeft: 16, marginVertical: 10 }]}
      />
    );
  }
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          showsVerticalScrollIndicator={false}
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
  boxItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  boxIcon: {
    width: 24,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 24
  }
});

export default SkeletonType8;
