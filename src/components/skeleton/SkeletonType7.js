import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import GlobalStyle from '../../helpers/GlobalStyle';
/**
 * ==========================
 * NOTE
 * =========================
 * this for skeleton tag list
 */

class SkeletonType7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
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
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <View
              style={{ flex: 1, marginRight: 30, justifyContent: 'center' }}
            >
              <View style={styles.boxList} />
            </View>
            <View
              style={{ flex: 1, marginRight: 50, justifyContent: 'center' }}
            >
              <View style={styles.boxList} />
            </View>
            <View style={styles.boxButton} />
          </View>
        </SkeletonPlaceholder>

        <View style={GlobalStyle.lines} />
      </View>
    );
  }
  /** === DATA VIEW === */
  renderData() {
    return (
      <View>
        <FlatList
          initialScrollIndex={0}
          showsHorizontalScrollIndicator={false}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
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
  boxList: {
    borderRadius: 20,
    height: 13
  },
  boxButton: {
    height: 28,
    width: 75,
    borderRadius: 4
  }
});

export default SkeletonType7;
