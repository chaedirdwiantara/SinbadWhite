/* eslint-disable react-hooks/exhaustive-deps */
import {
  React,
  View,
  TouchableOpacity,
  BackHandler
} from '../../../library/reactPackage';
import { useState, useEffect, useRef } from 'react';
import { MaterialIcon } from '../../../library/thirdPartyPackage';
import masterColor from '../../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  sfaGetReasonNotToPayProcess,
  sfaPostTransactionCheckoutProcess,
  sfaGetCollectionListProcess,
  SfaGetLoadMore,
  sfaModalCollectionListMenu,
  sfaGetStoreCollectionListReset,
  sfaGetStoreCollectionListProcess
} from '../../../state/actions';
import ModalBottomMerchantNoCollectionReason from './ModalBottomMerchantNoCollectionReason';
import MerchantCollectionReasonList from './MerchantCollectionReasonList';
import {
  ButtonSingle,
  LoadingPage,
  ModalBottomErrorRespons
} from '../../../library/component';
import NavigationService from '../../../navigation/NavigationService';
import { REASON_NO_PAYMENT } from '../../../constants';
let navigationProps = '';
/** === HEADER === */
export const HeaderLeftReasonOption = () => {
  const type = navigationProps?.navigation?.state?.params?.type || '';
  const dispatch = useDispatch();
  return (
    <>
      <View style={{ marginLeft: 16 }}>
        <TouchableOpacity
          onPress={() => {
            if (type === 'COLLECTION_LIST') {
              NavigationService.goBack(null);
              dispatch(sfaModalCollectionListMenu(true));
            } else {
              NavigationService.goBack(null);
            }
          }}
        >
          <MaterialIcon
            name="arrow-back"
            color={masterColor.fontBlack80}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};
const MerchantNoCollectionReason = props => {
  navigationProps = props;
  const { params } = props.navigation.state;
  const dispatch = useDispatch();
  const [isModalReasonOpen, setIsModalReasonOpen] = useState(false);
  const [dataPostTransaction, setDataPostTransaction] = useState(null);
  const [indexCollection, setIndexCollection] = useState(0);
  const [dataReasonList, setDataReasonList] = useState([]);
  const [
    collectionTransactionDetails,
    setCollectionTransactionDetails
  ] = useState([]);
  const [reasonLength, setReasonLength] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isSaveButtonDisable, setIsSaveButtonDisable] = useState(true);
  const [openModalErrorGlobal, setOpenModalErrorGlobal] = useState(false);
  const [
    dataSfaCheckCollectionStatusLength,
    setDataSfaCheckCollectionStatusLength
  ] = useState(0);
  const {
    dataSfaCheckCollectionStatus,
    dataSfaGetReasonNotToPay,
    dataSfaPostTransactionCheckout,
    dataGetCollectionList,
    loadingGetCollectionList,
    loadingSfaPostTransactionCheckout,
    selectedStore,
    errorSfaPostTransactionCheckout
  } = useSelector(state => state.sfa);
  const { id, userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);

  /** RENDER USE REF */
  /** REF ON SUCCESS POST TRANSACTION CHECKOUT */
  const prevdataSfaPostTransactionCheckout = useRef(
    dataSfaPostTransactionCheckout
  );
  const prevdataGetCollectionList = useRef(dataGetCollectionList);
  /** REF ON ERROR POST TRANSACTION CHECKOUT */
  const preverrorSfaPostTransactionCheckout = useRef(
    errorSfaPostTransactionCheckout
  );
  /** RENDER USE EFFECT */
  /** get reason not to pay on render screen */
  useEffect(() => {
    getCollectionTransactionDetailId();
    getCollectionList(true, 20);
  }, []);
  const getCollectionTransactionDetailId = () => {
    let data = [];
    dataSfaCheckCollectionStatus.data?.orderParcels.map(item =>
      data.push({
        collectionTransactionDetailId: item.collectionTransactionDetailId
      })
    );
    setCollectionTransactionDetails(data);
  };

  /** save button disabled if all reason not filled */
  useEffect(() => {
    // const collectionLength = dataSfaCheckCollectionStatus.meta.total;

    if (reasonLength === dataSfaCheckCollectionStatusLength) {
      setIsSaveButtonDisable(false);
    } else {
      setIsSaveButtonDisable(true);
    }
  }, [dataReasonList, reasonLength]);

  /** save previous dataPostTransactionCheckout */
  useEffect(() => {
    prevdataSfaPostTransactionCheckout.current = dataSfaPostTransactionCheckout;
  }, []);
  /** save previous dataGetCollectionList */
  useEffect(() => {
    prevdataGetCollectionList.current = dataGetCollectionList;
  }, []);
  /** save previous errorSfaPostTransactionCheckout */
  useEffect(() => {
    preverrorSfaPostTransactionCheckout.current = errorSfaPostTransactionCheckout;
  }, []);
  /** post collection_not_success & navigate to merchantHomeView on success post transaction checkout */
  useEffect(() => {
    if (
      prevdataSfaPostTransactionCheckout?.current !==
      dataSfaPostTransactionCheckout
    ) {
      if (dataSfaPostTransactionCheckout) {
        if (params?.type === 'COLLECTION_LIST') {
          const supplierId = parseInt(userSuppliers[0]?.supplier?.id || 0, 10);
          const salesId = parseInt(id, 10) || 0;
          const data = {
            salesId,
            supplierId,
            skip: 1,
            limit: 10,
            loading: true,
            searchKey: ''
          };
          NavigationService.goBack();
          dispatch(sfaGetStoreCollectionListReset());
          dispatch(sfaGetStoreCollectionListProcess(data));
        } else {
          NavigationService.navigate('MerchantHomeView');
        }
      }
    }
  }, [dataSfaPostTransactionCheckout]);

  useEffect(() => {
    if (params.type === 'COLLECTION_LIST') {
      const backAction = () => {
        if (props.navigation.isFocused()) {
          onHandleBack();
        }
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
      return () => backHandler.remove();
    }
  }, []);

  const onHandleBack = () => {
    dispatch(sfaModalCollectionListMenu(true));
  };
  /** SAVE DATA ON SUCCESS GET COLLECTION LIST */
  useEffect(() => {
    if (prevdataGetCollectionList !== dataGetCollectionList) {
      if (dataGetCollectionList) {
        setDataPostTransaction(dataGetCollectionList.data.orderParcels);
        setDataSfaCheckCollectionStatusLength(
          dataGetCollectionList.data.orderParcels.length
        );
      }
    }
  }, [dataGetCollectionList]);
  /** on error post transaction checkout, show modal error */
  useEffect(() => {
    if (
      preverrorSfaPostTransactionCheckout?.current !==
      errorSfaPostTransactionCheckout
    ) {
      if (errorSfaPostTransactionCheckout) {
        setOpenModalErrorGlobal(true);
      }
    }
  }, [errorSfaPostTransactionCheckout]);

  /**=== RENDER FUNCTION === */
  /** FUNCTION NAVIGATE TO ADD COLLECTION */
  const navigateToPromisePayView = data => {
    NavigationService.navigate('MerchantPromisePayView', {
      selectedReason: data.selectedReason,
      promisePayList: data.promisePayList,
      onSavePromisePayDate
    });
  };
  /** handle loadmore get collectin */
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
  /** get data collection */
  const getCollectionList = (loading, page) => {
    const storeId = parseInt(
      params?.type === 'COLLECTION_LIST'
        ? params?.storeId || 0
        : selectedMerchant.storeId,
      10
    );
    const collectionTransactionDetailIds =
      params?.type === 'COLLECTION_LIST'
        ? params?.collectionIds
        : selectedMerchant?.collectionIds;
    const data = {
      storeId,
      userId: parseInt(id, 10),
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      loading: loading,
      limit: page,
      skip: 0,
      collectionTransactionDetailStatus: 'ASSIGNED',
      collectionTransactionDetailIds
    };
    dispatch(sfaGetCollectionListProcess(data));
  };
  /** function post transaction checkout */
  const postTransaction = () => {
    const storeId = parseInt(
      params.storeId || 0 || selectedMerchant?.storeId,
      10
    );
    const collectionTransactionDetailIds =
      selectedStore?.collectionTransactionDetailIds ||
      selectedMerchant?.collectionIds;
    const data = {
      storeId,
      collectionTransactionDetailIds,
      collectionTransactionDetails
    };
    dispatch(sfaPostTransactionCheckoutProcess(data));
  };
  /** GET DATA REASON NOT TO PAY */
  const getReasonNotToPay = orderParcelId => {
    dispatch(sfaGetReasonNotToPayProcess({ orderParcelId }));
  };
  let onPressReason = (index, orderParcelId) => {
    getReasonNotToPay(orderParcelId);
    setIsModalReasonOpen(true);
    setIndexCollection(index);
  };

  const onSavePromisePayDate = item => {
    saveReason(item);
  };

  let onSaveReason = item => {
    if (item.selectedReasonId === REASON_NO_PAYMENT.JANJI_BAYAR) {
      const promisePayList = dataSfaGetReasonNotToPay.data.find(
        v => v.id === REASON_NO_PAYMENT.JANJI_BAYAR
      );
      setIsModalReasonOpen(false);
      navigateToPromisePayView({
        selectedReason: item,
        promisePayList: promisePayList.data
      });
    } else {
      saveReason(item);
    }
  };

  const saveReason = item => {
    const index = indexCollection;
    const dataReason = dataReasonList;
    const dataPost = collectionTransactionDetails;
    const reasonNotPay = item.selectedReasonText;
    const dataPostNew = [...dataPost];
    dataReason.splice(index, 1, {
      ...dataReason[index],
      reasonNotPay
    });
    dataPostNew.splice(index, 1, {
      ...dataPostNew[index],
      reasonNotToPayId: item.selectedReasonId,
      promiseDate: item?.promisePayDate || null
    });

    setCollectionTransactionDetails(dataPostNew);
    setDataReasonList(dataReason);
    setReasonLength(dataReasonList.length);
    setDataPostTransaction(prevState => {
      prevState.splice(index, 1, { ...prevState[index], reasonNotPay });
      return [...prevState];
    });
    setIsModalReasonOpen(false);
  };
  /*** === MODAL BOTTOM NOT COLLECT REASON === */
  const renderModalBottomNotCollectReason = () => {
    return isModalReasonOpen && dataSfaGetReasonNotToPay ? (
      <ModalBottomMerchantNoCollectionReason
        open={isModalReasonOpen}
        data={dataSfaGetReasonNotToPay.data}
        close={() => setIsModalReasonOpen(false)}
        onRef={ref => (onSaveReason = ref)}
        onPress={onSaveReason.bind(this)}
      />
    ) : null;
  };

  /*** === MODAL ERROR POST TRANSACTION CHECKOUT === */
  const renderModalErrorGlobal = () => {
    return openModalErrorGlobal ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={openModalErrorGlobal}
        onPress={() => setOpenModalErrorGlobal()}
      />
    ) : (
      <View />
    );
  };

  /** RENDER BUTTON */
  const renderButton = () => {
    return (dataGetCollectionList?.data?.orderParcels || []).length > 0 ? (
      <>
        <ButtonSingle
          onPress={() => postTransaction()}
          title={'Simpan Alasan'}
          borderRadius={4}
          disabled={isSaveButtonDisable || loadingSfaPostTransactionCheckout}
          loading={loadingSfaPostTransactionCheckout}
        />
      </>
    ) : null;
  };

  /** RENDER MAIN */
  return dataGetCollectionList && !loadingGetCollectionList ? (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MerchantCollectionReasonList
            onRef={ref => (onPressReason = ref)}
            openReason={onPressReason.bind(this)}
            dataList={dataPostTransaction}
            extraData={dataPostTransaction}
            loadmore={onHandleLoadMore}
          />
        </View>
        <View>{renderButton()}</View>
      </View>
      {renderModalBottomNotCollectReason()}
      {renderModalErrorGlobal()}
    </>
  ) : (
    <LoadingPage />
  );
};

export default MerchantNoCollectionReason;
