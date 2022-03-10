/* eslint-disable no-case-declarations */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from '../../library/reactPackage';
import { useDispatch, useSelector } from 'react-redux';
import {
  MaterialIcon,
  MaterialCommunityIcons,
  moment,
  Tooltip
} from '../../library/thirdPartyPackage';
import ModalBankAccount from './ModalBankAccount';
import ModalListMaterai from './ModalListMaterai';
import ModalBankDestination from './ModalBankDestination';
import masterColor from '../../config/masterColor.json';
import { GlobalStyle, Fonts, MoneyFormatSpace } from '../../helpers';
import {
  CASH,
  CHECK,
  GIRO,
  PROMO,
  RETUR,
  TRANSFER
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';
import {
  ButtonSingle,
  InputType5,
  DatePickerSpinnerWithMinMaxDate,
  ModalBottomType4,
  LoadingPage,
  ToolTip,
  StatusBarWhite
} from '../../library/component';
import { TextInputMask } from 'react-native-masked-text';
import SfaImageInput from './components/SfaImageInput';
import ErrorBottomFailPayment from '../../components/error/ModalBottomFailPayment';
import {
  sfaGetReferenceListProcess,
  sfaGetCollectionImageProcess,
  sfaEditCollectionMethodProcess
} from '../../state/actions';
import { collectionMethodLabel } from './functions/sfa';
import InputAmountBox from './components/InputAmountBox';
import { Color } from '../../config';

const { width } = Dimensions.get('window');
const MODAL_TYPE_SOURCE = 1;
const MODAL_TYPE_TO = 2;

const SfaCollectionEditView = props => {
  const dispatch = useDispatch();
  const paymentCollectionTypeId =
    props.navigation.state.params.collectionTypeId;
  const pcmId = props.navigation.state.params.data.id;
  const [initialData, setInitialData] = useState(null);
  const [amount, setAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [noReference, setNoReference] = useState(null);
  const [transferDate, setTransferDate] = useState(null);
  const [issuedDate, setIssuedDate] = useState(null);
  const [invalidDate, setInvalidDate] = useState(null);
  const [dataBank, setDataBank] = useState(null);
  const [dataBankTo, setDataBankTo] = useState(null);
  const [dataStamp, setDataStamp] = useState(null);
  const [modalBankOpenType, setModalBankOpenType] = useState(null);
  const [isModalStampOpen, setIsModalStampOpen] = useState(false);
  const [isModalBankOpen, setIsModalBankOpen] = useState(false);
  const [isModalTransferDateOpen, setIsModalTransferDateOpen] = useState(false);
  const [isModalIssuedDateOpen, setIsModalIssuedDateOpen] = useState(false);
  const [isModalBankDestinationOpen, setIsModalBankDestinationOpen] = useState(
    false
  );
  const [isModalInvalidDateOpen, setIsModalInvalidDateOpen] = useState(false);
  const [isStampChecked, setIsStampChecked] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [questionMarkShow, setQuestionMarkShow] = useState(true);
  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageNameSKP, setImageNameSKP] = useState(null);
  const [imageTypeSKP, setImageTypeSKP] = useState(null);
  const [imageDataSKP, setImageDataSKP] = useState(null);
  const [isModalBottomErrorOpen, setIsModalBottomErrorOpen] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [buttonTitle, setButtonTitle] = useState(null);
  const [invalidAmountRetur, setInvalidAmountRetur] = useState(false);
  const [returnBalance, setReturnBalance] = useState(0);

  /**
   * *********************************
   * RENDER USESELECTOR
   * *********************************
   */
  const { userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const {
    loadingSfaPatchCollectionMethod,
    dataSfaPatchCollectionMethod,
    errorSfaPatchCollectionMethod,
    loadingSfaGetCollectionImage,
    dataSfaGetCollectionImage,
    dataSfaGetCollectionDetail,
    loadingSfaGetCollectionDetail,
    dataSfaGetReturnBalance
  } = useSelector(state => state.sfa);

  /**
   * *********************************
   * RENDER USEREF
   * *********************************
   */
  const prevDataSfaPatchCollectionMethodRef = useRef(
    dataSfaPatchCollectionMethod
  );
  const prevErrorSfaPatchCollectionMethodRef = useRef(
    errorSfaPatchCollectionMethod
  );
  const prevDataSfaGetCollectionImageRef = useRef(dataSfaGetCollectionImage);
  const prevDataSfaGetCollectionDetailRef = useRef(dataSfaGetCollectionDetail);
  /**
   * *********************************
   * RENDER USE EFFECT
   * *********************************
   */
  useEffect(() => {
    prevDataSfaPatchCollectionMethodRef.current = dataSfaPatchCollectionMethod;
  }, []);
  const prevDataSfaPatchCollectionMethod =
    prevDataSfaPatchCollectionMethodRef.current;

  useEffect(() => {
    prevDataSfaGetCollectionImageRef.current = dataSfaGetCollectionImage;
  }, []);
  const prevDataSfaGetCollectionImage =
    prevDataSfaGetCollectionImageRef.current;

  useEffect(() => {
    prevErrorSfaPatchCollectionMethodRef.current = errorSfaPatchCollectionMethod;
  }, []);
  const prevErrorSfaPatchCollectionMethod =
    prevErrorSfaPatchCollectionMethodRef.current;

  useEffect(() => {
    prevDataSfaGetCollectionDetailRef.current = dataSfaGetCollectionDetail;
  }, []);
  const prevDataSfaGetCollectionDetail =
    prevDataSfaGetCollectionDetailRef.current;

  useEffect(() => {
    if (prevDataSfaGetCollectionDetail !== dataSfaGetCollectionDetail) {
      if (dataSfaGetCollectionDetail) {
        getInitialData();
      }
    }
  }, [dataSfaGetCollectionDetail]);

  useEffect(() => {
    getDataReturnBalance();
  }, [dataSfaGetCollectionDetail]);

  useEffect(() => {
    if (prevDataSfaPatchCollectionMethod !== dataSfaPatchCollectionMethod) {
      if (dataSfaPatchCollectionMethod) {
        navigateOnSucces();
      }
    }
  }, [dataSfaPatchCollectionMethod]);

  useEffect(() => {
    if (prevDataSfaGetCollectionImage !== dataSfaGetCollectionImage) {
      if (dataSfaGetCollectionImage) {
        setImageData(dataSfaGetCollectionImage.data.image);
        setImageDataSKP(dataSfaGetCollectionImage.data.skpImage);
        checkInput();
      }
    }
  }, [dataSfaGetCollectionImage]);

  useEffect(() => {
    checkInput();
  }, [
    amount,
    imageData,
    imageDataSKP,
    noReference,
    dataBankTo,
    dataBank,
    issuedDate,
    invalidDate,
    dataStamp
  ]);
  useEffect(() => {
    totalAmountCal(amount);
  }, [amount, dataStamp]);

  useEffect(() => {
    if (isStampChecked === false) {
      setDataStamp(null);
    }
  }, [isStampChecked]);

  useEffect(() => {
    dispatch(sfaGetCollectionImageProcess(pcmId));
  }, []);

  /** HANDLE ERROR POST COLLECTION */
  useEffect(() => {
    if (prevErrorSfaPatchCollectionMethod !== errorSfaPatchCollectionMethod) {
      if (errorSfaPatchCollectionMethod) {
        handleError(errorSfaPatchCollectionMethod);
      }
    }
  }, [errorSfaPatchCollectionMethod]);

  /**
   * *********************************
   * RENDER FUNCTION
   * *********************************
   */
  /** FUNCTION SET INITIAL DATA */
  const getInitialData = () => {
    const detailCollection = dataSfaGetCollectionDetail?.data;
    setInitialData(detailCollection);
    setAmount(detailCollection.amount);
    setTotalAmount(detailCollection.totalAmount);
    setNoReference(detailCollection.reference);
    setTransferDate(detailCollection.issuedDate);
    setIssuedDate(detailCollection.issuedDate);
    setInvalidDate(detailCollection.dueDate);
    setDataBank(detailCollection?.bankFrom || null);
    setDataBankTo(detailCollection.bankToAccount);
    setDataStamp(detailCollection.stamp || 0);
    setIsStampChecked(detailCollection.stamp ? true : false);
    checkInput();
  };

  const getDataReturnBalance = () => {
    const detailCollection = dataSfaGetCollectionDetail?.data;
    const returnAmount =
      detailCollection?.amount + dataSfaGetReturnBalance?.data?.returnBalance ??
      0;
    setReturnBalance(returnAmount);
  };

  /** FUNCTION ON SUCCESS EDIT COLLECTION */
  const navigateOnSucces = () => {
    const data = {
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      storeId: parseInt(selectedMerchant.storeId, 10),
      paymentCollectionTypeId: parseInt(paymentCollectionTypeId, 10),
      userId: parseInt(userSuppliers[0].userId, 10),
      limit: 20,
      loading: true
    };
    dispatch(sfaGetReferenceListProcess(data));
    NavigationService.navigate('SfaCollectionListView', {
      collectionMethodId: paymentCollectionTypeId
    });
  };

  const onChangeReference = value => {
    setNoReference(value);
  };

  const onChangeAmount = value => {
    setAmount(parseInt(value.replace(/[Rp.]+/g, ''), 10));
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

  const onChooseImageSKP = response => {
    setImageDataSKP(response.data);
    setImageNameSKP(response.fileName);
    setImageTypeSKP(response.type);
  };

  const onDeleteImageSKP = () => {
    setImageDataSKP();
    setImageNameSKP();
    setImageTypeSKP();
  };

  const onSelectTransferDate = date => {
    setTransferDate(date);
  };

  const onSelectIssuedDate = date => {
    setIssuedDate(date);
  };
  const onSelectInvalidDate = date => {
    setInvalidDate(date);
  };

  const openTransferDate = () => {
    setIsModalTransferDateOpen(true);
  };

  const openIssuedDate = () => {
    setIsModalIssuedDateOpen(true);
  };

  const openInvalidDate = () => {
    setIsModalInvalidDateOpen(true);
  };

  const onSelectBank = data => {
    setDataBank(data);
    setIsModalBankOpen(false);
  };

  const onSelectBankTo = data => {
    setDataBankTo(data);
    setIsModalBankDestinationOpen(false);
  };

  const onOpenBankTo = () => {
    setIsModalBankDestinationOpen(true);
  };

  const onSelectStamp = data => {
    setDataStamp(data);
    setIsModalStampOpen(false);
  };

  const totalAmountCal = value => {
    switch (paymentCollectionTypeId) {
      case CASH:
      case TRANSFER:
      case RETUR:
      case PROMO:
        setTotalAmount(amount);
        break;
      case CHECK:
      case GIRO:
        const stamp = dataStamp?.nominal || 0;
        const total = amount + stamp;
        setTotalAmount(parseInt(total, 10));
        break;
      default:
        break;
    }
  };

  const checkInput = () => {
    const isAmountChange = initialData?.amount !== amount;
    const isReferenceChange = initialData?.reference !== noReference;
    const isIssuedDateChange = initialData?.issuedDate !== issuedDate;
    const isDueDateChange = initialData?.dueDate !== invalidDate;
    const isBankFromChange =
      initialData?.bankFrom?.displayName !== dataBank?.displayName;
    // const isBankToChange =
    //   initialData?.bankToAccount?.displayName !== dataBankTo?.displayName;
    const isImageChange = dataSfaGetCollectionImage?.data.image !== imageData;
    const isImageSkpChange =
      dataSfaGetCollectionImage?.data.skpImage !== imageDataSKP;
    const isStampNominalChange =
      dataSfaGetCollectionDetail?.data.stamp?.nominal !== dataStamp?.nominal;

    switch (paymentCollectionTypeId) {
      case CASH:
        const isDataCashChange = isAmountChange || isImageChange;
        const isDataCashComplete = amount && imageData;
        if (isDataCashComplete && isDataCashChange) {
          setIsSaveDisabled(false);
        } else {
          setIsSaveDisabled(true);
        }
        break;
      case CHECK:
      case GIRO:
        const isDataCheckGiroChange =
          isAmountChange ||
          isReferenceChange ||
          isIssuedDateChange ||
          isDueDateChange ||
          isBankFromChange ||
          isStampNominalChange ||
          isImageChange;

        const isDataCheckGiroComplete =
          amount &&
          imageData &&
          issuedDate &&
          noReference &&
          invalidDate &&
          dataBank;

        if (isDataCheckGiroComplete && isDataCheckGiroChange) {
          setIsSaveDisabled(false);
        } else {
          setIsSaveDisabled(true);
        }
        break;
      case TRANSFER:
        const isDataTransferChange =
          isAmountChange ||
          isReferenceChange ||
          isIssuedDateChange ||
          isBankFromChange ||
          isBankFromChange ||
          isStampNominalChange ||
          isImageChange;

        const isDataTransferComplete =
          amount &&
          noReference &&
          dataBank &&
          dataBankTo &&
          transferDate &&
          imageData;
        if (isDataTransferComplete && isDataTransferChange) {
          setIsSaveDisabled(false);
        } else {
          setIsSaveDisabled(true);
        }
        break;
      case PROMO:
        const isDataPromoChange =
          isAmountChange || isImageChange || isImageSkpChange;

        const isDataPromoComplete = amount && imageData && imageDataSKP;
        if (isDataPromoComplete && isDataPromoChange) {
          setIsSaveDisabled(false);
        } else {
          setIsSaveDisabled(true);
        }
        break;
      case RETUR:
        if (!amount) {
          setIsSaveDisabled(true);
          setInvalidAmountRetur(false);
        } else {
          if (amount > returnBalance) {
            setIsSaveDisabled(true);
            setInvalidAmountRetur(true);
          } else {
            setIsSaveDisabled(false);
            setInvalidAmountRetur(false);
          }
        }
        break;
      default:
        break;
    }
  };

  const editCollection = () => {
    const data = {
      paymentCollectionId: initialData.id,
      paymentCollectionTypeId: paymentCollectionTypeId,
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      storeId: parseInt(selectedMerchant.storeId, 10),
      userId: parseInt(userSuppliers[0].userId, 10),
      balance: parseInt(amount, 10),
      filename: imageName,
      type: imageType,
      image: imageData
    };

    switch (paymentCollectionTypeId) {
      case CASH:
        dispatch(sfaEditCollectionMethodProcess(data));
        break;
      case CHECK:
      case GIRO:
        const stampId = dataStamp ? dataStamp.id : null;
        const isUsedStamp = dataStamp ? true : false;
        const dateIssued = moment
          .utc(issuedDate)
          .local()
          .format('YYYY-MM-DD HH:mm:ss');
        const dateInvalid = moment
          .utc(invalidDate)
          .local()
          .format('YYYY-MM-DD HH:mm:ss');

        const dataCheckGiro = {
          ...data,
          stampId: stampId,
          isUsedStamp: stampId ? isUsedStamp : false,
          bankId: dataBank.id,
          issuedDate: dateIssued,
          invalidDate: dateInvalid,
          referenceCode: noReference
        };
        dispatch(sfaEditCollectionMethodProcess(dataCheckGiro));
        break;
      case TRANSFER:
        const trfDate = moment
          .utc(transferDate)
          .local()
          .format('YYYY-MM-DD HH:mm:ss');

        const dataTransfer = {
          ...data,
          referenceCode: noReference,
          issuedDate: trfDate,
          bankId: dataBank.id,
          bankToAccountId: dataBankTo.id
        };
        dispatch(sfaEditCollectionMethodProcess(dataTransfer));
        break;
      case RETUR:
        const dataRetur = {
          ...data,
          amount: data.balance
        };

        delete dataRetur.filename;
        delete dataRetur.image;
        delete dataRetur.type;
        delete dataRetur.skpImage;
        delete dataRetur.skpFilename;
        delete dataRetur.skpType;
        delete dataRetur.balance;

        dispatch(sfaEditCollectionMethodProcess(dataRetur));
        break;
      case PROMO:
        const dataPromo = {
          ...data,
          amount: data.balance,
          filenameSkp: imageNameSKP,
          typeSkp: imageTypeSKP,
          imageSkp: imageDataSKP
        };
        delete dataPromo.balance;
        dispatch(sfaEditCollectionMethodProcess(dataPromo));
        break;
      default:
        break;
    }
  };

  /** FUNCTION HANDLE ERROR POST COLLECTION */
  const handleError = error => {
    if (error) {
      switch (error.data.code) {
        case 40005:
          handleErrorSpecific(
            error,
            'Nomor Referensi Duplikat',
            'Oke, Mengerti'
          );
          break;
        default:
          handleErrorGlobal();
          break;
      }
    }
  };
  /** HANDLE ERROR SPECIFIC */
  const handleErrorSpecific = (error, title, buttonText) => {
    setMessageError(error.data.errorMessage);
    setTitleError(title);
    setButtonTitle(buttonText);
    setIsModalBottomErrorOpen(true);
  };
  /** HANDLE ERROR GLOBAL */
  const handleErrorGlobal = () => {
    setMessageError(null);
    setTitleError(null);
    setButtonTitle(null);
    setIsModalBottomErrorOpen(true);
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
        {renderBankTo()}
        {renderTransferDate()}
        {renderIssuedDate()}
        {renderInvalidDate()}
        {renderAmount()}
        {renderAmountRetur()}
        {renderMaterai()}
        {renderImage()}
        {renderImageSKP()}
      </View>
    );
  };

  /** === RENDER NILAI PENAGIHAN BARANG RETUR === */
  const renderAmountRetur = () => {
    return paymentCollectionTypeId === RETUR ? (
      <InputAmountBox
        title={'*Nilai Penagihan Barang Retur'}
        value={amount}
        onChange={onChangeAmount}
        error={invalidAmountRetur}
        errorText={'Nilai Penagihan melebihi batas maksimal saldo barang retur'}
      />
    ) : null;
  };

  /** RENDER COLLECTION METHOD */
  const renderCollectionMethod = () => {
    const id = paymentCollectionTypeId;
    return (
      <View>
        <Text style={[Fonts.type10, styles.titleInput]}>Metode Penagihan</Text>
        <Text style={[Fonts.type17, { marginBottom: 16 }]}>
          {collectionMethodLabel(id)}
        </Text>
      </View>
    );
  };

  /** RENDER AMOUNT */
  const renderAmount = () => {
    return paymentCollectionTypeId !== RETUR ? (
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
    ) : null;
  };
  /** RENDER REFERENCE */
  const renderReference = () => {
    return paymentCollectionTypeId === CHECK ||
      paymentCollectionTypeId === GIRO ||
      paymentCollectionTypeId === TRANSFER ? (
      <View style={{ marginHorizontal: -16, marginBottom: 16 }}>
        <InputType5
          title={'*Nomor Referensi'}
          value={noReference}
          placeholder={'Masukan Nomor Referensi'}
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
    const onPress = () => {
      setIsModalBankOpen(true);
      setModalBankOpenType(MODAL_TYPE_SOURCE);
    };

    return paymentCollectionTypeId === CHECK ||
      paymentCollectionTypeId === GIRO ||
      paymentCollectionTypeId === TRANSFER ? (
      <View style={{ marginBottom: 16 }}>
        <Text style={Fonts.type10}>*Sumber Bank</Text>
        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => onPress()}
          disabled={false}
        >
          {dataBank ? (
            <Text style={[Fonts.type17]}>{dataBank.displayName}</Text>
          ) : (
            <Text style={[Fonts.type31]}>Pilih Sumber Bank</Text>
          )}

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

  /** RENDER BANK TO */
  const renderBankTo = () => {
    return paymentCollectionTypeId === TRANSFER ? (
      <View style={{ marginBottom: 16 }}>
        <Text style={Fonts.type10}>*Tujuan Bank</Text>
        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => onOpenBankTo()}
          disabled={false}
        >
          {dataBankTo ? (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[Fonts.type10]}>
                  {dataBankTo.bank.displayName}
                </Text>
                <Text style={[Fonts.type17]}> - {dataBankTo.accountNo}</Text>
              </View>
              <Text style={[Fonts.type17]}>{dataBankTo.description}</Text>
            </View>
          ) : (
            <Text style={[Fonts.type31]}>Pilih Tujuan Bank</Text>
          )}

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
        {renderReturnedGoodsBalance()}
        {renderDataInput()}
      </View>
    );
  };

  /** RENDER BUTTON */
  const renderButton = () => {
    return (
      <>
        <ButtonSingle
          onPress={() => editCollection()}
          title={'Simpan'}
          borderRadius={4}
          disabled={isSaveDisabled || loadingSfaPatchCollectionMethod}
          loading={loadingSfaPatchCollectionMethod}
        />
      </>
    );
  };

  /** RENDER BOTTOM TAB */
  const renderBottomTab = () => {
    return (
      <View style={[GlobalStyle.shadowForBox, { borderWidth: 0.2 }]}>
        <View style={[styles.totalCollection]}>
          <Text style={[Fonts.type23, { flex: 1 }]}>Total Penagihan</Text>
          <Text style={[Fonts.type116p, { flex: 1, textAlign: 'right' }]}>
            {MoneyFormatSpace(totalAmount)}
          </Text>
        </View>
        {renderButton()}
      </View>
    );
  };

  /** RENDER TRANSFER DATE */
  const renderTransferDate = () => {
    return paymentCollectionTypeId === TRANSFER ? (
      <View style={{ marginBottom: 8 }}>
        <Text style={Fonts.type10}>*Tanggal Transfer</Text>
        <TouchableOpacity
          style={styles.boxMenu}
          onPress={() => openTransferDate()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcon
              name="date-range"
              color={masterColor.mainColor}
              size={16}
            />

            <Text style={[Fonts.type17, { marginLeft: 11 }]}>
              {transferDate
                ? moment(transferDate).format('DD/MM/YYYY')
                : 'Pilih Tanggal Transfer'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines]} />
      </View>
    ) : null;
  };

  /** RENDER INVALID DATE */
  const renderInvalidDate = () => {
    return paymentCollectionTypeId === CHECK ||
      paymentCollectionTypeId === GIRO ? (
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
              {invalidDate
                ? moment(invalidDate).format('DD/MM/YYYY')
                : 'Pilih Tanggal Jatuh Tempo'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines]} />
      </View>
    ) : null;
  };

  /** RENDER ISSUED DATE */
  const renderIssuedDate = () => {
    return paymentCollectionTypeId === CHECK ||
      paymentCollectionTypeId === GIRO ? (
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
              {issuedDate
                ? moment(issuedDate).format('DD/MM/YYYY')
                : 'Pilih Tanggal Terbit'}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyle.lines]} />
      </View>
    ) : (
      <View />
    );
  };

  /** RENDER MATERAI */
  const renderMaterai = () => {
    return paymentCollectionTypeId === CHECK ||
      paymentCollectionTypeId === GIRO ? (
      <View style={{ marginTop: 16 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[Fonts.type10]}>Materai</Text>
          {renderStampTooltip()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 16
          }}
        >
          <TouchableOpacity
            onPress={() => setIsStampChecked(!isStampChecked)}
            style={{ flex: 1 }}
          >
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
              onPress={() => setIsModalStampOpen(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              disabled={!isStampChecked}
            >
              {dataStamp?.nominal ? (
                <Text style={[Fonts.type17]}>
                  {MoneyFormatSpace(dataStamp?.nominal)}
                </Text>
              ) : (
                <Text style={[Fonts.type31]}>Pilih Nilai Materai</Text>
              )}

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

  /** RENDER RETURNED GOOD BALANCE */
  const renderReturnedGoodsBalance = () => {
    return paymentCollectionTypeId === RETUR ? (
      <View style={{ marginBottom: 16 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={[Fonts.type10, styles.titleInput]}>
            Saldo Barang Retur{' '}
          </Text>
          <ToolTip
            iconName={'info'}
            iconSize={15}
            iconColor={Color.fontBlue50}
            popover={
              <Text style={Fonts.type87}>
                Saldo barang retur disini berasal dari saldo barang retur yang
                sudah diapprove di dalam system
              </Text>
            }
          />
        </View>
        <Text style={[Fonts.type17, { marginBottom: 16 }]}>
          {MoneyFormatSpace(returnBalance)}
        </Text>
      </View>
    ) : null;
  };

  /** RENDER IMAGE - FOTO PENAGIHAN */
  const renderImage = () => {
    return paymentCollectionTypeId !== RETUR ? (
      <View style={{ marginTop: 16 }}>
        <SfaImageInput
          title={'*Foto Penagihan'}
          action={onChooseImage}
          delete={onDeleteImage}
          loading={loadingSfaGetCollectionImage}
          imageData={imageData}
        />
      </View>
    ) : null;
  };

  /** RENDER IMAGE - SURAT KERJASAMA PROMOSI */
  const renderImageSKP = () => {
    return paymentCollectionTypeId === PROMO ? (
      <View style={{ marginTop: 16 }}>
        <SfaImageInput
          title={'*Surat Kerjasama Promosi'}
          action={onChooseImageSKP}
          delete={onDeleteImageSKP}
          loading={loadingSfaGetCollectionImage}
          imageData={imageDataSKP}
          tooltipActive={false}
          tooltipText={''}
        />
      </View>
    ) : null;
  };

  /** === RENDER TOOLTIP === */
  const renderStampTooltip = () => {
    return (
      <Tooltip
        backgroundColor={masterColor.fontBlack50OP80}
        height={75}
        withOverlay={false}
        withPointer={false}
        onOpen={() => setQuestionMarkShow(false)}
        onClose={() => setQuestionMarkShow(true)}
        containerStyle={{
          padding: 8,
          width: 0.6 * width
        }}
        popover={
          <Text style={Fonts.type87}>
            {'\u25CF'} Masukan nilai materai apabila disediakan oleh Toko {'\n'}
            {'\n'}
            {'\u25CF'} Nilai Materai yang dipilih akan menambah nilai penagihan
          </Text>
        }
      >
        {questionMarkShow ? (
          <MaterialIcon name="help" size={13} color={masterColor.mainColor} />
        ) : (
          <View />
        )}
      </Tooltip>
    );
  };

  /**
   * *********************************
   * RENDER MODAL
   * *********************************
   */

  /** RENDER MODAL TRANSFER DATE */
  const renderModalTransferDate = () => {
    return (
      <ModalBottomType4
        typeClose={'cancel'}
        open={isModalTransferDateOpen}
        title={'Tanggal Transfer'}
        close={() => setIsModalTransferDateOpen(false)}
        content={
          <View>
            <DatePickerSpinnerWithMinMaxDate
              onSelect={date => onSelectTransferDate(date)}
              close={() => setIsModalTransferDateOpen(false)}
              maxDate={new Date()}
            />
          </View>
        }
      />
    );
  };

  /** RENDER MODAL ISSUED DATE */
  const renderModalIssuedDate = () => {
    return (
      <ModalBottomType4
        typeClose={'cancel'}
        open={isModalIssuedDateOpen}
        title={'Tanggal Jatuh Tempo'}
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

  /** MODAL BANK ACCOUNT */
  const renderModalBank = () => {
    let fnSelectCollection = onSelectBank.bind(this);
    let title = 'Sumber Bank';
    if (modalBankOpenType === MODAL_TYPE_TO) {
      fnSelectCollection = onSelectBankTo.bind(this);
      title = 'Tujuan Bank';
    }

    return (
      <View>
        {isModalBankOpen ? (
          <ModalBankAccount
            title={title}
            open={isModalBankOpen}
            close={() => setIsModalBankOpen(false)}
            // eslint-disable-next-line no-undef
            onRef={ref => (selectCollection = ref)}
            selectCollection={fnSelectCollection}
            supplierId={parseInt(userSuppliers[0].supplierId, 10)}
            storeId={parseInt(selectedMerchant.storeId, 10)}
            paymentCollectionTypeId={paymentCollectionTypeId}
          />
        ) : null}
      </View>
    );
  };

  /** MODAL BANK DESTINATION */
  const renderModalBankDestination = () => {
    return (
      <View>
        {isModalBankDestinationOpen ? (
          <ModalBankDestination
            open={isModalBankDestinationOpen}
            close={() => setIsModalBankDestinationOpen(false)}
            // eslint-disable-next-line no-undef
            onRef={ref => (selectBankDestination = ref)}
            selectBankDestination={onSelectBankTo.bind(this)}
            supplierId={parseInt(userSuppliers[0].supplierId, 10)}
            storeId={parseInt(selectedMerchant.storeId, 10)}
            paymentCollectionTypeId={paymentCollectionTypeId}
          />
        ) : null}
      </View>
    );
  };

  /** MODAL STAMP */
  const renderModalListMaterai = () => {
    return (
      <View>
        {isModalStampOpen ? (
          <ModalListMaterai
            open={isModalStampOpen}
            close={() => setIsModalStampOpen(false)}
            // eslint-disable-next-line no-undef
            onRef={ref => (selectedStamp = ref)}
            selectStamp={onSelectStamp.bind(this)}
            supplierId={parseInt(userSuppliers[0].supplierId, 10)}
            storeId={parseInt(selectedMerchant.storeId, 10)}
            paymentCollectionTypeId={paymentCollectionTypeId}
          />
        ) : null}
      </View>
    );
  };

  /** RENDER MODAL ERROR */
  const renderModalError = () => {
    return (
      <View>
        {isModalBottomErrorOpen ? (
          <ErrorBottomFailPayment
            open={isModalBottomErrorOpen}
            onPress={() => setIsModalBottomErrorOpen(false)}
            text={messageError}
            errorTitle={titleError}
            buttonTitle={buttonTitle}
          />
        ) : (
          <View />
        )}
      </View>
    );
  };
  /**
   * *********************************
   * RENDER MAIN
   * *********************************
   */
  return (
    <>
      {!loadingSfaGetCollectionDetail && dataSfaGetCollectionDetail ? (
        <>
          <StatusBarWhite />
          <ScrollView>{renderContent()}</ScrollView>

          {renderBottomTab()}
          {renderModalTransferDate()}
          {renderModalIssuedDate()}
          {renderModalInvalidDate()}
          {renderModalBank()}
          {renderModalListMaterai()}
          {renderModalError()}
          {renderModalBankDestination()}
        </>
      ) : (
        <View style={{ flex: 1 }}>
          <LoadingPage />
        </View>
      )}
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

export default SfaCollectionEditView;
