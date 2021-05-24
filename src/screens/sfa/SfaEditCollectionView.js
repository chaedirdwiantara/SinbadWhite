import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from '../../library/reactPackage';
import { InputType5, ButtonSingle } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import SfaEditCollectionCash from './SfaEditCollectionCash';
import { useDispatch, useSelector } from 'react-redux';
import { TRANSFER, TUNAI, PROMO } from '../../constants/collectionConstants';
import SfaEditCollectionTransfer from './SfaEditCollectionTransfer';
import SfaEditCollectionPromo from './SfaEditCollectionPromo';

const SfaEditCollectionView = props => {
  const { dataSfaGetDetail, dataSfaGetCollectionDetail } = useSelector(
    state => state.sfa
  );
  const detailSfa = props.navigation.state.params.dataDetail;
  const [newDataDetailSfa, setNewDataDetailSfa] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  //DATA PAYMENT TRANSFER
  const [referenceCode, setReferenceCode] = useState(detailSfa.paymentCollection.paymentCollectionMethod.reference);
  const [bankSource, setBankSource] = useState(detailSfa.paymentCollection.paymentCollectionMethod.bankFrom);
  const [bankAccount, setBankAccount] = useState(detailSfa.paymentCollection.paymentCollectionMethod.bankToAccount);
  const [transferDate, setTransferDate] = useState(detailSfa.paymentCollection.paymentCollectionMethod.date);
  const [transferValue, setTransferValue] = useState(detailSfa.paymentCollection.paymentCollectionMethod.amount);
  const [billingValue, setBillingValue] = useState(detailSfa.paymentCollection.paidAmount);
  const [transferImage, setTransferImage] = useState(detailSfa.image);

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const saveEditCollection = () => {
    const data = {
      referenceCode : referenceCode,
      bankSource : bankSource,
      bankAccount : bankAccount,
      transferDate : transferDate,
      transferValue : transferValue,
      billingValue : billingValue,
      transferImage : transferImage
    }
    console.log("data:", data);
  };

  const editCollectionNewData = data => {
    setNewDataDetailSfa(data);
  };

  const isChangedData = data => {
    setIsChanged(data);
  };

  console.log('change:', isChanged);

  const dataReferenceCode = data => {
    setReferenceCode(data);
  };

  const dataBankSource = data => {
    setBankSource(data);
  };

  const dataBankAccount = data => {
    setBankAccount(data);
  };

  const dataTransferDate = data => {
    setTransferDate(data);
  };

  const dataTranserValue = data => {
    setTransferValue(data);
  };

  const dataBillingValue = data => {
    setBillingValue(data);
  };

  const dataTransferImage = data => {
    setTransferImage(data);
  };
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
    const collectionMethodType =
      dataSfaGetCollectionDetail.paymentCollection.paymentCollectionMethod
        .paymentCollectionType;
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.container, { marginBottom: 16 }]}>
          <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
            <View>
              <Text style={Fonts.type48}>Detil Penagihan</Text>
            </View>
            <View
              style={[
                GlobalStyle.lines,
                { marginVertical: 8, marginBottom: 16 }
              ]}
            />
            <View style={{ marginLeft: -16 }}>
              <InputType5
                title={`Metode Penagihan`}
                placeholder={collectionMethodType.name}
                editable={false}
              />
              <View style={{ marginLeft: 16 }}>{renderEditForm()}</View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderEditForm = () => {
    const paymentCollectionType =
      detailSfa.paymentCollection.paymentCollectionMethod.paymentCollectionType;
    if (paymentCollectionType.name === TUNAI) {
      return <SfaEditCollectionCash />;
    } else if (paymentCollectionType.name === TRANSFER) {
      return (
        <SfaEditCollectionTransfer
          data={detailSfa}
          newData={editCollectionNewData}
          isChanged={isChangedData}
          referenceCode={dataReferenceCode}
          bankSource={dataBankSource}
          bankAccount={dataBankAccount}
          transferDate={dataTransferDate}
          transferValue={dataTranserValue}
          billingValue={dataBillingValue}
          transferImage={dataTransferImage}
        />
      );
    } else if (paymentCollectionType.name === PROMO) {
      return (
        <SfaEditCollectionPromo
          data={detailSfa}
          newData={editCollectionNewData}
          isChanged={isChangedData}
        />
      );
    } else {
      return <View />;
    }
  };

  const renderButtonSave = () => {
    return (
      <ButtonSingle
        disabled={false}
        loading={false}
        title={'Simpan'}
        borderRadius={4}
        onPress={() => saveEditCollection()}
      />
    );
  };

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          {renderFakturInfo()}
          {renderCollectionInfo()}
          {renderCollectionDetail()}
          {renderButtonSave()}
        </ScrollView>
      </View>
    );
  };
  return <>{renderContent()}</>;
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
export default SfaEditCollectionView;
