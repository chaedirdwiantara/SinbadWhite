import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  InputType5,
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import { toLocalTime} from '../../helpers/TimeHelper';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';

import SfaCollectionDetailCheckandGiro from './SfaCollectionDetailCheckandGiro';
import SfaCollectionDetailTransfer from './SfaCollectionDetailTransfer';
import SfaCollectionDetailPromo from './SfaCollectionDetailPromo'
import {
  sfaGetCollectionDetailProcess
} from '../../state/actions';

const SfaCollectionDetailView = props => {
  const dispatch = useDispatch();
  const { dataSfaGetDetail, dataSfaGetCollectionDetail } = useSelector(state => state.sfa);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const [isPrimer, setIsPrimer] = useState(false)

  /**
   * *********************************
   * FUNCTION
   * *********************************
   */
  useEffect(() =>{
    const paymentCollectionId = props.navigation.state.params.paymentCollectionId
    dispatch(sfaGetCollectionDetailProcess(paymentCollectionId))
  }, [])


  const formatDate = (date) => {
    const local = toLocalTime(date)
    return (
    moment(local).format(
        'DD MMMM YYYY'
      )
    )
  }


  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderFakturInfo = () => {
    return (
      <View style={styles.container}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Informasi Faktur</Text>
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          {renderItemFakturInfo()}
        </View>
      </View>
    );
  };

  const renderItemFakturInfo = () => {
    const detailSfa = dataSfaGetDetail.data;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>Nama Faktur</Text>
          <Text style={Fonts.type17}>{detailSfa.invoiceGroupName}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>No. Pesanan</Text>
          <Text style={Fonts.type17}>{detailSfa.orderCode}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>No. Referensi</Text>
          <Text style={Fonts.type17}>
            {detailSfa.orderRef === null || detailSfa.orderRef === ''
              ? '-'
              : detailSfa.orderRef}
          </Text>
        </View>
      </View>
    );
  };

  const renderCollectionInfo = () => {
    const detailSfa = dataSfaGetDetail.data;
    return (
      <View style={styles.container}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Informasi Tagihan</Text>
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={Fonts.type17}>Sisa Tagihan</Text>
            <Text style={Fonts.type100}>
              {MoneyFormatSpace(detailSfa.remainingBilling)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCollectionDetail = () => {
    return (
      <View style={[styles.container, {marginBottom: 16}]}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Detil Penagihan</Text>
          </View>
          <View style={[{ flex: 1, marginVertical: 8 }]} />
          {renderItemCollectionDetail()}
        </View>
      </View>
    );
  };

  const renderItemCollectionDetail = () => {
    const collectionMethodType = dataSfaGetCollectionDetail.paymentCollection.paymentCollectionMethod.paymentCollectionType
    return (
      <View style={{ marginHorizontal: -16 }}>
        <InputType5
          title={`Metode Penagihan`}
          placeholder={collectionMethodType.name}
          editable={false}
        />
        {renderCollectionDetailMethod(collectionMethodType)}
         
      </View>
    );
  };

  const renderCollectionDetailMethod = (collectionMethodType) => {
   if(collectionMethodType.code === 'check' || collectionMethodType.code === 'giro'){  
    return (
      <SfaCollectionDetailCheckandGiro data={dataSfaGetCollectionDetail}/>
     )
   }
   else if (collectionMethodType.code === 'transfer'){
    return(
      <SfaCollectionDetailTransfer data={dataSfaGetCollectionDetail}/>
    )
   }
   else if (collectionMethodType.code === "cash") {
    return(
     renderCashDetail()
    )
   }
   else if (collectionMethodType.code === "promo") {
     return(
      <SfaCollectionDetailPromo data={dataSfaGetCollectionDetail}/>
     )
   }
  }

  const renderCashDetail = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <View>
          <Text style={Fonts.type10}>Jumlah Penagihan</Text>
        </View>
        <View
          style={[
            styles.boxInput,
            { flexDirection: 'row', alignItems: 'center' }
          ]}
        >
          <TextInputMask
            editable={false}
            type={'money'}
            options={{
              precision: 0,
              separator: ',',
              delimiter: '.',
              unit: 'Rp ',
              suffixUnit: ''
            }}
            value={dataSfaGetCollectionDetail.paymentCollection.paidAmount}
            style={[
              Fonts.type31,
              {
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: masterColor.fontBlack10,
              }
            ]}
          />
        </View>
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        {dataSfaGetCollectionDetail ?
          <ScrollView style={{ flex: 1, height: '100%'}}>       
            {renderFakturInfo()}
            {renderCollectionInfo()}
            {renderCollectionDetail()}
          </ScrollView>
        :
          <LoadingPage />
        }
      </View>     
    );
  };


  return <>
  <View style={{flex:1}}>

  {renderContent()}
  </View>
  </>;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  container: {
    marginHorizontal: 16,
    marginTop: 16
  },
  cardTaskList: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: masterColor.backgroundWhite
  },
  inputField: {
    marginTop: 16
  }
});
export default SfaCollectionDetailView;

export const DetailHeaderOption = props => {
  const { dataSfaGetCollectionDetail } = useSelector(state => state.sfa);
  return (
    <>
    {/* {dataSfaGetCollectionDetail?  
    dataSfaGetCollectionDetail.isEditable? */}
    <View style={styles.navOption}>
      <View style={{flexDirection:"row"}}>
        <TouchableOpacity onPress={()=> alert('Delete Transaksi')}>
          <MaterialIcon
            name="delete"
            size={28}
            style={{ color: masterColor.fontBlack50 , marginRight: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> alert('Edit Transaksi')}>
          <MaterialIcon
            name="edit"
            size={28}
            style={{ color: masterColor.fontBlack50 , marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
    {/* : null : null} */}
   
    </>
  );
};