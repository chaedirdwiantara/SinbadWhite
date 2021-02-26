import React, { useState } from 'react';
import styles from '../../helpers/GlobalFont';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput
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
const SfaAddTagihanGiro = props => {
  const status = props.status;
  const [noRef, setNoRef] = useState('');
  const [bankSource, setBankSource] = useState('');
  const [issuedDate, setIssuedDate] = useState(new Date());
  const [invalidDate, setInvalidDate] = useState(new Date());
  const [balance, setBalance] = useState(0);
  const [collection, setCollection] = useState(0);
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
  const [dataSubmit, setDataSubmit] = useState({
    balance: 0,
    issuedDate: new Date(),
    invalidDate: new Date() + 1,
    bankAccount : ''
  })
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
    setIsDisable(false)
    setDataSubmit({
      balance: 0,
      issuedDate: new Date(),
      invalidDate: new Date() + 1,
      bankAccount : '',  
    }
    )
    setDataReference()
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
              onSelect={date => alert(date)}
              close={() => setOpenModalPublishDate(false)}
              minDate={new Date()}
              //  maxDate={new Date("2021-02-25")}
            />
          </View>
        }
      />
    );
  };

  const renderDueDate = () => {
    return (
      <ModalBottomType4
        typeClose={'Tutup'}
        open={openModalDueDate}
        title={'Tanggal Jatuh Tempo'}
        close={() => setOpenModalDueDate(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => alert(date)}
              close={() => setOpenModalDueDate(false)}
              //  minDate={new Date("2021-02-20")}
              maxDate={new Date('2021-02-25')}
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
                 isDisable !== false ? 'Nomor Giro' : '*Nomor Referensi'
                }
                value={noRef}
                placeholder={
                  dataReference? dataSubmit.referenceCode : '*Nomor Referensi'
                }
                keyboardType={'default'}
                text={text => setNoRef(text)}
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
                style={{
                  backgroundColor: 'red',
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
                {dataReference? dataSubmit.bankAccount : dataBank? dataBank.displayName : 'Pilih Sumber Bank'}
                {/* {dataBank? dataSubmit.displayName:   } */}
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
                  ? moment(dataSubmit.issuedDate).format('DD/MM/YYYY')
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
                  ? moment(dataSubmit.invalidDate).format('DD/MM/YYYY')
                  :  moment(invalidDate).format('DD/MM/YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines]} />
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text style={Fonts.type10}>
            { isDisable !== false ? 'Nilai Giro' : '*Nilai Giro'}
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
            value={dataReference? dataSubmit.balance : 0}
            onChangeText={text =>setDataSubmit({...dataSubmit, balance: text})}
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
              value={collection}
              onChangeText={text => console.log(text)}
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
  if (checkMaterai === false) {
    setDataStamp()
  }
}

const selectedReference = (data) => {
  setDataReference(data)
  setOpenModalReference(false)
  setDataSubmit({...dataSubmit, 
    referenceCode:data.referenceCode,
    balance: data.balance,
    bankAccount: data.bankSource,
    invalidDate: data.invalidDate,
    issuedDate: data.issuedDate})
  setIsDisable(true)
}

const selectedBank = (data) => {
  setDataBank(data)
  setOpenModalBank(false)
}

const selectedStamp = (data) => {
  setDataStamp(data)
  setOpenModalListMaterai(false)
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

export default SfaAddTagihanGiro;

const style = StyleSheet.create({
  boxMenu: {
    // paddingHorizontal: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
