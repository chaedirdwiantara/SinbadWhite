import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput
} from '../../library/reactPackage';
import { TextInputMask } from 'react-native-masked-text';
import { MaterialIcon, moment, Tooltip } from '../../library/thirdPartyPackage';
import {
  InputType5,
  DatePickerSpinnerWithMinMaxDate,
  ModalBottomType4
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import ImagePicker from 'react-native-image-picker';
import ModalReferenceList from './ModalReferenceList';
import ModalBankDestination from './ModalBankDestination';
import ModalBankAccount from './ModalBankAccount';
import { useSelector, useDispatch } from 'react-redux';
import { sfaGetTransferImageProcess } from '../../state/actions';
import { stat } from 'react-native-fs';
const { width, height } = Dimensions.get('window');

const SfaEditCollectionTransfer = props => {
  const status = props.status;
  const dispatch = useDispatch();
  const [openModalTransferDate, setOpenModalTransferDate] = useState(false);
  const [errorInputImage, setErrorInputImage] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(true);
  const [isDisable, setIsDisable] = useState(!props.data.paymentCollection.isPrimary);
  const [openModalReference, setOpenModalReference] = useState(false);
  const [openModalBank, setOpenModalBank] = useState(false);
  const [openModalBankDestination, setOpenModalBankDestination] = useState(
    false
  );
  const [dataReference, setDataReference] = useState(null);

  //DATA INPUT
  const [noRef, setNoRef] = useState(props.data.paymentCollection.paymentCollectionMethod.reference);
  const [bankSource, setBankSource] = useState(props.data.paymentCollection.paymentCollectionMethod.bankFrom);
  const [bankDestination, setBankDestination] = useState(props.data.paymentCollection.paymentCollectionMethod.bankToAccount);
  const [transferDate, setTransferDate] = useState(props.data.paymentCollection.paymentCollectionMethod.date);
  const [balance, setBalance] = useState(props.data.paymentCollection.paymentCollectionMethod.amount);
  const [billingValue, setBillingValue] = useState(props.data.paymentCollection.paidAmount);
  const [dataImage, setDataImage] = useState(props.data.paymentCollection.paymentCollectionMethod.image);

  //SELECTOR
  const { selectedMerchant } = useSelector(state => state.merchant);
  const { dataSfaGetTransferImage, loadingSfaGetTransferImage } = useSelector(
    state => state.sfa
  );

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  useEffect(() => {
    setExistingImage();
  }, [dataSfaGetTransferImage]);

  useEffect(() => {
    if (noRef && balance && billingValue && dataImage) {
      props.buttonDisabled(false)
    } else {
      props.buttonDisabled(true)
    }
  }, [noRef, balance, billingValue, dataImage])

  useEffect(() => {
    const data = {
      image: dataImage,
      isEditable: props.data.isEditable,
      outstanding: props.data.outstanding,
      paymentCollection: {
        id : props.data.paymentCollection.id,
        paidAmount: billingValue,
        paymentCollectionMethod: {
          amount: balance,
          balance: props.data.paymentCollection.paymentCollectionMethod.balance,
          bankFrom: {
            id: bankSource ? bankSource.id : null,
            name: bankSource ? bankSource.name : null,
          },
          bankToAccount: {
            accountNo: bankDestination.accountNo,
            displayName: bankDestination.displayName,
            id: bankDestination.id,
          },
          date: transferDate,
          dueDate: props.data.paymentCollection.paymentCollectionMethod.dueDate,
          id: props.data.paymentCollection.paymentCollectionMethod.id,
          paymentCollectionType: props.data.paymentCollection.paymentCollectionMethod.paymentCollectionType,
          principal: props.data.paymentCollection.paymentCollectionMethod.principal,
          promoNo: props.data.paymentCollection.paymentCollectionMethod.promoNo,
          reference: noRef,
          stamp: props.data.paymentCollection.paymentCollectionMethod.stamp
        }
      }
    }
    props.newData(data)
  }, [noRef, bankSource, bankDestination, transferDate, balance, billingValue, dataImage]);

  const setExistingImage = () => {
    if (dataSfaGetTransferImage && dataReference) {
      setDataImage({ fileData: dataSfaGetTransferImage.data.image });
    }
  };

  const openTransferDate = () => {
    setOpenModalTransferDate(true);
  };

  const clickCamera = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      maxWidth: 800,
      quality: 1
      // maxHeight: 600
    };

    ImagePicker.showImagePicker(options, response => {
      setErrorInputImage(false);

      if (response.didCancel) {
        null;
      } else if (response.error) {
        null;
      } else if (response.customButton) {
        null;
      } else if (response.fileSize > 2000000) {
        setErrorInputImage(true);
      } else {
        // const source = { uri: response.uri };
        props.transferImage({
          fileName: response.fileName,
          fileData: response.data,
          fileType: response.type,
          fileUri: response.uri,
          fileSize: response.fileSize
        });
        setDataImage({
          fileName: response.fileName,
          fileData: response.data,
          fileType: response.type,
          fileUri: response.uri,
          fileSize: response.fileSize
        });
      }
    });
  };

  const deleteImage = () => {
    props.transferImage(null);
    setDataImage(null);
  };

  const textReference = text => {
    props.isChanged(true);
    props.referenceCode(text);
    setNoRef(text);
  };

  const textTransferDate = date => {
    props.isChanged(true);
    setTransferDate(date);
    props.transferDate(moment(date).format('YYYY-MM-DD'));
  };

  const textTransferValue = text => {
    props.isChanged(true);
    setBalance(parseInt(text.replace(/[Rp.]+/g, '')));
    props.transferValue(parseInt(text.replace(/[Rp.]+/g, '')));
  };

  const textBillingValue = text => {
    props.isChanged(true);
    if (
      parseInt(text.replace(/[Rp.]+/g, '')) > parseInt(props.data.outstanding)
    ) {
      if (props.data.outstanding < balance){
        setBillingValue(parseInt(props.data.outstanding));
        props.billingValue(parseInt(props.data.outstanding));
      } else {
        setBillingValue(parseInt(balance));
        props.billingValue(parseInt(balance));
      }
    } else if (
      parseInt(text.replace(/[Rp.]+/g, '')) > parseInt(balance)
    ) {
      if (props.data.outstanding < balance){
        setBillingValue(parseInt(props.data.outstanding));
        props.billingValue(parseInt(props.data.outstanding));
      } else {
        setBillingValue(parseInt(balance));
        props.billingValue(parseInt(balance));
      }
    } else {
      setBillingValue(parseInt(text.replace(/[Rp.]+/g, '')));
      props.billingValue(parseInt(text.replace(/[Rp.]+/g, '')));
    }
  };

  useEffect(()=> {
    if (
      parseInt(billingValue) > parseInt(props.data.outstanding)
    ) {
      if (props.data.outstanding < balance){
        setBillingValue(parseInt(props.data.outstanding));
        props.billingValue(parseInt(props.data.outstanding));
      } else {
        setBillingValue(parseInt(balance));
        props.billingValue(parseInt(balance));
      }
    } else if (
      parseInt(billingValue) > parseInt(balance)
    ) {
      if (props.data.outstanding < balance){
        setBillingValue(parseInt(props.data.outstanding));
        props.billingValue(parseInt(props.data.outstanding));
      } else {
        setBillingValue(parseInt(balance));
        props.billingValue(parseInt(balance));
      }
    } else {
      setBillingValue(parseInt(billingValue));
      props.billingValue(parseInt(billingValue));
    }
  }, [billingValue, balance]) 

  const selectedBank = data => {
    props.isChanged(true);
    props.bankSource(data);
    setBankSource(data);
    setOpenModalBank(false);
  };

  const selectedBankDestination = data => {
    props.isChanged(true);
    props.bankAccount(data);
    setBankDestination(data);
    setOpenModalBankDestination(false);
  };

  const selectedReference = data => {
    props.isChanged(true);
    if (props.collectionMethod.id === 4) {
      dispatch(sfaGetTransferImageProcess(data.id));
    }
    setDataReference(data);

    //DATA INPUT
    setNoRef(data.referenceCode);
    props.isChanged(true);
    props.referenceCode(data.referenceCode);
    setBankSource(data.bankSource);
    props.bankSource(data.bankSource);
    setBankDestination(data.bankToAccount);
    props.bankAccount(data.bankToAccount);
    setTransferDate(data.issuedDate);
    props.transferDate(moment(data.issuedDate).format('YYYY-MM-DD'));
    setBalance(parseInt(data.balance));
    props.transferValue(parseInt(data.balance));

    setDataImage({ fileData: data.image });
    props.transferImage(data.image);

    props.useNoReference(true);
    setOpenModalReference(false);
    setIsDisable(true);
    props.paymentCollectionMethodId(data.id)
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */
  const renderForm = () => {
    return (
      <View>
        {renderFormReference()}
        {renderFormBankSource()}
        {renderFormBankAccount()}
        {renderTransferDate()}
        {renderTransferValue()}
        {renderBillingValue()}
        {renderUploadImage()}
      </View>
    );
  };

  const renderFormReference = () => {
    const collectionDetail = props.data.paymentCollection
    return (
      <View style={{ marginHorizontal: -16, marginVertical: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 3 }}>
            <InputType5
              title={
                isDisable !== false ? 'Nomor Referensi' : '*Nomor Referensi'
              }
              value={noRef}
              placeholder={isDisable ? 'Nomor Referensi' : '*Nomor Referensi'}
              onChangeText={text => textReference(text.trim())}
              keyboardType={'default'}
              text={text => setNoRef(text)}
              editable={!isDisable}
              tooltip={true}
              tooltipText={
                'Dapat berupa Nomor Cek, Giro, Transfer atau Kuitansi'
              }
            />
          </View>
        </View>
      </View>
    );
  };

  const renderFormBankSource = () => {
    return (
      <View>
        <Text style={Fonts.type10}>
          {isDisable ? 'Sumber Bank' : '*Sumber Bank'}
        </Text>
        <View>
          <TouchableOpacity
            style={styles.boxMenu}
            onPress={() => setOpenModalBank(true)}
            disabled={isDisable}
          >
            <Text
              style={[
                Fonts.type17,
                {
                  opacity:
                    bankSource === null || isDisable === true ? 0.5 : null
                }
              ]}
            >
              {bankSource === null
                ? 'Pilih Sumber Bank'
                : isDisable === true
                ? bankSource.displayName
                : bankSource.displayName}
            </Text>
            <View style={{ position: 'absolute', right: 16 }}>
              <MaterialIcon
                name="chevron-right"
                color={masterColor.fontBlack40}
                size={24}
              />
            </View>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines, { marginBottom: 8 }]} />
        </View>
      </View>
    );
  };

  const renderFormBankAccount = () => {
    return (
      <View>
        <Text style={Fonts.type10}>
          {isDisable ? 'Tujuan Bank' : '*Tujuan Bank'}
        </Text>
        <View>
          <TouchableOpacity
            style={styles.boxMenu}
            onPress={() => setOpenModalBankDestination(true)}
            disabled={isDisable}
          >
            <Text
              style={[
                Fonts.type17,
                {
                  opacity:
                    bankDestination === null || isDisable === true ? 0.5 : null
                }
              ]}
            >
              {bankDestination === null
                ? 'Pilih Tujuan Bank'
                : bankDestination.bank ? bankDestination.bank.displayName : bankDestination.displayName}
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
    );
  };

  const renderTransferDate = () => {
    return (
      <View style={{ paddingVertical: 16 }}>
        <Text style={Fonts.type10}>
          {isDisable ? 'Tanggal Transfer' : '*Tanggal Transfer'}
        </Text>
        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => openTransferDate()}
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
                {
                  opacity:
                    transferDate === null || isDisable === true ? 0.5 : null,
                  marginLeft: 11
                }
              ]}
            >
              {transferDate !== null
                ? moment(transferDate).format('DD/MM/YYYY')
                : 'Pilih Tanggal Transfer'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines]} />
      </View>
    );
  };

  const renderTransferValue = () => {
    return (
      <View style={{ paddingTop: 16 }}>
        <Text style={Fonts.type10}>
          {isDisable ? 'Nilai Transfer' : '*Nilai Transfer'}
        </Text>
        <View
          style={[
            GlobalStyle.boxInput,
            { flexDirection: 'row', alignItems: 'center' }
          ]}
        >
          <TextInputMask
            editable={!isDisable}
            type={'money'}
            options={{
              precision: 0,
              separator: ',',
              delimiter: '.',
              unit: 'Rp ',
              suffixUnit: ''
            }}
            value={balance}
            onChangeText={text => textTransferValue(text)}
            style={[
              Fonts.type17,
              {
                width: '95%',
                borderBottomColor: masterColor.fontBlack10,
                opacity: isDisable === true ? 0.5 : null
              }
            ]}
          />
        </View>
        <View style={GlobalStyle.lines} />
      </View>
    );
  };

  const renderBillingValue = () => {
    return (
      <View>
        <Text style={[Fonts.type10, { paddingTop: 16 }]}>
          {isDisable ? 'Jumlah Penagihan' : '*Jumlah Penagihan'}
        </Text>
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
            value={billingValue}
            onChangeText={text => textBillingValue(text)}
            style={[
              Fonts.type17,
              {
                width: '95%',
                borderBottomColor: masterColor.fontBlack10
              }
            ]}
          />
        </View>
        <View style={GlobalStyle.lines} />
      </View>
    );
  };

  const renderUploadImage = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[Fonts.type10, { paddingTop: 16 }]}>
            {isDisable ? 'Unggah Foto/Gambar' : '*Unggah Foto/Gambar'}
          </Text>
          {renderTooltip()}
        </View>
        {dataReference ? (
          dataImage ? (
            dataImage.fileData ? (
              <View style={styles.smallContainerImage}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64, ${dataImage.fileData}`
                  }}
                  style={[
                    styles.images,
                    { opacity: isDisable === true ? 0.5 : null }
                  ]}
                />
              </View>
            ) : (
              <View style={styles.smallContainerImage}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64, ${dataImage}`
                  }}
                  style={[
                    styles.images,
                    { opacity: isDisable === true ? 0.5 : null }
                  ]}
                />
              </View>
            )
          ) : (
            <View style={[styles.smallContainerImage, {height: 250}]}>
              <Image
                source={require('../../assets/gif/loading/load_triagle.gif')}
                style={{ height: 50, width: 50 }}
              />
            </View>
           
          )
        ) : dataImage ? (
          <View style={{ marginTop: 12 }}>
            {dataImage.fileData ? (
              <View style={styles.smallContainerImage}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64, ${dataImage.fileData}`
                  }}
                  style={[
                    styles.images,
                    { opacity: isDisable === true ? 0.5 : null }
                  ]}
                />
              </View>
            ) : (
              <View style={styles.smallContainerImage}>
                <Image
                  source={{
                    uri: `data:image/jpeg;base64, ${dataImage}`
                  }}
                  style={[
                    styles.images,
                    { opacity: isDisable === true ? 0.5 : null }
                  ]}
                />
              </View>
            )}
            {isDisable !== true ? (
              <View style={styles.smallContainerButtonImage}>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={() => deleteImage()}
                >
                  <Text style={Fonts.type36}>Hapus</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonImage}
                  onPress={() => clickCamera()}
                >
                  <Text style={Fonts.type36}>Ulangi Foto</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => clickCamera()}
              style={[
                GlobalStyle.shadowForBox,
                { flex: 1, width: 90, marginTop: 12 }
              ]}
            >
              <View>
                <MaterialIcon
                  name="camera-alt"
                  color={masterColor.mainColor}
                  size={50}
                  style={{ alignSelf: 'center', marginTop: 18 }}
                />
              </View>
              <Text
                style={[Fonts.type38, { textAlign: 'center', marginBottom: 8 }]}
              >
                Unggah Foto
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  /**
   * ==================================
   * MODAL
   * ==================================
   */

  /** === RENDER TOOLTIP === */
  const renderTooltip = () => {
    return (
      <View style={{ paddingTop: 18 }}>
        <Tooltip
          backgroundColor={masterColor.fontBlack50OP80}
          height={55}
          withOverlay={false}
          withPointer={false}
          onOpen={() => setOpenTooltip(false)}
          onClose={() => setOpenTooltip(true)}
          containerStyle={{
            padding: 8,
            width: 0.4 * width
          }}
          popover={
            <Text style={Fonts.type87}>
              Dapat berupa foto Bukti Transfer atau Kuitansi
            </Text>
          }
        >
          {openTooltip ? (
            <MaterialIcon
              name="help"
              style={{ marginLeft: 4 }}
              size={13}
              color={masterColor.mainColor}
            />
          ) : (
            <View />
          )}
        </Tooltip>
      </View>
    );
  };

  const renderModalTransferDate = () => {
    return (
      <ModalBottomType4
        typeClose={'Tutup'}
        open={openModalTransferDate}
        title={'Tanggal Transfer'}
        close={() => setOpenModalTransferDate(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => textTransferDate(date)}
              close={() => setOpenModalTransferDate(false)}
              //  minDate={new Date("2021-02-20")}
              maxDate={new Date()}
            />
          </View>
        }
      />
    );
  };

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
            supplierId={selectedMerchant.supplierId}
            storeId={selectedMerchant.storeId}
            paymentCollectionTypeId={props.data.paymentCollection.paymentCollectionMethod.id}
          />
        ) : null}
      </View>
    );
  };

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
            supplierId={selectedMerchant.supplierId}
            storeId={selectedMerchant.storeId}
            paymentCollectionTypeId={props.paymentCollectionTypeId}
          />
        ) : null}
      </View>
    );
  };

  /** MODAL BANK DESTINATION */
  const renderModalBankDestination = () => {
    return (
      <View>
        {openModalBankDestination ? (
          <ModalBankDestination
            open={openModalBankDestination}
            close={() => setOpenModalBankDestination(false)}
            onRef={ref => (selectBankDestination = ref)}
            selectBankDestination={selectedBankDestination.bind(this)}
            supplierId={selectedMerchant.supplierId}
            storeId={selectedMerchant.storeId}
            paymentCollectionTypeId={props.data.paymentCollection.paymentCollectionMethod.id}
          />
        ) : null}
      </View>
    );
  };

  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return <View>{renderForm()}</View>;
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      <View style={styles.mainContainer}>{renderContent()}</View>
      {renderModalTransferDate()}
      {renderModalReference()}
      {renderModalBankDestination()}
      {renderModalBank()}
    </>
  );
};

export default SfaEditCollectionTransfer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  boxMenu: {
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  smallContainerImage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 8
  },
  smallContainerButtonImage: {
    marginVertical: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonImage: {
    width: 148,
    height: 48,
    borderRadius: 5,
    borderColor: masterColor.mainColor,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  images: {
    width: 328,
    height: 328,
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: 'white',
    aspectRatio: 2 / 3
  },
  boxInput: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingBottom: 8,
    borderBottomColor: masterColor.fontBlack40
  }
});
