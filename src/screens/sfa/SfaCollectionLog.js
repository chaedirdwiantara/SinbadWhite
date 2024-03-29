/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from '../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  LoadingPage,
  LoadingLoadMore,
  ToastType1
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';
import SfaNoDataView from './SfaNoDataView';
import { useDispatch, useSelector } from 'react-redux';
import {
  sfaGetCollectionLogProcess,
  sfaCollectionLogLoadmoreProcess
} from '../../state/actions';
import { toLocalTime } from '../../helpers/TimeHelper';
import { APPROVED, PENDING } from '../../constants/collectionConstants';
import { HISTORY } from '../../constants/paymentConstants';

function SfaCollectionLog(props) {
  const type = props.navigation.state.params.type;
  const dispatch = useDispatch();
  const {
    dataSfaGetCollectionLog,
    loadingLoadmoreCollectionLog,
    dataSfaGetDetail,
    dataSfaDeleteCollection,
    selectedStore
  } = useSelector(state => state.sfa);
  const { dataDetailHistory } = useSelector(state => state.history);
  const { selectedMerchant, dataGetMerchantDetailV2 } = useSelector(
    state => state.merchant
  );
  const [limit, setLimit] = useState(20);
  const [isShowToast, setIsShowToast] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  //USEREF
  const prevDataSfaDeleteCollectionRef = useRef(dataSfaDeleteCollection);
  const prevDataSfaGetCollectionLogRef = useRef(dataSfaGetCollectionLog);

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  //USE EFFECT PREV DATA DELETE
  useEffect(() => {
    prevDataSfaDeleteCollectionRef.current = dataSfaDeleteCollection;
  }, []);
  const prevDataSfaDeleteCollection = prevDataSfaDeleteCollectionRef.current;

  //USE EFFECT PREV DATA LOG
  useEffect(() => {
    prevDataSfaGetCollectionLogRef.current = dataSfaGetCollectionLog;
  }, []);
  const prevDataSfaGetCollectionLog = prevDataSfaGetCollectionLogRef.current;

  useEffect(() => {
    if (prevDataSfaDeleteCollection !== dataSfaDeleteCollection) {
      if (prevDataSfaGetCollectionLog !== dataSfaGetCollectionLog) {
        setIsShowToast(true);
        setTimeout(() => {
          setIsShowToast(false);
        }, 3000);
      }
    }
  }, [dataSfaDeleteCollection]);

  useEffect(() => {
    getCollectionLog();
  }, []);

  const navigateToDetail = item => {
    const screenName =
      type === HISTORY ? 'HistoryCollectionDetail' : 'SfaBillingDetailView';
    NavigationService.navigate(screenName, {
      paymentBillingId: item.id
    });
  };
  const loadMore = () => {
    if (dataSfaGetCollectionLog) {
      if (
        dataSfaGetCollectionLog.data.length < dataSfaGetCollectionLog.meta.total
      ) {
        const page = limit + 10;
        setLimit(page);
        dispatch(
          sfaCollectionLogLoadmoreProcess({
            storeId: parseInt(
              selectedStore?.id || selectedMerchant?.storeId,
              10
            ),
            orderParcelId: dataSfaGetDetail.data.id,
            limit: page,
            skip: 1
          })
        );
      }
    }
  };
  /** REFRESH LIST VIEW */
  const onHandleRefresh = () => {
    getCollectionLog();
  };
  const getCollectionLog = () => {
    const orderParcelId =
      type === HISTORY
        ? dataDetailHistory.billing.orderParcelId
        : dataSfaGetDetail.data.id;
    const storeId =
      type === HISTORY
        ? parseInt(dataDetailHistory?.store.id, 10)
        : selectedStore?.id || selectedMerchant?.storeId;
    const data = {
      storeId: parseInt(storeId, 10),
      orderParcelId: parseInt(orderParcelId, 10),
      limit: limit,
      skip: 0
    };
    dispatch(sfaGetCollectionLogProcess(data));
  };

  /** RENDER CONTENT LIST GLOBAL */
  const renderContentListGlobal = (key, value, black, bold, red) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text
            numberOfLines={1}
            style={black ? Fonts.type17 : bold ? Fonts.type50 : Fonts.type96}
          >
            {key}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text
            accessible={true}
            accessibilityLabel={'txtDetailValueGlobal'}
            style={[
              red ? Fonts.type113p : Fonts.type17,
              { textAlign: 'right' }
            ]}
          >
            {value}
          </Text>
        </View>
      </View>
    );
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  const renderToast = () => {
    return isShowToast ? (
      <ToastType1 margin={10} content={'Transaksi Berhasil Dihapus'} />
    ) : (
      <View />
    );
  };

  //**RENDER ITEM */
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ marginHorizontal: 16, marginVertical: 8 }}>
        <TouchableOpacity
          style={[styles.listContainer, GlobalStyle.shadowForBox]}
          onPress={() => navigateToDetail(item)}
        >
          <View style={styles.statusContainer}>
            {item.status ? (
              <View>
                <Text
                  style={{
                    ...(item.status === APPROVED
                      ? Fonts.type92
                      : item.status === PENDING
                      ? Fonts.type114p
                      : Fonts.type115p),
                    backgroundColor:
                      item.status === APPROVED
                        ? '#E1F7E8'
                        : item.status === PENDING
                        ? '#FFF0D1'
                        : '#FAC0C3',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 100
                  }}
                >
                  {item.status === APPROVED
                    ? 'Disetujui'
                    : item.status === PENDING
                    ? 'Menunggu'
                    : 'Ditolak'}
                </Text>
              </View>
            ) : (
              <View style={{ width: 16 }} />
            )}
            <View>
              <View style={{ alignSelf: 'center' }}>
                <MaterialIcon
                  name="chevron-right"
                  color={masterColor.fontBlack80}
                  size={24}
                  style={{ marginLeft: 8 }}
                />
              </View>
            </View>
          </View>
          <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
          <View>
            <View style={styles.salesContainer}>
              {renderContentListGlobal('Nomor Pesanan', item.orderCode)}
              {renderContentListGlobal(
                'Tanggal Pembayaran',
                toLocalTime(item.createdAt, 'DD MMM YYYY')
              )}
              {renderContentListGlobal(
                'Metode Penagihan',
                item.paymentCollectionMethodName
              )}
              {renderContentListGlobal('Salesman', item.salesName)}
              {renderContentListGlobal(
                'Total Pembayaran',
                MoneyFormatSpace(item.amount),
                true
              )}
            </View>
          </View>
          <View style={{ ...GlobalStyle.lines, marginLeft: 16 }} />
        </TouchableOpacity>
      </View>
    );
  };

  /** === RENDER COLLECTIONLIST === */
  const renderCollectionList = () => {
    return (
      <View style={styles.container}>
        {dataSfaGetCollectionLog ? (
          dataSfaGetCollectionLog.data !== null ? (
            <FlatList
              data={dataSfaGetCollectionLog.data}
              renderItem={renderItem}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.2}
              onEndReached={() => loadMore()}
              showsVerticalScrollIndicator
              refreshing={refreshing}
              onRefresh={() => onHandleRefresh()}
            />
          ) : (
            <View style={{ marginTop: '20%' }}>
              <SfaNoDataView
                topText={'Tidak Ada Transaksi'}
                midText={'Belum ada transaksi yang telah dilakukan'}
                bottomText={''}
              />
            </View>
          )
        ) : (
          <LoadingPage />
        )}
        {loadingLoadmoreCollectionLog ? <LoadingLoadMore /> : null}
      </View>
    );
  };
  /** === RENDER CONTENT === */
  const renderContent = () => {
    return (
      <View style={styles.container}>
        {renderToast()}
        {renderCollectionList()}
      </View>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <View style={styles.mainContainer}>
      <StatusBarWhite />
      <View style={styles.container}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  container: {
    flex: 1,
    marginTop: 4
  },
  listContainer: {
    borderColor: masterColor.fontBlack10,
    borderWidth: 1,
    borderRadius: 8
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 16
  },
  salesContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapDispatchToProps)(SfaCollectionLog);
