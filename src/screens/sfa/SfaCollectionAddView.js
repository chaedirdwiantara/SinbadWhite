import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from '../../library/reactPackage';
import { MaterialIcon, moment } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';
import { GlobalStyle, Fonts, MoneyFormatSpace } from '../../helpers';
import {
  APPROVED,
  REJECTED,
  PENDING
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';
import {
  ButtonSingle,
  InputType5,
  DatePickerSpinnerWithMinMaxDate,
  ModalBottomType4
} from '../../library/component';
import { TextInputMask } from 'react-native-masked-text';
import SfaImageInput from './sfaComponents/SfaImageInput';
const SfaCollectionAddView = props => {
  const [amount, setAmount] = useState(0);
  const [noReference, setNoReference] = useState('');
  const [issuedDate, setIssuedDate] = useState(null);
  const [isModalBankOpen, setIsModalBankOpen] = useState(false);
  const [isModalIssuedDateOpen, setIsModalIssuedDateOpen] = useState(false);

  const [imageName, setImageName] = useState();
  const [imageType, setImageType] = useState();
  const [imageData, setImageData] = useState();

  const onChangeReference = value => {
    setNoReference(value);
  };

  const onChangeAmount = value => {
    setAmount(value);
  };

  const onChooseImage = response => {
    setImageData(response.data);
    setImageName(response.fileName);
    setImageType(response.type);
  };

  const onDeleteImage = () => {
    setImageData();
    setImageName();
    setImageType();
  };

  const onSelectIssuedDate = date => {
    setIssuedDate(date);
  };

  const openIssuedDate = () => {
    setIsModalIssuedDateOpen(true);
  };
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderDataInput = () => {
    return (
      <View>
        <View style={{ marginHorizontal: -16, marginBottom: 16 }}>
          <InputType5
            title={'*Nomor Referensi'}
            value={noReference}
            placeholder={'Nomor Referensi'}
            keyboardType={'default'}
            onChangeText={text => onChangeReference(text.trim())}
            tooltip={true}
            tooltipText={'Dapat berupa Nomor Cek, Giro, Transfer atau Kuitansi'}
            editable={true}
          />
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={Fonts.type10}>*Sumber Bank</Text>
          <TouchableOpacity
            style={styles.boxMenu}
            onPress={() => setIsModalBankOpen(true)}
            disabled={false}
          >
            <Text style={[Fonts.type31]}>Pilih Sumber Bank</Text>
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

        {renderIssuedDate()}
        <Text style={[Fonts.type10]}>*Jumlah Penagihan</Text>
        <View
          style={[
            GlobalStyle.boxInput,
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
            value={amount}
            onChangeText={value => onChangeAmount(value)}
            style={[
              Fonts.type17,
              {
                width: '95%',
                borderBottomColor: masterColor.fontBlack10
              }
            ]}
          />
        </View>
        <View style={[GlobalStyle.lines, { marginBottom: 8 }]} />
        <SfaImageInput
          title={'*Foto Penagihan'}
          action={onChooseImage}
          delete={onDeleteImage}
        />
      </View>
    );
  };

  /** RENDER COLLECTION METHOD */
  const renderCollectionMethod = () => {
    return (
      <View>
        <Text style={[Fonts.type10, styles.titleInput]}>Metode Penagihan</Text>
        <Text style={[Fonts.type17, { marginBottom: 16 }]}>Tunai</Text>
      </View>
    );
  };
  /** RENDER CONTENT */
  const renderContent = () => {
    return (
      <View style={[styles.contentContainer, GlobalStyle.shadowForBox]}>
        {renderCollectionMethod()}
        {renderDataInput()}
      </View>
    );
  };

  /** RENDER BUTTON */
  const renderButton = () => {
    return (
      <>
        <ButtonSingle
          onPress={() => console.log('clicked')}
          title={'Tambah Penagihan'}
          borderRadius={4}
        />
      </>
    );
  };

  /** RENDER BOTTOM TAB */
  const renderBottomTab = () => {
    return (
      <View>
        <View style={styles.totalCollection}>
          <Text style={[Fonts.type23, { flex: 1 }]}>Total Penagihan</Text>
          <Text style={[Fonts.type116p, { flex: 1, textAlign: 'right' }]}>
            {MoneyFormatSpace(10000)}
          </Text>
        </View>
        {renderButton()}
      </View>
    );
  };

  /** RENDER ISSUED DATE */
  const renderIssuedDate = () => {
    return (
      <View style={{ marginBottom: 8 }}>
        <Text style={Fonts.type10}>Tanggal Terbit</Text>
        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => openIssuedDate()}
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
                {
                  marginLeft: 11
                }
              ]}
            >
              Pilih Tanggal Terbit
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines]} />
      </View>
    );
  };
  /** RENDER MODAL ISSUED DATE */
  const renderModalIssuedDate = () => {
    return (
      <ModalBottomType4
        typeClose={'Tutup'}
        open={isModalIssuedDateOpen}
        title={'Tanggal Terbit'}
        close={() => setIsModalIssuedDateOpen(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => onSelectIssuedDate(date)}
              close={() => setIsModalIssuedDateOpen(false)}
              maxDate={new Date()}
            />
          </View>
        }
      />
    );
  };
  /**
   * *********************************
   * RENDER MAIN
   * *********************************
   */
  return (
    <>
      <ScrollView>{renderContent()}</ScrollView>
      {renderBottomTab()}
      {renderModalIssuedDate()}
    </>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: masterColor.fontBlack40,
    borderWidth: 1
  },
  titleInput: {
    marginBottom: 16
  },
  boxMenu: {
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  totalCollection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flexDirection: 'row',
    alignContent: 'space-between'
  }
});
export default SfaCollectionAddView;
