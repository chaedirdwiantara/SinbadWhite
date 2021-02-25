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
const SfaAddTagihanCheque = props => {
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
  const [dataReference, setDataReference] = useState()

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
              minDate={new Date('2021-02-20')}
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
          {/* <Text>
            {status === 'available' ? 'Nomor Cek' : '*Nomor Referensi'}
          </Text> */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 3 }}>
              <InputType5
                title={
                  status === 'available' ? 'Nomor Cek' : '*Nomor Referensi'
                }
                value={noRef}
                placeholder={
                  status === 'available' ? 'Nomor Cek' : '*Nomor Referensi'
                }
                keyboardType={'default'}
                text={text => setNoRef(text)}
              />
            </View>

            <View style={{ flex: 1 }}>
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
          </View>
        </View>
        <View>
          <Text style={Fonts.type10}>
            {status === 'available' ? 'Sumber Bank' : '*Sumber Bank'}
          </Text>
          <View>
            <TouchableOpacity
              style={style.boxMenu}
              onPress={() => console.log('open bank list')}
            >
              <Text
                style={[
                  Fonts.type17,
                  { opacity: bankSource === '' ? 0.5 : null }
                ]}
              >
                {bankSource === '' ? 'Pilih Sumber Bank' : bankSource.name}
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
            {status === 'available' ? 'Tanggal Terbit' : '*Tanggal Terbit'}
          </Text>
          <TouchableOpacity
            style={style.boxMenu}
            onPress={() => openPublishDate()}
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
                {bankSource === ''
                  ? moment(invalidDate).format('DD/MM/YYYY')
                  : bankSource.name}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines]} />
        </View>
        <View>
          <Text style={Fonts.type10}>
            {status === 'available'
              ? 'Tanggal Jatuh Tempo'
              : '*Tanggal Jatuh Tempo'}
          </Text>
          <TouchableOpacity style={style.boxMenu} onPress={() => openDueDate()}>
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
                {bankSource === ''
                  ? moment(invalidDate).format('DD/MM/YYYY')
                  : bankSource.name}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines]} />
        </View>
        <View style={{ paddingTop: 16 }}>
          <Text style={Fonts.type10}>
            {status === 'available' ? 'Nilai Cek' : '*Nilai Cek'}
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
              value={balance}
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
        <View>
          <Text style={[Fonts.type10, { paddingTop: 16 }]}>
            {status === 'available' ? 'Jumlah Penagihan' : '*Jumlah Penagihan'}
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
        <View>
          <Text style={[Fonts.type10, { paddingTop: 16 }]}>
            {status === 'available' ? null : 'Materai'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 16
            }}
          >
            <TouchableOpacity
              onPress={() => setCheckMaterai(!checkMaterai)}
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
                onPress={() => console.log('open bank list')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={[Fonts.type17]}>
                  {bankSource === '' ? 'Pilih Nilai Materai' : bankSource.name}
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
        </View>
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
        />
      ) : null}
    </View>
  );
}

const selectedReference = (data) => {
  console.log(data, 'data');
  setDataReference(data)
  setOpenModalReference(false)
  console.log(dataReference, 'data reference');
}

  return (
    <>
    {renderContent()}
    {renderPublishDate()}
    {renderDueDate()}
    {renderModalReference()}
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
