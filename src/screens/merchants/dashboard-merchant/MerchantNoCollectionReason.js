import {
  React,
  View,
  Text,
  TouchableOpacity
} from '../../../library/reactPackage';
import { useState } from 'react';
import ModalBottomMerchantNoCollectionReason from './ModalBottomMerchantNoCollectionReason';
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
        <TouchableOpacity onPress={() => onPressReason()}>
          <Text>No Collection</Text>
        </TouchableOpacity>
      </View>
      {renderModalBottomNotCollectReason()}
    </>
  );
};

export default MerchantNoCollectionReason;
