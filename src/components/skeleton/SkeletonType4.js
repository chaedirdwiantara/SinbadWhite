import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Card } from 'react-native-elements';
import masterColor from '../../config/masterColor';
import GlobalStyles from '../../helpers/GlobalStyle';

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
      <View style={styles.boxContentList}>
        <Card containerStyle={styles.cardProduct}>
          <View style={styles.boxContentListCard}>
            <SkeletonPlaceholder>
              <View style={{ alignItems: 'center', width: '100%' }}>
                <View
                  style={[
                    styles.boxImage,
                    { borderRadius: 15, width: '100%', height: '50%' }
                  ]}
                />
                <View style={styles.titleName} />
                <View style={styles.prices} />
                <View
                  style={{
                    height: '5%',
                    borderRadius: 15,
                    marginVertical: 5,
                    width: '60%'
                  }}
                />
                <View
                  style={{
                    height: 25,
                    borderRadius: 15,
                    marginVertical: 5,
                    width: 120
                  }}
                />
              </View>
            </SkeletonPlaceholder>
          </View>
        </Card>
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
          numColumns={2}
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
    paddingTop: 30,
    paddingBottom: 16
  },
  boxImage: {
    height: '55%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxContentList: {
    height: 0.35 * height,
    width: '50%',
    paddingHorizontal: '1.5%',
    paddingVertical: '1.5%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxFlatlist: {
    paddingTop: 10,
    paddingBottom: 70,
    paddingHorizontal: 5
  },
  cardProduct: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
    padding: 0,
    borderWidth: 0,
    elevation: 2,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowColor: '#777777',
    margin: 0,
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignItems: 'center'
  },
  boxContentListCard: {
    height: '100%',
    padding: 10,
    width: 0.45 * width
  },
  titleName: {
    height: '8%',
    borderRadius: 15,
    marginTop: 5,
    width: '90%'
  },
  prices: {
    height: '5%',
    borderRadius: 15,
    marginTop: 2,
    width: '100%'
  }
});

export default SkeletonType4;
