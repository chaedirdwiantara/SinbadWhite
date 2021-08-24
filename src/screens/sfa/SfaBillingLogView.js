import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from '../../library/reactPackage';
import { MaterialIcon, moment } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';
import { GlobalStyle, Fonts, MoneyFormatSpace } from '../../helpers';
import {
  APPROVED,
  REJECTED,
  PENDING
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';
import {
  ButtonSingle,
  LoadingPage,
  LoadingLoadMore
} from '../../library/component';
import {
  sfaGetReferenceListProcess,
  sfaCollectionListLoadmoreProcess,
  sfaGetPaymentCollectionLogProcess
} from '../../state/actions';
const SfaBillingLogView = props => {
  const dispatch = useDispatch();
  const collectionMethodId =
    props.navigation.state.params.paymentCollectionTypeId;
  const paymentCollectionMethodId = props.navigation.state.params.collectionId;
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(4);
  const {
    dataGetReferenceList,
    loadingLoadMoreGetReferenceList,
    loadingSfaGetPaymentCollectionLog,
    dataSfaGetPaymentCollectionLog
  } = useSelector(state => state.sfa);
  const { userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);

  //** FUNCTION GET PAYMENT LOG */
  const getPaymentCollectionLog = (loading, page) => {
    const data = {
      paymentCollectionMethodId: paymentCollectionMethodId,
      limit: 10,
      storeId: parseInt(selectedMerchant.storeId, 10),
      skip: 0
    };
    dispatch(sfaGetPaymentCollectionLogProcess(data));
  };
  /** FUNCTION GET COLLECTION LIST */
  const getCollectionList = (loading, page) => {
    const data = {
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      storeId: parseInt(selectedMerchant.storeId, 10),
      paymentCollectionTypeId: parseInt(collectionMethodId, 10),
      userId: parseInt(userSuppliers[0].userId, 10),
      limit: page,
      loading: loading
    };
    dispatch(sfaGetReferenceListProcess(data));
  };
  useEffect(() => {
    getCollectionList(true, 10);
    getPaymentCollectionLog(true, 10);
  }, []);

  /** FUNCTION NAVIGATE TO EDIT BILLING */
  const navigatetoEditBilling = item => {
    NavigationService.navigate('SfaBillingEditView', {
      ...item,
      paymentCollectionTypeId: parseInt(collectionMethodId, 10)
    });
  };
  /** FUNCTION REFRESH COLLECTION LIST */
  const onHandleRefresh = () => {
    getCollectionList(true, 10);
  };

  const onLoadMore = () => {
    if (dataGetReferenceList) {
      if (dataGetReferenceList.data.length < dataGetReferenceList.meta.total) {
        const page = limit + 10;
        setLimit(page);
        dispatch(sfaCollectionListLoadmoreProcess(page));
        getCollectionList(false, page);
      }
    }
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
  /** RENDER BUTTON */
  const renderButton = (title, type, disable, action, item) => {
    return (
      <TouchableOpacity
        disabled={disable}
        style={{
          ...styles.buttonSmall,
          backgroundColor:
            type === 'red' && disable
              ? masterColor.buttonRedDisableColor
              : type === 'red'
              ? masterColor.mainColor
              : masterColor.fontWhite,
          borderColor: disable
            ? masterColor.buttonRedDisableColor
            : masterColor.mainColor
        }}
        onPress={() => action(item)}
      >
        <Text
          style={[
            type === 'red' ? Fonts.type39 : Fonts.type11,
            { opacity: disable ? 0.5 : null }
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  /**
   * =======================
   * RENDER COLLECTION LIST
   * =======================
   */
  const renderItem = ({ item, index }) => {
    return (
      <View key={index} style={{ marginVertical: 8, marginHorizontal: 16 }}>
        <TouchableOpacity
          style={[styles.listContainer, GlobalStyle.shadowForBox]}
          onPress={() =>
            NavigationService.navigate('SfaBillingDetailView', {
              paymentBillingId: item.id
            })
          }
        >
          <View style={styles.statusContainer}>
            {item.approvalStatus ? (
              <View>
                <Text
                  style={{
                    ...(item.approvalStatus === APPROVED
                      ? Fonts.type92
                      : item.approvalStatus === PENDING
                      ? Fonts.type114p
                      : Fonts.type115p),
                    backgroundColor:
                      item.approvalStatus === APPROVED
                        ? '#E1F7E8'
                        : item.approvalStatus === PENDING
                        ? '#FFF0D1'
                        : '#FAC0C3',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 100
                  }}
                >
                  {item.approvalStatus === APPROVED
                    ? 'Disetujui'
                    : item.approvalStatus === PENDING
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

          <View style={styles.salesContainer}>
            <View>
              {renderContentListGlobal('Nomor Pesanan', item.orderCode)}
              {renderContentListGlobal(
                'Tanggal Pembayaran',
                moment(new Date(item.createdAt)).format('DD MMM YYYY')
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
            <View style={styles.buttonContainer}>
              {renderButton(
                'Ubah',
                'white',
                !item.isEditable,
                navigatetoEditBilling.bind(item),
                item
              )}
              {renderButton(
                'Hapus',
                'white',
                !item.isEditable,
                navigatetoEditBilling.bind(item),
                item
              )}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end'
              }}
            />
          </View>
          <View style={{ ...GlobalStyle.lines, marginLeft: 16 }} />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * =======================
   * RENDER COLLECTION LIST
   * =======================
   */
  const renderCollectionList = () => {
    return dataSfaGetPaymentCollectionLog ? (
      <View style={{ flex: 1, marginTop: 10 }}>
        <FlatList
          data={dataSfaGetPaymentCollectionLog.data}
          renderItem={renderItem}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.2}
          onEndReached={() => onLoadMore()}
          showsVerticalScrollIndicator
          refreshing={refreshing}
          onRefresh={() => onHandleRefresh()}
        />
        {loadingLoadMoreGetReferenceList ? <LoadingLoadMore /> : null}
      </View>
    ) : (
      <View />
    );
  };
  /**
   * =======================
   * RENDER BOTTOM BUTTON
   * =======================
   */

  /**
   * =======================
   * RENDER CONTENT
   * =======================
   */

  const renderContent = () => {
    return !loadingSfaGetPaymentCollectionLog ? (
      <>
        <View style={{ flex: 1 }}>{renderCollectionList()}</View>
      </>
    ) : (
      <LoadingPage />
    );
  };
  /**
   * =======================
   * MAIN
   * =======================
   */
  return <>{renderContent()}</>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
    // backgroundColor: masterColor.backgroundWhite
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
    marginHorizontal: 16
  },
  buttonSmall: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    width: '30%',
    alignItems: 'center',
    marginLeft: 20
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 16
  }
});

export default SfaBillingLogView;
