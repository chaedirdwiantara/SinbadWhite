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
  const { dataSfaCheckCollectionStatus } = useSelector(state => state.sfa);

  useEffect(() => {
    setDataPostTransaction(dataSfaCheckCollectionStatus);
  }, []);
  
  const { dataSfaGetReasonNotToPay } = useSelector(state => state.sfa);
  const reasonNotCollect = [
    { id: 1, reason: 'Masalah AR' },
    { id: 2, reason: 'Bayar Kunjungan Berikut' },
    { id: 3, reason: 'Bayar Cicil' },
    { id: 4, reason: 'Toko Tutup' },
    { id: 5, reason: 'Toko Pindah' },
    { id: 6, reason: 'Ganti Bisnis' }
  ];
  const collectionUnpaid = {
    data: {
      orderParcels: [
        {
          deliveredDate: '2021-09-03 09:09:46',
          dueDate: '2021-09-05 09:09:46',
          id: 1081735,
          invoiceAmount: 139740,
          invoiceGroupName: 'Exclusive Danone',
          orderCode: 'S0100032305811078558',
          orderRef: null,
          outstandingAmount: 0,
          paidAmount: 139740,
          statusPayment: 'overdue'
        },
        {
          deliveredDate: '2021-09-03 09:09:46',
          dueDate: '2021-09-05 09:09:46',
          id: 1081735,
          invoiceAmount: 139740,
          invoiceGroupName: 'Exclusive Danone',
          orderCode: 'S0100032305811078558',
          orderRef: null,
          outstandingAmount: 0,
          paidAmount: 139740,
          statusPayment: 'overdue'
        }
      ]
    }
  };
  /** RENDER USE EFFECT */
  /** get reason not to pay on render screen */
  useEffect(() => {
    getReasonNotToPay();
  }, []);

  /**=== RENDER FUNCTION === */
  /** GET DATA REASON NOT TO PAY */
  const getReasonNotToPay = () => {
    dispatch(sfaGetReasonNotToPayProcess());
  };
  const onPressReason = () => {
    setIsModalReasonOpen(true);
    console.log('modal open');
  };
  const onSaveReason = id => {
    console.log(id, 'ID REASON');
  };
  const renderModalBottomNotCollectReason = () => {
    return isModalReasonOpen && dataSfaGetReasonNotToPay ? (
      <ModalBottomMerchantNoCollectionReason
        open={isModalReasonOpen}
        data={dataSfaGetReasonNotToPay.data}
        close={() => setIsModalReasonOpen(false)}
        onPress={() => onSaveReason()}
      />
    ) : null;
  };

  /** RENDER BUTTON */
  const renderButton = () => {
    return (
      <>
        <ButtonSingle
          onPress={() => console.log('button')}
          title={'Simpan'}
          borderRadius={4}
          // disabled={isSaveDisabled || loadingSfaPostPaymentMethod}
          // loading={loadingSfaPostPaymentMethod}
        />
      </>
    );
  };
  return dataSfaCheckCollectionStatus ? (
    <>
      <View>
        <MerchantCollectionReasonList
          openReason={() => onPressReason}
          dataList={dataSfaCheckCollectionStatus} 
        />
        {renderButton()}
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
