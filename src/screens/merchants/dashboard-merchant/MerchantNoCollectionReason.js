import {
  React,
  View,
  Text,
  TouchableOpacity
} from '../../../library/reactPackage';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sfaGetReasonNotToPayProcess } from '../../../state/actions';
import ModalBottomMerchantNoCollectionReason from './ModalBottomMerchantNoCollectionReason';
import MerchantCollectionReasonList from './MerchantCollectionReasonList';
import SfaNoDataView from '../../sfa/SfaNoDataView';
import { ButtonSingle } from '../../../library/component';
const MerchantNoCollectionReason = () => {
  const dispatch = useDispatch();
  const [isModalReasonOpen, setIsModalReasonOpen] = useState(false);
  const [dataPostTransaction, setDataPostTransaction] = useState(null);
  const [indexCollection, setIndexCollection] = useState(0);
  const [dataReasonList, setDataReasonList] = useState([]);
  const [reasonLength, setReasonLength] = useState(0);
  const [isSaveButtonDisable, setIsSaveButtonDisable] = useState(true);
  const [
    collectionTransactionDetails,
    setCollectionTransactionDetails
  ] = useState([]);
  const {
    dataSfaCheckCollectionStatus,
    dataSfaGetReasonNotToPay
  } = useSelector(state => state.sfa);

  const { selectedMerchant } = useSelector(state => state.merchant);

  /** RENDER USE EFFECT */
  /** get reason not to pay on render screen */
  useEffect(() => {
    getReasonNotToPay();
    setCollectionTransactionDetails(
      selectedMerchant?.journeyBookStores.collections
    );
  }, []);
  /** save data post transaction */
  useEffect(() => {
    setDataPostTransaction(dataSfaCheckCollectionStatus.data.orderParcels);
  }, []);
  /** save button disabled if all reason not filled */
  useEffect(() => {
    const collectionLength = dataSfaCheckCollectionStatus.meta.total;
    if (reasonLength === collectionLength) {
      setIsSaveButtonDisable(false);
    } else {
      setIsSaveButtonDisable(true);
    }
  }, [dataReasonList, reasonLength]);
  /**=== RENDER FUNCTION === */
  /** function post transaction checkout */
  const postTransaction = () => {
    const data = [];
    const storeId = 123;
    const collectionTransactionDetailIds = selectedMerchant.collectionIds;

    data.storeId = storeId;
    data.collectionTransactionDetailIds = collectionTransactionDetailIds;
    data.collectionTransactionDetails = collectionTransactionDetails;
    console.log('DATA POST', data);
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
    const reasonNotToPay = item.selectedReasonText;
    const reasonNotToPayId = item.selectedReasonId;
    const dataPost = collectionTransactionDetails;
    data.splice(index, 1, { ...data[index], reasonNotToPay });
    dataReason.splice(index, 1, {
      ...dataReason[index],
      reasonNotToPay
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
  console.log(collectionTransactionDetails);
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
          // loading={loadingSfaPostPaymentMethod}
        />
      </>
    );
  };
  return dataSfaCheckCollectionStatus ? (
    <>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <MerchantCollectionReasonList
            onRef={ref => (onPressReason = ref)}
            openReason={onPressReason.bind(this)}
            dataList={dataPostTransaction}
          />
        </View>
        <View>{renderButton()}</View>
      </View>
      {renderModalBottomNotCollectReason()}
    </>
  ) : (
    <SfaNoDataView
      topText={'Belum Ada Tagihan'}
      midText={'Yuk belanja kebutuhanmu sekarang di Sinbad'}
      bottomText={''}
    />
  );
};

export default MerchantNoCollectionReason;
