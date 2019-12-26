import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor';
import GlobalStyles from '../../helpers/GlobalStyle';
import Fonts from '../../helpers/GlobalFont';

class MerchantListDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** === DID MOUNT === */
  componentDidMount() {}
  onHandleRefresh = () => {
    this.props.merchantGetRefresh();
    this.props.merchantGetProcess({
      page: 0,
      loading: true,
      portfolioId: this.props.user.portfolios[this.props.portfolioIndex].id,
      search: this.props.search
    });
  };

  onHandleLoadMore = () => {
    if (this.props.merchant.dataGetMerchant) {
      if (
        this.props.merchant.dataGetMerchant.length <
        this.props.merchant.totalDataGetMerchant
      ) {
        const page = this.props.merchant.pageGetMerchant + 10;
        this.props.merchantGetLoadMore(page);
        this.props.merchantGetProcess({
          page: 0,
          loading: true,
          portfolioId: this.props.user.portfolios[this.props.portfolioIndex].id,
          search: this.props.search
        });
      }
    }
  };
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  renderItem({ item, index }) {
    return (
      <View key={index} style={styles.boxItem}>
        <View>
          {item.imageUrl !== null ? (
            <Image source={item.imageUrl} style={styles.boxImage} />
          ) : (
            <Image
              source={require('../../assets/images/merchant/merchant_list.png')}
              style={styles.boxImage}
            />
          )}
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <View>
            <Text style={Fonts.type16}>[ID {item.storeCode}]</Text>
            <Text style={Fonts.type16}>{item.name}</Text>
          </View>
          <View>
            <Text style={Fonts.type17}>{item.address}</Text>
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <View style={styles.boxButtonDetail}>
            <Text style={Fonts.type18}>Detail</Text>
          </View>
        </View>
      </View>
    );
  }
  renderItemSkeleton({ item, index }) {
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
  renderSkeleton() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <SkeletonPlaceholder>
            <View style={{ width: '40%', height: 12, borderRadius: 10 }} />
          </SkeletonPlaceholder>
        </View>
        <View style={GlobalStyles.lines} />
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={[1, 2, 3, 4]}
          renderItem={this.renderItemSkeleton.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  renderSeparator() {
    return <View style={[GlobalStyles.lines, { marginLeft: 9 }]} />;
  }
  /** === RENDER DATA === */
  renderData() {
    return (
      <View>
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <Text style={Fonts.type8}>
            {this.props.merchant.totalDataGetMerchant} List Store
          </Text>
        </View>
        <View style={GlobalStyles.lines} />
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.merchant.dataGetMerchant}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.merchant.refreshGetMerchant}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.2}
          onEndReached={this.onHandleLoadMore.bind(this)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.merchant.loadingGetMerchant
          ? this.renderSkeleton()
          : this.renderData()}
      </View>
    );
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
    paddingVertical: 13,
    paddingHorizontal: 16
  },
  boxImage: {
    height: 65,
    width: 65,
    borderRadius: 10
  },
  boxButtonDetail: {
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 4,
    backgroundColor: masterColor.mainColor
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantListDataView);
