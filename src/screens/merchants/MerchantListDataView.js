import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import Text from 'react-native-text';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor';
import GlobalStyles from '../../helpers/GlobalStyle';
import SkeletonType1 from '../../components/skeleton/SkeletonType1';
import { LoadingLoadMore } from '../../components/Loading';
import Address from '../../components/Address';
import Fonts from '../../helpers/GlobalFont';
import EmptyData from '../../components/empty_state/EmptyData';
import NavigationService from '../../navigation/NavigationService';

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
  /** REFRESH LIST VIEW */
  onHandleRefresh = () => {
    this.props.merchantGetRefresh();
    this.props.merchantGetProcess({
      page: 0,
      loading: true,
      portfolioId: this.props.merchant.dataGetPortfolio[
        this.props.portfolioIndex
      ].id,
      search: this.props.search
    });
  };
  /** LOAD MORE LIST VIEW */
  onHandleLoadMore = () => {
    if (this.props.merchant.dataGetMerchant) {
      if (
        this.props.merchant.dataGetMerchant.length <
        this.props.merchant.totalDataGetMerchant
      ) {
        const page = this.props.merchant.pageGetMerchant + 10;
        this.props.merchantGetLoadMore(page);
        this.props.merchantGetProcess({
          page,
          loading: false,
          portfolioId: this.props.merchant.dataGetPortfolio[
            this.props.portfolioIndex
          ].id,
          search: this.props.search
        });
      }
    }
  };
  /** GO TO MERCHANT DETAIL */
  goToDetailMerchant(storeId) {
    NavigationService.navigate('MerchantDetailView', {
      storeId
    });
  }
  /**
   * ======================
   * RENDER VIEW
   * ======================
   */
  /**
   * =====================
   * LOADING
   * =====================
   */
  /** === RENDER SKELETON === */
  renderSkeleton() {
    return <SkeletonType1 />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.merchant.loadingLoadMoreGetMerchant ? (
      <LoadingLoadMore />
    ) : (
      <View />
    );
  }

  /** === RENDER ITEM === */
  renderItem({ item, index }) {
    return (
      <View key={index} style={styles.boxItem}>
        <View>
          {item.imageUrl !== null ? (
            <Image source={{ uri: item.imageUrl }} style={styles.boxImage} />
          ) : (
            <Image
              source={require('../../assets/images/merchant/store.png')}
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
            <Address
              substring
              font={Fonts.type17}
              address={item.address}
              urban={item.urban}
              province={item.province}
            />
          </View>
        </View>
        <View style={{ justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={styles.boxButtonDetail}
            onPress={() => this.goToDetailMerchant(item.id)}
          >
            <Text style={Fonts.type18}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={[GlobalStyles.lines, { marginLeft: 9 }]} />;
  }
  /** === RENDER DATA === */
  renderData() {
    return this.props.merchant.dataGetMerchant.length > 0
      ? this.renderContent()
      : this.renderEmpty();
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.merchant.dataGetMerchant}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.merchant.refreshGetMerchant}
          onRefresh={this.onHandleRefresh}
          onEndReachedThreshold={0.1}
          onEndReached={this.onHandleLoadMore.bind(this)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
  /** === RENDER EMPTY === */
  renderEmpty() {
    return (
      <EmptyData
        title={'List Toko Kosong'}
        description={'Maaf , Anda tidak mempunyai list toko'}
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.merchant.loadingGetMerchant
          ? this.renderSkeleton()
          : this.renderData()}
        {/* for loadmore */}
        {this.renderLoadMore()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  flatListContainer: {
    paddingBottom: 26
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
