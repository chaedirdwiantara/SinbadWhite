import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from '../../library/reactPackage';
import {
  MaterialIcon,
  MaterialCommunityIcons
} from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';
import { GlobalStyle, Fonts, MoneyFormatSpace } from '../../helpers';
import {
  APPROVED,
  REJECTED,
  PENDING,
  CASH,
  CHECK,
  GIRO,
  TRANSFER,
  PROMO
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
  const paymentCollectionMethodId = 4;
  const [amount, setAmount] = useState(0);
  const [noReference, setNoReference] = useState('');
  const [issuedDate, setIssuedDate] = useState(null);
  const [invalidDate, setInvalidDate] = useState(null);
  const [isModalBankOpen, setIsModalBankOpen] = useState(false);
  const [isModalIssuedDateOpen, setIsModalIssuedDateOpen] = useState(false);
  const [isModalInvalidDateOpen, setIsModalInvalidDateOpen] = useState(false);
  const [isStampChecked, setIsStampChecked] = useState(false);
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

  const onSelectInvalidDate = date => {
    setInvalidDate(date);
  };

  const onCheckStamp = () => {
    setIsStampChecked(!isStampChecked);
    if (isStampChecked === false) {
      console.log('lalla');
    }
  };

  const openIssuedDate = () => {
    setIsModalIssuedDateOpen(true);
  };

  const openInvalidDate = () => {
    setIsModalInvalidDateOpen(true);
  };
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderDataInput = () => {
    return (
      <View>
        {renderReference()}
        {renderBankSource()}
        {renderIssuedDate()}
        {renderInvalidDate()}
        {renderMaterai()}
        {renderAmount()}
        {renderImage()}
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

  /** RENDER AMOUNT */
  const renderAmount = () => {
    return (
      <>
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
      </>
    );
  };

  /** RENDER REFERENCE */
  const renderReference = () => {
    return paymentCollectionMethodId === CHECK ||
      paymentCollectionMethodId === GIRO ||
      paymentCollectionMethodId === TRANSFER ? (
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
    ) : null;
  };

  /** RENDER BANK SOURCE */
  const renderBankSource = () => {
    return paymentCollectionMethodId === CHECK ||
      paymentCollectionMethodId === GIRO ||
      paymentCollectionMethodId === TRANSFER ? (
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
    ) : null;
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

  /** RENDER INVALID DATE */
  const renderInvalidDate = () => {
    return paymentCollectionMethodId === CHECK ||
      paymentCollectionMethodId === GIRO ? (
      <View style={{ marginBottom: 8 }}>
        <Text style={Fonts.type10}>*Tanggal Jatuh Tempo</Text>
        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => openInvalidDate()}
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
              Pilih Tanggal Jatuh Tempo
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines]} />
      </View>
    ) : null;
  };

  /** RENDER ISSUED DATE */
  const renderIssuedDate = () => {
    return (
      <View style={{ marginBottom: 8 }}>
        <Text style={Fonts.type10}>*Tanggal Terbit</Text>
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

  /** RENDER MATERAI */
  const renderMaterai = () => {
    return paymentCollectionMethodId === CHECK ||
      paymentCollectionMethodId === GIRO ? (
      <View style={{ marginTop: 16 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[Fonts.type10]}>Materai</Text>
          {/* {renderTooltip()} */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16
          }}
        >
          <TouchableOpacity onPress={() => onCheckStamp()} style={{ flex: 1 }}>
            {isStampChecked ? (
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
              onPress={() => console.log('true')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              disabled={!isStampChecked}
            >
              <Text style={[Fonts.type17]}>Materai</Text>
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
    ) : null;
  };

  /** RENDER IMAGE */
  const renderImage = () => {
    return (
      <SfaImageInput
        title={'*Foto Penagihan'}
        action={onChooseImage}
        delete={onDeleteImage}
      />
    );
  };
  /** RENDER MODAL ISSUED DATE */
  const renderModalIssuedDate = () => {
    return (
      <ModalBottomType4
        typeClose={'cancel'}
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

  /** RENDER INVALID DATE */
  const renderModalInvalidDate = () => {
    const minDate = new Date(new Date().setDate(new Date().getDate() + 1));
    const today = new Date();
    return (
      <ModalBottomType4
        typeClose={'cancel'}
        open={isModalInvalidDateOpen}
        title={'Tanggal Jatuh Tempo'}
        close={() => setIsModalInvalidDateOpen(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => onSelectInvalidDate(date)}
              close={() => setIsModalInvalidDateOpen(false)}
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
      {renderModalInvalidDate()}
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
