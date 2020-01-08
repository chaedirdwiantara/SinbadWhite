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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import * as ActionCreators from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';
import masterColor from '../../config/masterColor';
import GlobalStyles from '../../helpers/GlobalStyle';
import SkeletonType3 from '../../components/skeleton/SkeletonType3';
import { LoadingLoadMore } from '../../components/Loading';
import Address from '../../components/Address';
import Fonts from '../../helpers/GlobalFont';
import EmptyData from '../../components/empty_state/EmptyData';

class JourneyListDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  onHandleRefresh = () => {
    this.props.journeyPlanGetRefresh();
    this.props.journeyPlanGetProcess({ page: 0, loading: true });
  };

  onHandleLoadMore = () => {
    if (this.props.journey.dataGetJourneyPlan) {
      if (
        this.props.journey.dataGetJourneyPlan.length <
        this.props.journey.totalDataGetJourneyPlan
      ) {
        const page = this.props.journey.pageGetJourneyPlan + 10;
        this.props.journeyPlanGetLoadMore(page);
        this.props.journeyPlanGetProcess({ page, loading: false });
      }
    }
  };
  /** go to detail merchant */
  goToDetailMerchant(storeId) {
    NavigationService.navigate('MerchantDetailView', {
      storeId
    });
  }
  /** go to merchant dashboard */
  goToMerchantDashboard(storeName) {
    NavigationService.navigate('MerchantHomeView', {
      storeName
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
    return <SkeletonType3 />;
  }
  /** === RENDER LOADMORE === */
  renderLoadMore() {
    return this.props.journey.loadingLoadMoreGetJourneyPlan ? (
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
          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            {index !== 0 &&
            item.journeyPlanSaleLogs.findIndex(jp => jp.activity === 'visit') >
              -1 ? (
              <View style={GlobalStyles.lineVerticalDash} />
            ) : (
              <View />
            )}
          </View>
          {item.journeyPlanSaleLogs.length !== 0 ? (
            <MaterialIcons
              name="check-circle"
              color={
                item.journeyPlanSaleLogs.length > 1
                  ? masterColor.fontGreen50
                  : masterColor.fontYellow50
              }
              size={24}
            />
          ) : (
            <MaterialIcons
              name="radio-button-unchecked"
              color={masterColor.fontBlack40}
              size={24}
            />
          )}

          <View
            style={{
              flex: 1,
              alignItems: 'center'
            }}
          >
            {this.props.journey.dataGetJourneyPlan.length > index + 1 ? (
              this.props.journey.dataGetJourneyPlan[
                index + 1
              ].journeyPlanSaleLogs.findIndex(jp => jp.activity === 'visit') >
              -1 ? (
                <View style={GlobalStyles.lineVerticalDash} />
              ) : (
                <View />
              )
            ) : (
              <View />
            )}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.goToMerchantDashboard(item.store.name)}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 13,
            justifyContent: 'space-between',
            flex: 1
          }}
        >
          <View>
            <Text
              style={
                item.storeType === 'exist_store' ? Fonts.type16 : Fonts.type29
              }
            >
              [ID {item.store.storeCode}]
            </Text>
            <Text
              style={
                item.storeType === 'exist_store' ? Fonts.type16 : Fonts.type29
              }
            >
              {item.store.name}
            </Text>
          </View>
          <View>
            <Address
              substring
              font={
                item.storeType === 'exist_store' ? Fonts.type17 : Fonts.type22
              }
              address={item.store.address}
              urban={item.store.urban}
              province={item.store.province}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'space-between',
            paddingVertical: 13
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginBottom: 17
            }}
          >
            <MaterialIcons
              name="motorcycle"
              color={
                item.journeyPlanSaleLogs.findIndex(
                  jp => jp.activity === 'visit'
                ) > -1
                  ? masterColor.fontGreen50
                  : masterColor.fontBlack40
              }
              size={24}
            />
            <View style={{ marginLeft: 10 }} />
            <Octicons
              name="package"
              color={
                item.journeyPlanSaleLogs.findIndex(
                  jp => jp.activity === 'order'
                ) > -1
                  ? masterColor.fontGreen50
                  : masterColor.fontBlack40
              }
              size={24}
            />
          </View>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View style={styles.boxButtonChat}>
              <Text style={Fonts.type28}>Chat</Text>
            </View>
            <TouchableOpacity
              style={styles.boxButtonDetail}
              onPress={() => this.goToDetailMerchant(item.store.id)}
            >
              <Text style={Fonts.type18}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  /** === SEPARATOR FLATLIST === */
  renderSeparator() {
    return <View style={[GlobalStyles.lines, { marginLeft: 50 }]} />;
  }
  /** === RENDER DATA === */
  renderData() {
    return this.props.journey.dataGetJourneyPlan.length > 0
      ? this.renderContent()
      : this.renderEmpty();
  }
  /** === RENDER DATA CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={this.props.journey.dataGetJourneyPlan}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.props.journey.refreshGetJourneyPlan}
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
        title={'Journey Plan Kosong'}
        description={
          'Tambahkan Journey Plan agar aktivitas Anda tercatat di Sinbad'
        }
      />
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.journey.loadingGetJourneyPlan
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
    paddingTop: 30,
    paddingBottom: 60
  },
  boxItem: {
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  boxButtonDetail: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: masterColor.mainColor
  },
  boxButtonChat: {
    marginLeft: 8,
    borderWidth: 1.5,
    borderColor: masterColor.mainColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: masterColor.backgroundWhite
  }
});

const mapStateToProps = ({ user, journey }) => {
  return { user, journey };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JourneyListDataView);
