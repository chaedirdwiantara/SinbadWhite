/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';
import { GlobalStyle, Fonts, MoneyFormatSpace } from '../../helpers';
import { toLocalTime } from '../../helpers/TimeHelper';
import { APPROVED, PENDING, RETUR } from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';
import {
  ButtonSingle,
  LoadingLoadMore,
  ModalConfirmation,
  SkeletonType28
} from '../../library/component';
import {
  sfaGetPaymentMethodProcess,
  sfaGetReferenceListProcess,
  sfaCollectionListLoadmoreProcess,
  sfaDeleteCollectionMethodProcess,
  sfaGetCollectionDetailProcess,
  sfaGetCollectionImageProcess,
  sfaGetReturnBalanceProcess
} from '../../state/actions';
import SfaNoDataView from './SfaNoDataView';
import ModalBottom from './components/ModalBottom';
import { ModalError } from './components/ModalError';

const SfaCollectionListView = props => {
  const dispatch = useDispatch();
  const collectionTypeId = props?.isNavigateFromTab
    ? null
    : props.navigation.state.params.collectionMethodId;
  const [refreshing, setRefreshing] = useState(false);
  const [collectionId, setCollectionId] = useState(null);
  const [
    isModalDeleteConfirmationOpen,
    setIsModalDeleteConfirmationOpen
  ] = useState(false);
  const [limit, setLimit] = useState(4);
  const {
    dataGetReferenceList,
    loadingLoadMoreGetReferenceList,
    loadingGetReferenceList,
    dataSfaDeleteCollectionMethod,
    errorSfaDeleteCollectionMethod,
    loadingSfaGetReturnBalance,
    dataSfaGetReturnBalance,
    errorSfaGetReturnBalance
  } = useSelector(state => state.sfa);
  const { userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const [openModalNoSaldo, setOpenModalNoSaldo] = useState(false);
  const [clickedAddCollection, setClickedAddCollection] = useState(false);

  /**
   * *********************************
   * RENDER USEREF
   * *********************************
   */
  const prevDataSfaDeleteCollectionMethodRef = useRef(
    dataSfaDeleteCollectionMethod
  );
  const prevErrorSfaDeleteCollectionMethodRef = useRef(
    errorSfaDeleteCollectionMethod
  );
  const refModalError = useRef();

  /**
   * *********************************
   * RENDER USE EFFECT
   * *********************************
   */
  useEffect(() => {
    prevDataSfaDeleteCollectionMethodRef.current = dataSfaDeleteCollectionMethod;
  }, []);
  const prevDataSfaDeleteCollectionMethod =
    prevDataSfaDeleteCollectionMethodRef.current;

  useEffect(() => {
    prevErrorSfaDeleteCollectionMethodRef.current = errorSfaDeleteCollectionMethod;
  }, []);
  // const prevErrorSfaDeleteCollectionMethod =
  //   prevErrorSfaDeleteCollectionMethodRef.current;

  useEffect(() => {
    if (prevDataSfaDeleteCollectionMethod !== dataSfaDeleteCollectionMethod) {
      if (dataSfaDeleteCollectionMethod) {
        navigateOnSuccesDelete();
      }
    }
  }, [dataSfaDeleteCollectionMethod]);

  /** FUNCTION NAVIGATE ON SUCCES DELETE COLLECTION */
  const navigateOnSuccesDelete = () => {
    setIsModalDeleteConfirmationOpen(false);
    const data = {
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      storeId: selectedMerchant.storeId
    };
    getCollectionList(true, 20);
    dispatch(sfaGetPaymentMethodProcess(data));
  };

  /** FUNCTION GET COLLECTION LIST */
  const getCollectionList = (loading, page) => {
    let data = {
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      storeId: parseInt(selectedMerchant.storeId, 10),
      userId: parseInt(userSuppliers[0].userId, 10),
      limit: page,
      loading: loading
    };

    if (props.isNavigateFromTab) {
      data = {
        ...data,
        approvalStatus: props.approvalStatus,
        keyword: props.keyword
      };
    } else {
      data = {
        ...data,
        paymentCollectionTypeId: parseInt(collectionTypeId, 10)
      };
    }
    dispatch(sfaGetReferenceListProcess(data));
  };

  const getReturnBalance = () => {
    const data = {
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      storeId: selectedMerchant.storeId
    };
    dispatch(sfaGetReturnBalanceProcess(data));
  };

  useEffect(() => {
    getCollectionList(true, 20);
  }, []);

  /** HANDLE CHECK RETURN BALANCE */
  useEffect(() => {
    if (
      collectionTypeId === RETUR &&
      clickedAddCollection &&
      dataSfaGetReturnBalance
    ) {
      if (dataSfaGetReturnBalance?.data?.returnBalance > 0) {
        navigatetoAddCollection();
      } else {
        setOpenModalNoSaldo(true);
      }
      setClickedAddCollection(false);
    }
  }, [dataSfaGetReturnBalance]);

  /** HANDLE ERROR */
  useEffect(() => {
    if (
      collectionTypeId === RETUR &&
      clickedAddCollection &&
      errorSfaGetReturnBalance
    ) {
      refModalError?.current?.handleError(errorSfaGetReturnBalance);
      setClickedAddCollection(false);
    }
  }, [errorSfaGetReturnBalance]);

  const handleOnClickAddCollection = () => {
    if (collectionTypeId === RETUR) {
      setClickedAddCollection(true);
      getReturnBalance();
    } else {
      navigatetoAddCollection();
    }
  };

  /** FUNCTION NAVIGATE TO ADD COLLECTION */
  const navigatetoAddCollection = () => {
    NavigationService.navigate('SfaCollectionAddView', {
      id: collectionTypeId
    });
  };

  const navigatetoEditCollection = item => {
    dispatch(sfaGetCollectionDetailProcess(item.id));
    NavigationService.navigate('SfaCollectionEditView', {
      collectionTypeId: item.paymentCollectionTypeId,
      data: item
    });
  };

  /** FUNCTION REFRESH COLLECTION LIST */
  const onHandleRefresh = () => {
    getCollectionList(true, 20);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 10);
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

  const navigatetoAddBilling = item => {
    NavigationService.navigate('SfaBillingAddView', {
      ...item,
      paymentCollectionTypeId: parseInt(collectionTypeId, 10)
    });
  };

  /** FUNCTION OPEN MODAL DELETE COLLECTION METHOD */
  const onDeleteCollection = item => {
    setCollectionId(item.id);
    setIsModalDeleteConfirmationOpen(true);
  };

  /** FUNCTION DELETE COLLECTION METHOD */
  const deleteCollection = () => {
    const data = {
      collectionId,
      userId: parseInt(userSuppliers[0].userId, 10)
    };
    dispatch(sfaDeleteCollectionMethodProcess(data));
  };

  /** FUNCTION NAVIGATE TO COLLECTION DETAIL */
  const navigateToCollectionDetail = item => {
    dispatch(sfaGetCollectionDetailProcess(item.id));
    dispatch(sfaGetCollectionImageProcess(item.id));
    NavigationService.navigate('SfaCollectionDetailView', {
      paymentCollectionId: item.id
    });
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
            {value || ''}
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
            : masterColor.mainColor,
          marginLeft: props.isNavigateFromTab ? 21 : null
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
          onPress={() => navigateToCollectionDetail(item)}
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
                toLocalTime(item.createdAt, 'DD MMM YYYY')
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
                MoneyFormatSpace(item.totalBalance),
                false,
                true,
                true
              )}
            </View>
            <View
              style={
                props.isNavigateFromTab
                  ? styles.buttonContainer2
                  : styles.buttonContainer
              }
            >
              {renderButton(
                'Ubah',
                'white',
                !item.isEditable,
                navigatetoEditCollection.bind(item),
                item
              )}
              {renderButton(
                'Hapus',
                'white',
                !item.isEditable,
                onDeleteCollection.bind(item),
                item
              )}
              {props.isNavigateFromTab
                ? null
                : renderButton(
                    'Gunakan',
                    'red',
                    !item.isUsable,
                    navigatetoAddBilling.bind(item),
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
   * RENDER NO DATA
   * =======================
   */
  const renderNoData = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <SfaNoDataView
          topText="Belum ada penagihan"
          midText="Yuk lakukan penambahan penagihanmu."
          bottomText=""
        />
      </View>
    );
  };

  /** ===> RENDER MODAL DELETE CONFIRMATION === */
  const renderModalConfirmationDelete = () => {
    return isModalDeleteConfirmationOpen ? (
      <ModalConfirmation
        title={'Hapus Penagihan?'}
        open={isModalDeleteConfirmationOpen}
        okText={'Kembali'}
        cancelText={'Hapus'}
        content={'Penagihan yang telah terhapus tidak dapat dikembalikan'}
        type={'okeNotRed'}
        ok={() => {
          setIsModalDeleteConfirmationOpen(false);
        }}
        cancel={() => deleteCollection()}
      />
    ) : (
      <View />
    );
  };
  /**
   * =======================
   * RENDER COLLECTION LIST
   * =======================
   */
  const renderCollectionList = () => {
    return (
      <View style={{ flex: 1, marginTop: 10 }}>
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
    const isLoading =
      collectionTypeId === RETUR ? loadingSfaGetReturnBalance : false;
    return (
      <>
        <ButtonSingle
          onPress={() => handleOnClickAddCollection()}
          title={'Tambah Penagihan'}
          borderRadius={4}
          disabled={isLoading}
          loading={isLoading}
        />
      </>
    );
  };

  /**
   * =======================
   * RENDER MODAL NO SALDO
   * =======================
   */
  const renderModalNoSaldo = () => {
    return collectionTypeId === RETUR && !props.isNavigateFromTab ? (
      <View>
        <ModalBottom
          open={openModalNoSaldo}
          onPress={() => setOpenModalNoSaldo(false)}
          buttonTitle={'OK'}
          imagePath={require('../../assets/images/sinbad_image/no_balance_sinbad.png')}
          title={'Saldo tidak ada'}
          description={'Mohon maaf Anda belum memiliki saldo barang retur'}
        />
      </View>
    ) : null;
  };

  /**
   * =======================
   * RENDER CONTENT
   * =======================
   */
  const renderContent = () => {
    return !loadingGetReferenceList ? (
      <View style={{ flex: 1 }}>
        {dataGetReferenceList?.data?.length > 0
          ? renderCollectionList()
          : renderNoData()}
      </View>
    ) : (
      <View style={{ marginTop: 16 }}>
        <SkeletonType28 />
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
      {renderContent()}
      {props.isNavigateFromTab ? null : renderBottomButton()}
      {props.isNavigateFromTab ? null : renderModalNoSaldo()}
      {renderModalConfirmationDelete()}
      <ModalError ref={refModalError} />
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
  },
  buttonContainer2: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 16
  }
});

export default SfaCollectionListView;
