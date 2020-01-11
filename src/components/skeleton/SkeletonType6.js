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

class SkeletonType6 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [1, 2, 3]
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
        <View
          style={{
            paddingHorizontal: 16,
            paddingVertical: 16
          }}
        >
          <SkeletonPlaceholder>
            <View style={styles.boxList} />
          </SkeletonPlaceholder>
        </View>

        <View style={GlobalStyle.lines} />
      </View>
    );
  }
  /** === DATA VIEW === */
  renderData() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.boxFlatlist}
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
  boxFlatlist: {
    paddingVertical: 16
  },
  boxList: {
    borderRadius: 20,
    height: 10,
    width: '60%'
  }
});

export default SkeletonType6;
