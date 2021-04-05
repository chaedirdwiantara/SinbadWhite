import React, { useState } from 'react';
import styles from '../../helpers/GlobalFont';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
  
} from '../../library/reactPackage';
import { TextInputMask } from 'react-native-masked-text';
import {
  MaterialIcon,
  moment,
  MaterialCommunityIcons
} from '../../library/thirdPartyPackage';
import {
  InputType5,
  DatePickerSpinnerWithMinMaxDate,
  ModalBottomType4
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import ModalReferenceList from './ModalReferenceList';
import ModalBankAccount from './ModalBankAccount';
import ModalListMaterai from './ModalListMaterai';
import {useSelector} from 'react-redux';
const { width, height } = Dimensions.get('window');

const SfaAddTagihanCheque = props => {
  const status = props.status;
  const date = new Date();
  const [noRef, setNoRef] = useState('');
  const [bankSource, setBankSource] = useState('');
  const [issuedDate, setIssuedDate] = useState(date);
  const [invalidDate, setInvalidDate] = useState(new Date(date.setDate(date.getDate()+1)));
  const [balance, setBalance] = useState(0);
  const [checkMaterai, setCheckMaterai] = useState(false);
  const [openModalPublishDate, setOpenModalPublishDate] = useState(false);
  const [openModalDueDate, setOpenModalDueDate] = useState(false);
  const [openModalReference, setOpenModalReference] = useState(false);
  const [openModalBank, setOpenModalBank] = useState(false);
  const [openModalListMaterai, setOpenModalListMaterai] = useState(false)
  const [isDisable, setIsDisable] = useState(false)
  const [dataReference, setDataReference] = useState()
  const [dataBank, setDataBank] = useState()
  const [dataStamp, setDataStamp] = useState()
  const [billingValue, setBillingValue] = useState(0)
  const [balanceValue, setBalanceValue] = useState(0)
  const {
    selectedMerchant
   } = useSelector(state => state.merchant);
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const openPublishDate = () => {
    setOpenModalPublishDate(true);
  };

  const openDueDate = () => {
    setOpenModalDueDate(true);
  };

  const deleteDataReference = () => {
    const date = new Date()
    setIsDisable(false)
    setDataReference()
    props.referenceCode(null)
    props.issuedDate(date)
    props.dueDate(date.setDate(date.getDate()+1))
    props.balance(0)
    props.bankSource(null)
    props.useNoReference(false)
  }

  const noReference = (data) => {
    setNoRef(data)
    props.referenceCode(data)
  }

  const dataBillingValue = (text) => {
    if (parseInt(text.replace(/[Rp.]+/g, '')) > parseInt(props.remainingBilling)) {
        setBillingValue(parseInt(props.remainingBilling))
        props.billingValue(parseInt(props.remainingBilling))
      } else {
        setBillingValue(parseInt(text.replace(/[Rp.]+/g, '')))
        props.billingValue(parseInt(text.replace(/[Rp.]+/g, '')))
      }
  }

  const dataBalance = (text) => {
    const balanceInt = parseInt(text.replace(/[Rp.]+/g, ''))
    setBalanceValue(balanceInt);
    props.balance(balanceInt)
  }

  const dataIssuedDate = (date) => {
    setIssuedDate(date)
    props.issuedDate(date)
  }

  const dataDueDate = (date) => {
    setInvalidDate(date)
    props.dueDate(date)
  }
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderPublishDate = () => {
    return (
      <ModalBottomType4
        typeClose={'Tutup'}
        open={openModalPublishDate}
        title={'Tanggal Terbit'}
        close={() => setOpenModalPublishDate(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => dataIssuedDate(date)}
              close={() => setOpenModalPublishDate(false)}
              maxDate={new Date()}
            />
          </View>
        }
      />
    );
  };

  const renderDueDate = () => {
    const date = new Date()
    const minDate = new Date(date.setDate(date.getDate()+1));
    const today = new Date()
    return (
      <ModalBottomType4
        typeClose={'Tutup'}
        open={openModalDueDate}
        title={'Tanggal Jatuh Tempo'}
        close={() => setOpenModalDueDate(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => dataDueDate(date)}
              close={() => setOpenModalDueDate(false)}
              minDate={minDate}
              dateSelected={today.getDate() + 1}
                monthSelected={today.getMonth() + 1}
                yearSelected={today.getFullYear()}
            />
          </View>
        }
      />
    );
  };

const renderContent = () => {
  return (
<>
      <View>
        <View style={{ marginHorizontal: -16, marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 3 }}>
              <InputType5
                title={
                 isDisable !== false ? 'Nomor Cek' : `*Nomor Referensi` 
                }
                value={noRef}
                placeholder={
                  dataReference? dataReference.referenceCode : '*Nomor Referensi'
                }
                keyboardType={'default'}
                onChangeText={text => noReference(text.trim())}
                tooltip={isDisable ? false : true}
                tooltipText={'Dapat berupa Nomor Cek, Giro, Transfer atau Kuitansi'}
              />
            </View>
            {isDisable? 
<View style={{flexDirection:'row', marginRight: 16}}>
<TouchableOpacity
                onPress={() =>setOpenModalReference(true)}
                style={{
                  backgroundColor: masterColor.mainColor,
                  height: 36,
                  width: 66,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center', 
                  marginRight: 8
                }}
              >
                <Text style={Fonts.type94}> Ubah </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteDataReference()}
                style={{
                  backgroundColor: 'white',
                  height: 36,
                  width: 66,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: masterColor.mainColor,
                  borderWidth: 1
                }}
              >
                <Text style={Fonts.type100}> Hapus </Text>
              </TouchableOpacity>
</View>
:
            <View style={{ marginRight: 16}}>
              <TouchableOpacity
                onPress={() =>setOpenModalReference(true)}
                disabled={props.collectionMethod.balance <= 0 ? true : false}
                style={{
                  backgroundColor: props.collectionMethod.balance <= 0 ? masterColor.fontRed10 : masterColor.mainColor,
                  height: 36,
                  width: 66,
                  borderRadius: 8,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={Fonts.type94}> Cari</Text>
              </TouchableOpacity>
            </View> 
            }
          </View>
        </View>
        <View>
          <Text style={Fonts.type10}>
            { isDisable !== false? 'Sumber Bank' : '*Sumber Bank'}
          </Text>
          <View>
            <TouchableOpacity
              style={style.boxMenu}
              onPress={() => setOpenModalBank(true)}
              disabled={isDisable}
            >
              <Text
                style={[
                  Fonts.type17,
                  { opacity: isDisable? 0.5 : null }
                ]}
              >
                {dataReference? dataReference.bankSource : dataBank? dataBank.displayName : 'Pilih Sumber Bank'}
              </Text>
              <View style={{ position: 'absolute', right: 16 }}>
                <MaterialIcon
                  name="chevron-right"
                  color={masterColor.fontBlack40}
                  size={24}
                />
              </View>
            </TouchableOpacity>
            <View style={[GlobalStyle.lines]} />
          </View>
        </View>
        <View style={{ paddingVertical: 16 }}>
          <Text style={Fonts.type10}>
            { isDisable !== false ? 'Tanggal Terbit' : '*Tanggal Terbit'}
          </Text>
          <TouchableOpacity
            style={style.boxMenu}
            onPress={() => openPublishDate()}
            disabled={isDisable}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcon
                name="date-range"
                color={masterColor.mainColor}
                size={16}
              />

              <Text
                style={[
                  Fonts.type17,
                  { opacity: bankSource === '' ? 0.5 : null, marginLeft: 11 }
                ]}
              >
                {dataReference
                  ? moment(dataReference.issuedDate).format('DD/MM/YYYY')
                  :  moment(issuedDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines]} />
        </View>
        <View>
          <Text style={Fonts.type10}>
            { isDisable !== false
              ? 'Tanggal Jatuh Tempo'
              : '*Tanggal Jatuh Tempo'}
          </Text>
          <TouchableOpacity style={style.boxMenu} onPress={() => openDueDate()} disabled={isDisable}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcon
                name="date-range"
                color={masterColor.mainColor}
                size={16}
              />

              <Text
                style={[
                  Fonts.type17,
                  { opacity: bankSource === '' ? 0.5 : null, marginLeft: 11 }
                ]}
              >
                {dataReference
                  ? moment(dataReference.invalidDate).format('DD/MM/YYYY')
                  :  moment(invalidDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines]} />
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text style={Fonts.type10}>
            { isDisable !== false ? 'Nilai Cek' : '*Nilai Cek'}
          </Text>
          <View
            style={[
              styles.boxInput,
              { flexDirection: 'row', alignItems: 'center' }
            ]}
          >
          
            <TextInputMask
            type={'money'}
            options={{
              precision: 0,
              separator: ',',
              delimiter: '.',
              unit: 'Rp ',
              suffixUnit: ''
            }}
            value={dataReference? dataReference.balance : balanceValue}
            onChangeText={text =>dataBalance(text)}
            style={
              [
              Fonts.type17,
              {
                width: '95%',
                borderBottomColor: masterColor.fontBlack50,
                opacity: isDisable? 0.5 : null
              }
            ] }
            editable={!isDisable}
          />
            
            
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        <View>
          <Text style={[Fonts.type10, { paddingTop: 16 }]}>
            { isDisable !== false ? 'Jumlah Penagihan' : '*Jumlah Penagihan'}
          </Text>
          <View
            style={[
              styles.boxInput,
              { flexDirection: 'row', alignItems: 'center' }
            ]}
          >
            <TextInputMask
              type={'money'}
              options={{
                precision: 0,
                separator: ',',
                delimiter: '.',
                unit: 'Rp ',
                suffixUnit: ''
              }}
              value={billingValue}
              onChangeText={text => dataBillingValue(text)}
              style={[
                Fonts.type17,
                {
                  width: '95%',
                  borderBottomColor: masterColor.fontBlack10
                }
              ]}
            />
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        {isDisable? null : 
        <View style={{marginTop: 16}}>
        <Text style={[Fonts.type10]}>
          { isDisable !== false ? null : 'Materai'}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16
          }}
        >
          <TouchableOpacity
            onPress={() => functionMaterai()}
            style={{ flex: 1 }}
          >
            {checkMaterai ? (
              <MaterialCommunityIcons
                color={masterColor.mainColor}
                name="checkbox-marked"
                size={24}
              />
            ) : (
              <MaterialCommunityIcons
                color={masterColor.fontBlack40}
                name="checkbox-blank-outline"
                size={24}
              />
            )}
          </TouchableOpacity>
          <View style={{ flex: 8 }}>
            <TouchableOpacity
              onPress={() => setOpenModalListMaterai(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              disabled={!checkMaterai}
            >
              <Text style={[Fonts.type17]}>
                {checkMaterai? dataStamp? dataStamp.name : 'Pilih Nilai Materai' :'Pilih Nilai Materai' }
              </Text>
              <View>
                <MaterialIcon
                  name="chevron-right"
                  color={masterColor.fontBlack40}
                  size={24}
                />
              </View>
            </TouchableOpacity>
            <View style={[GlobalStyle.lines, { marginTop: 8 }]} />
          </View>
        </View>
      </View>}
        
      </View>
     
    </>
  )
}


/** MODAL REFERENCE */
const renderModalReference = () => {
  return (
    <View>
      {openModalReference ? (
        <ModalReferenceList
          open={openModalReference}
          close={() => setOpenModalReference(false)}
          onRef={ref => (selectCollection = ref)}
          selectCollection={selectedReference.bind(this)}
          supplierId = {selectedMerchant.supplierId}
          storeId= {selectedMerchant.storeId}
          paymentCollectionTypeId = {props.paymentCollectionTypeId}
          type={'cek'}
        />
      ) : null}
    </View>
  );
}

/** MODAL BANK ACCOUNT */
const renderModalBank = () => {
  return (
    <View>
      {openModalBank ? (
        <ModalBankAccount
          open={openModalBank}
          close={() => setOpenModalBank(false)}
          onRef={ref => (selectCollection = ref)}
          selectCollection={selectedBank.bind(this)}
          supplierId = {selectedMerchant.supplierId}
          storeId= {selectedMerchant.storeId}
          paymentCollectionTypeId = {props.paymentCollectionTypeId}
        />
      ) : null}
    </View>
  );
}

/** MODAL STAMP */
const renderModalListMaterai = () => {
  return (
    <View>
      {openModalListMaterai ? (
        <ModalListMaterai
          open={openModalListMaterai}
          close={() => setOpenModalListMaterai(false)}
          onRef={ref => (selectCollection = ref)}
          selectStamp={selectedStamp.bind(this)}
          supplierId = {selectedMerchant.supplierId}
          storeId= {selectedMerchant.storeId}
          paymentCollectionTypeId = {props.paymentCollectionTypeId}
        />
      ) : null}
    </View>
  );
}

const functionMaterai = () => {
  setCheckMaterai (!checkMaterai)
  props.isUsedStamp(!checkMaterai)
  if (checkMaterai === false) {
    setDataStamp()
    props.stamp(null)
  }
}

const selectedReference = (data) => {
  setDataReference(data)
  setOpenModalReference(false)
  setIsDisable(true)
  props.referenceCode(data.referenceCode)
  props.bankSource(data.bankSource)
  props.issuedDate(data.issuedDate)
  props.dueDate(data.invalidDate)
  props.balance(data.balance)
  props.useNoReference(true)
  props.paymentCollectionMethodId(data.id)
}

const selectedBank = (data) => {
  setDataBank(data)
  setOpenModalBank(false)
  props.bankSource(data.id)
}

const selectedStamp = (data) => {
  setDataStamp(data)
  setOpenModalListMaterai(false)
  props.stamp(data.id)
}

  return (
    <>
    {renderContent()}
    {renderPublishDate()}
    {renderDueDate()}
    {renderModalReference()}
    {renderModalBank()}
    {renderModalListMaterai()}
    </>
  );
};

export default SfaAddTagihanCheque;

const style = StyleSheet.create({
  boxMenu: {
    // paddingHorizontal: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
