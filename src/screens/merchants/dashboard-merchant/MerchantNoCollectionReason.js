import {
  React,
  View,
  Text,
  TouchableOpacity
} from '../../../library/reactPackage';
import { useState } from 'react';
import ModalBottomMerchantNoCollectionReason from './ModalBottomMerchantNoCollectionReason';
import MerchantCollectionReasonList from './MerchantCollectionReasonList';
const MerchantNoCollectionReason = () => {
  const [isModalReasonOpen, setIsModalReasonOpen] = useState(false);
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
  const onPressReason = () => {
    setIsModalReasonOpen(true);
    console.log('modal open');
  };
  const renderModalBottomNotCollectReason = () => {
    return isModalReasonOpen ? (
      <ModalBottomMerchantNoCollectionReason
        open={isModalReasonOpen}
        data={reasonNotCollect}
        close={() => setIsModalReasonOpen(false)}
      />
    ) : null;
  };

  return (
    <>
      <View>
        <MerchantCollectionReasonList dataList={collectionUnpaid} />
      </View>
      {renderModalBottomNotCollectReason()}
    </>
  );
};

export default MerchantNoCollectionReason;
