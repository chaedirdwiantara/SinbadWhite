import {
  React,
  View,
  Text,
  TouchableOpacity
} from '../../../library/reactPackage';
import { useEffect, useState } from 'react';
import ModalBottomMerchantNoCollectionReason from './ModalBottomMerchantNoCollectionReason';
import MerchantCollectionReasonList from './MerchantCollectionReasonList';
import SfaNoDataView from '../../sfa/SfaNoDataView';
import { useSelector } from 'react-redux';
import { ButtonSingle } from '../../../library/component';
const MerchantNoCollectionReason = () => {
  const [isModalReasonOpen, setIsModalReasonOpen] = useState(false);
  const [dataPostTransaction, setDataPostTransaction] = useState(null);
  const { dataSfaCheckCollectionStatus } = useSelector(state => state.sfa);

  useEffect(() => {
    setDataPostTransaction(dataSfaCheckCollectionStatus);
  }, []);
  
  const renderModalBottomNotCollectReason = () => {
    return isModalReasonOpen ? (
      <ModalBottomMerchantNoCollectionReason
        open={isModalReasonOpen}
        data={reasonNotCollect}
        close={() => setIsModalReasonOpen(false)}
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
        <MerchantCollectionReasonList dataList={dataSfaCheckCollectionStatus} />
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
