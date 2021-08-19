import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  StatusBarWhite,
  SearchBarType1,
  TagListType2,
  SkeletonType2,
  SkeletonType28,
  SkeletonType27
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import SfaInvoiceListView from './SfaInvoiceListView';
import { ScrollView } from 'react-native-gesture-handler';
import {
  sfaGetCollectionListProcess,
  sfaGetCollectionStatusProcess,
  SfaGetLoadMore,
  sfaGetRefresh
} from '../../state/actions/SfaAction';

const SfaView = props => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const {
    loadingGetCollectionStatus,
    dataGetCollectionStatus,
    loadingGetCollectionList,
    dataGetCollectionList,
    loadingLoadMoreGetSfa
  } = useSelector(state => state.sfa);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const { userSuppliers } = useSelector(state => state.user);
  const [selectedTagStatus, setSelectedTagStatus] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [limit, setLimit] = useState(20);

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  useEffect(() => {
    getCollectionList(true, 20);
  }, [paymentStatus, searchText]);

  useEffect(() => {
    getCollectionStatus();
  }, []);

  const getCollectionStatus = () => {
    dispatch(sfaGetCollectionStatusProcess());
  };

  const getCollectionList = (loading, page) => {
    const storeId = parseInt(selectedMerchant.storeId);
    const data = {
      limit: page,
      storeId: storeId,
      supplierId: parseInt(userSuppliers[0].supplier.id),
      keyword: searchText,
      statusPayment: paymentStatus,
      loading: loading,
      skip: 0
    };
    dispatch(sfaGetCollectionListProcess(data));
  };

  /** PARENT FUNCTION */
  const parentFunction = data => {
    if (data.type === 'status') {
      setPaymentStatus(dataGetCollectionStatus.data[data.data].status);
      setSelectedTagStatus(data.data);
    } else if (data.type === 'search') {
      setSearchText(data.data);
    }
  };

  const onHandleLoadMore = () => {
    if (dataGetCollectionList) {
      if (
        dataGetCollectionList.data.orderParcels.length <
        dataGetCollectionList.data.totalInvoice
      ) {
        const page = limit + 10;

        setLimit(page);
        dispatch(SfaGetLoadMore(page));
        getCollectionList(false, page);
      }
    }
  };

  const onHandleRefresh = () => {
    dispatch(sfaGetRefresh());
    getCollectionList(true, 20);
  };
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  const renderCollectionList = () => {
    return (
      <>
        {loadingGetCollectionList ? (
          renderSkeletonList()
        ) : (
          <SfaInvoiceListView
            dataList={dataGetCollectionList}
            status={dataGetCollectionStatus}
            searchText={searchText}
            loadmore={onHandleLoadMore}
            refersh={onHandleRefresh}
          />
        )}
      </>
    );
  };
  /** === RENDER SKELETON TAGS === */
  const renderSkeletonTags = () => {
    return (
      <View>
        <SkeletonType2 />
        <View style={GlobalStyle.lines} />
      </View>
    );
  };
  const renderSkeletonList = () => {
    return <SkeletonType28 />;
  };
  /** === TAGS SECTION === */
  const renderTagsContent = () => {
    const status = dataGetCollectionStatus;
    return (
      <>
        {!loadingGetCollectionStatus && dataGetCollectionStatus ? (
          <>
            <TagListType2
              selected={selectedTagStatus}
              onRef={ref => (parentFunction = ref)}
              parentFunction={parentFunction.bind(this)}
              data={status.data}
            />
            <View style={GlobalStyle.lines} />
          </>
        ) : (
          renderSkeletonTags()
        )}
      </>
    );
  };
  /** === RENDER FOOTER === */
  const renderFooter = () => {
    const data = dataGetCollectionList;
    return (
      <>
        <View style={GlobalStyle.lines} />
        <View style={styles.footer}>
          {!loadingGetCollectionList && dataGetCollectionList ? (
            <View style={{ flexDirection: 'row' }}>
              <View style={{marginRight:24}}>
                <Text style={[Fonts.type47, styles.textRight]}>Total Faktur</Text>
                <Text style={[Fonts.type47, styles.textRight]}>Total Sisa Tagihan</Text>
                {/* <Text style={[Fonts.type47, styles.textRight]}>Total Terbayar</Text> */}
                <Text style={[Fonts.type47, styles.textRight]}>Total Sisa Tagihan Overdue</Text>
              </View>
              <View>
                <Text style={[Fonts.type28, styles.textRight]}>
                  {dataGetCollectionList.data.totalInvoice}
                </Text>
                <Text style={[Fonts.type28, styles.textRight]}>
                  {MoneyFormatSpace(dataGetCollectionList.data.totalInvoiceAmount)}
                </Text>
                {/* <Text style={[Fonts.type28, styles.textRight]}>
                  {MoneyFormatSpace(dataGetCollectionList.data.totalAmountPaid)}
                </Text> */}
                <Text style={[Fonts.type28, styles.textRight]}>
                  {MoneyFormatSpace(
                    dataGetCollectionList.data.totalOutstandingAmount
                  )}
                </Text>
              </View>
            </View>
          ) : (
            <SkeletonType27 />
          )}
        </View>
      </>
    );
  };
  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderSearchAndFilter()}
        {renderTagsContent()}
        <View style={{ flex: 1 }}>
          {loadingGetCollectionList
            ? renderSkeletonList()
            : renderCollectionList()}
        </View>
        <View>{renderFooter()}</View>
      </View>
    );
  };

  /** === RENDER FILTER AND SEARCH === */
  const renderSearchAndFilter = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <SearchBarType1
              placeholder={'Cari tagihan disini'}
              searchText={searchText}
              onRef={ref => (parentFunction = ref)}
              parentFunction={parentFunction.bind(this)}
            />
          </View>
        </View>
        <View style={GlobalStyle.lines} />
      </View>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <View style={{ flex: 1 }}>{renderContent()}</View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: masterColor.backgroundWhite
    // position:'absolute'
    // display: 'flex',
    // flexDirection: 'row'
  },
  footer1: {
    flex: 1
  },
  footerText: {
    display: 'flex',
    flexDirection: 'row'
  },
  textLeft:{textAlign:'right', marginBottom:4},
  textRight:{ marginBottom: 4}
});

export default SfaView;
// export default DMSView;
