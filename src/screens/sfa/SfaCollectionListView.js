import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
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
  sfaCollectionListLoadmoreProcess
} from '../../state/actions';
import SfaNoDataView from './SfaNoDataView';

const SfaCollectionListView = props => {
  const dispatch = useDispatch();
  const collectionMethodId = props.navigation.state.params.collectionMethodId;
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(4);
  const {
    dataGetReferenceList,
    loadingLoadMoreGetReferenceList,
    loadingGetReferenceList
  } = useSelector(state => state.sfa);
  const { userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);

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
  }, []);
  /** FUNCTION NAVIGATE TO ADD COLLECTION */
  const navigatetoAddCollection = () => {
    NavigationService.navigate('SfaCollectionAddView');
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

  const navigationRenderButton = (page, items) => {
    NavigationService.navigate(page, items);
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
  const renderButton = (title, type, disable, page, items) => {
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
        onPress={() => navigationRenderButton(page, items)}
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
            NavigationService.navigate('SfaCollectionDetailView', {
              paymentCollectionId: item.id
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
              <Text style={[Fonts.type42, { marginTop: 8 }]}>
                {item.collectionCode}
              </Text>
            </View>
            <View>
              {renderContentListGlobal(
                'Tanggal Penagihan',
                moment(new Date(item.issuedDate)).format('DD MMM YYYY')
              )}
              {renderContentListGlobal(
                'Metode Penagihan',
                item.collectionMethodName
              )}
              {renderContentListGlobal('Salesman', item.salesman)}
            </View>
            <View style={[GlobalStyle.lines, { marginTop: 8 }]} />
            <View>
              {renderContentListGlobal(
                'Total Penagihan:',
                'Sisa Penagihan:',
                true
              )}
              {renderContentListGlobal(
                MoneyFormatSpace(item.totalAmount),
                MoneyFormatSpace(item.balance),
                false,
                true,
                true
              )}
            </View>
            <View style={styles.buttonContainer}>
              {renderButton('Ubah', 'white', !item.isEditable)}
              {renderButton('Hapus', 'white', !item.isEditable)}
              {renderButton(
                'Gunakan',
                'red',
                !item.isUsable,
                'SfaBillingAddView',
                {
                  ...item,
                  paymentCollectionTypeId: parseInt(collectionMethodId, 10)
                }
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
   * RENDER NO DATA
   * =======================
   */
  const renderNoData = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <SfaNoDataView
          topText="Belum ada penagihan"
          midText="Yuk lakukan penambahan penagihanmu."
          bottomText=""
        />
      </View>
    );
  };

  /**
   * =======================
   * RENDER COLLECTION LIST
   * =======================
   */
  const renderCollectionList = () => {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataGetReferenceList.data}
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
    );
  };
  /**
   * =======================
   * RENDER BOTTOM BUTTON
   * =======================
   */

  const renderBottomButton = () => {
    return (
      <>
        <ButtonSingle
          onPress={() => navigatetoAddCollection()}
          title={'Tambah Penagihan'}
          borderRadius={4}
        />
      </>
    );
  };
  /**
   * =======================
   * RENDER CONTENT
   * =======================
   */

  const renderContent = () => {
    return !loadingGetReferenceList ? (
      <View style={{ flex: 1 }}>
        {dataGetReferenceList.meta.total > 0
          ? renderCollectionList()
          : renderNoData()}
      </View>
    ) : (
      <LoadingPage />
    );
  };
  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      {renderContent()}
      {renderBottomButton()}
    </>
  );
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
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16
  }
});

export default SfaCollectionListView;
