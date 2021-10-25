import {
  React,
  View,
  Text,
  TouchableOpacity
} from '../../../library/reactPackage';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  sfaGetReasonNotToPayProcess,
  sfaPostTransactionCheckoutProcess,
  sfaGetCollectionListProcess,
  SfaGetLoadMore
} from '../../../state/actions';
import ModalBottomMerchantNoCollectionReason from './ModalBottomMerchantNoCollectionReason';
import MerchantCollectionReasonList from './MerchantCollectionReasonList';
import { ButtonSingle, LoadingPage } from '../../../library/component';
import { ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS } from '../../../constants';
import NavigationService from '../../../navigation/NavigationService';

const MerchantNoCollectionReason = () => {
  const dispatch = useDispatch();
  const [isModalReasonOpen, setIsModalReasonOpen] = useState(false);
  const [dataPostTransaction, setDataPostTransaction] = useState(null);
  const [indexCollection, setIndexCollection] = useState(0);
  const [dataReasonList, setDataReasonList] = useState([]);
  const [reasonLength, setReasonLength] = useState(0);
  const [limit, setLimit] = useState(20);
  const [isSaveButtonDisable, setIsSaveButtonDisable] = useState(true);
  const [
    collectionTransactionDetails,
    setCollectionTransactionDetails
  ] = useState([]);
  const {
    dataSfaCheckCollectionStatus,
    dataSfaGetReasonNotToPay,
    dataSfaPostTransactionCheckout,
    dataGetCollectionList,
    loadingGetCollectionList,
    loadingSfaPostTransactionCheckout
  } = useSelector(state => state.sfa);
  const { id, userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);
  /** RENDER USE REF */
  const prevdataSfaPostTransactionCheckout = useRef(
    dataSfaPostTransactionCheckout
  );
  const prevdataGetCollectionList = useRef(dataGetCollectionList);

  /** RENDER USE EFFECT */
  /** get reason not to pay on render screen */
  useEffect(() => {
    getReasonNotToPay();
    getCollectionTransactionDetailId();
    getCollectionList(true, 20);
  }, []);
  const getCollectionTransactionDetailId = () => {
    const data = [];
    dataSfaCheckCollectionStatus.data.orderParcels.map(item =>
      data.push({
        collectionTransactionDetailId: item.collectionTransactionDetailId
      })
    );
    setCollectionTransactionDetails(data);
  };

  /** save button disabled if all reason not filled */
  useEffect(() => {
    const collectionLength = dataSfaCheckCollectionStatus.meta.total;
    if (reasonLength === collectionLength) {
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
  /** post collection_not_success & navigate to merchantHomeView on success post transaction checkout */
  useEffect(() => {
    if (prevdataSfaPostTransactionCheckout !== dataSfaPostTransactionCheckout) {
      if (dataSfaPostTransactionCheckout) {
        NavigationService.navigate('MerchantHomeView');
      }
    }
  }, [dataSfaPostTransactionCheckout]);
  /** SAVE DATA ON SUCCESS GET COLLECTION LIST */
  useEffect(() => {
    if (prevdataGetCollectionList !== dataGetCollectionList) {
      if (dataGetCollectionList) {
        setDataPostTransaction(dataGetCollectionList.data.orderParcels);
      }
    }
  }, [dataGetCollectionList]);
  /**=== RENDER FUNCTION === */
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
    const data = {
      storeId: parseInt(selectedMerchant.storeId, 10),
      userId: parseInt(id, 10),
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      loading: loading,
      limit: page,
      skip: 0,
      collectionTransactionDetailStatus: 'pending',
      collectionTransactionDetailIds: selectedMerchant.collectionIds
    };
    dispatch(sfaGetCollectionListProcess(data));
  };
  /** function post transaction checkout */
  const postTransaction = () => {
    const data = {};
    const storeId = parseInt(selectedMerchant.storeId, 10);
    const collectionTransactionDetailIds = selectedMerchant.collectionIds;

    data.storeId = storeId;
    data.collectionTransactionDetailIds = collectionTransactionDetailIds;
    data.collectionTransactionDetails = collectionTransactionDetails;
    dispatch(sfaPostTransactionCheckoutProcess(data));
  };
  /** GET DATA REASON NOT TO PAY */
  const getReasonNotToPay = () => {
    dispatch(sfaGetReasonNotToPayProcess());
  };
  let onPressReason = index => {
    setIsModalReasonOpen(true);
    setIndexCollection(index);
  };
  let onSaveReason = item => {
    const index = indexCollection;
    const data = dataPostTransaction;
    const dataReason = dataReasonList;
    const reasonNotPay = item.selectedReasonText;
    const reasonNotToPayId = item.selectedReasonId;
    const dataPost = collectionTransactionDetails;
    data.splice(index, 1, { ...data[index], reasonNotPay });
    dataReason.splice(index, 1, {
      ...dataReason[index],
      reasonNotPay
    });
    dataPost.splice(index, 1, {
      ...dataPost[index],
      reasonNotToPayId
    });
    setCollectionTransactionDetails(dataPost);
    setDataReasonList(dataReason);
    setReasonLength(dataReasonList.length);
    setDataPostTransaction(data);
    setIsModalReasonOpen(false);
  };
  
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

  /** RENDER BUTTON */
  const renderButton = () => {
    return (
      <>
        <ButtonSingle
          onPress={() => postTransaction()}
          title={'Simpan Alasan'}
          borderRadius={4}
          disabled={isSaveButtonDisable}
          loading={loadingSfaPostTransactionCheckout}
        />
      </>
    );
  };
  return dataGetCollectionList && !loadingGetCollectionList ? (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MerchantCollectionReasonList
            onRef={ref => (onPressReason = ref)}
            openReason={onPressReason.bind(this)}
            dataList={dataPostTransaction}
            loadmore={onHandleLoadMore}
          />
        </View>
        <View>{renderButton()}</View>
      </View>
      {renderModalBottomNotCollectReason()}
    </>
  ) : (
    <LoadingPage />
  );
};

export default MerchantNoCollectionReason;
