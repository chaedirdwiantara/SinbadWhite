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
  TRANSFER
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';
import {
  ButtonSingle,
  InputType5,
  DatePickerSpinnerWithMinMaxDate,
  ModalBottomType4
} from '../../library/component';
import { TextInputMask } from 'react-native-masked-text';
import SfaImageInput from './components/SfaImageInput';
import ErrorBottomFailPayment from '../../components/error/ModalBottomFailPayment';
import {
  sfaPostPaymentMethodProcess,
  sfaGetReferenceListProcess,
  sfaGetCollectionImageProcess,
  sfaEditCollectionMethodProcess
} from '../../state/actions';
const { width } = Dimensions.get('window');

const MODAL_TYPE_SOURCE = 1;
const MODAL_TYPE_TO = 2;

const SfaCollectionEditView = props => {
  const dispatch = useDispatch();
  const paymentCollectionTypeId =
    props.navigation.state.params.collectionTypeId;
  const initialData = props.navigation.state.params.data;
  const [amount, setAmount] = useState(initialData.amount);
  const [totalAmount, setTotalAmount] = useState(0);
  const [noReference, setNoReference] = useState(initialData.referenceCode);
  const [transferDate, setTransferDate] = useState(initialData.issuedDate);
  const [issuedDate, setIssuedDate] = useState(initialData.issuedDate);
  const [invalidDate, setInvalidDate] = useState(initialData.invalidDate);
  const [dataBank, setDataBank] = useState({
    displayName: initialData.bankSource
  });
  const [dataBankTo, setDataBankTo] = useState({
    bank: { displayName: initialData.bankSource }
  });
  const [dataStamp, setDataStamp] = useState({
    nominal: initialData?.stampAmount
  });
  const [modalBankOpenType, setModalBankOpenType] = useState(null);
  const [isModalStampOpen, setIsModalStampOpen] = useState(false);
  const [isModalBankOpen, setIsModalBankOpen] = useState(false);
  const [isModalTransferDateOpen, setIsModalTransferDateOpen] = useState(false);
  const [isModalIssuedDateOpen, setIsModalIssuedDateOpen] = useState(false);
  const [isModalBankDestinationOpen, setIsModalBankDestinationOpen] = useState(
    false
  );
  const [isModalInvalidDateOpen, setIsModalInvalidDateOpen] = useState(false);
  const [isStampChecked, setIsStampChecked] = useState(
    initialData.stampAmount ? true : false
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [questionMarkShow, setQuestionMarkShow] = useState(true);
  const [imageName, setImageName] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isModalBottomErrorOpen, setIsModalBottomErrorOpen] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [buttonTitle, setButtonTitle] = useState(null);
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
    dataSfaGetCollectionImage
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
      }
    }
  }, [dataSfaGetCollectionImage]);

  useEffect(() => {
    totalAmountCal(amount);
  }, [amount, dataStamp]);

  useEffect(() => {
    checkInput();
  });

  useEffect(() => {
    if (isStampChecked === false) {
      setDataStamp(null);
    }
  }, [isStampChecked]);

  useEffect(() => {
    dispatch(sfaGetCollectionImageProcess(initialData.id));
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
  const navigateOnSucces = () => {
    console.log('DISINI');
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
    if (
      paymentCollectionTypeId === CASH ||
      paymentCollectionTypeId === TRANSFER
    ) {
      setTotalAmount(amount);
    }
    if (paymentCollectionTypeId === CHECK || paymentCollectionTypeId === GIRO) {
      const stamp = dataStamp?.nominal || 0;
      const total = amount + stamp;
      setTotalAmount(parseInt(total, 10));
    }
  };

  const checkInput = () => {
    if (paymentCollectionTypeId === CASH) {
      if (!amount || !imageData) {
        setIsSaveDisabled(true);
      } else {
        setIsSaveDisabled(false);
      }
    }
    if (paymentCollectionTypeId === CHECK || paymentCollectionTypeId === GIRO) {
      if (
        !amount ||
        !imageData ||
        !issuedDate ||
        !noReference ||
        !invalidDate ||
        !dataBank
      ) {
        setIsSaveDisabled(true);
      } else {
        setIsSaveDisabled(false);
      }
    }
    if (paymentCollectionTypeId === TRANSFER) {
      if (
        !noReference ||
        !dataBank ||
        !dataBankTo ||
        !transferDate ||
        !amount ||
        !imageData
      ) {
        setIsSaveDisabled(true);
      } else {
        setIsSaveDisabled(false);
      }
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
    if (paymentCollectionTypeId === CASH) {
      dispatch(sfaEditCollectionMethodProcess(data));
    }
    if (paymentCollectionTypeId === CHECK || paymentCollectionTypeId === GIRO) {
      const stampId = dataStamp ? dataStamp.id : null;
      const isUsedStamp = dataStamp ? true : false;
      const bankId = dataBank.id;
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
        bankId: bankId,
        issuedDate: dateIssued,
        invalidDate: dateInvalid,
        referenceCode: noReference
      };
      dispatch(sfaEditCollectionMethodProcess(dataCheckGiro));
    }
    if (paymentCollectionTypeId === TRANSFER) {
      const bankId = dataBank.id;
      const bankToId = dataBankTo.id;
      const trfDate = moment
        .utc(transferDate)
        .local()
        .format('YYYY-MM-DD HH:mm:ss');

      const dataTransfer = {
        ...data,
        referenceCode: noReference,
        issuedDate: trfDate,
        bankId,
        bankToAccountId: bankToId
      };
      dispatch(sfaEditCollectionMethodProcess(dataTransfer));
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
        {renderMaterai()}
        {renderImage()}
      </View>
    );
  };

  /** RENDER COLLECTION METHOD */
  const renderCollectionMethod = () => {
    const id = paymentCollectionTypeId;
    return (
      <View>
        <Text style={[Fonts.type10, styles.titleInput]}>Metode Penagihan</Text>
        <Text style={[Fonts.type17, { marginBottom: 16 }]}>
          {id === CASH
            ? 'Tunai'
            : id === CHECK
            ? 'Cek'
            : id === GIRO
            ? 'Giro'
            : 'Transfer'}
        </Text>
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
            <Text style={[Fonts.type17]}>{dataBankTo.bank.displayName}</Text>
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

  /** RENDER IMAGE */
  const renderImage = () => {
    return (
      <SfaImageInput
        title={'*Foto Penagihan'}
        action={onChooseImage}
        delete={onDeleteImage}
        loading={loadingSfaGetCollectionImage}
        imageData={imageData}
      />
    );
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
            {`\u25CF`} Masukan nilai materai apabila disediakan oleh Toko {'\n'}
            {'\n'}
            {`\u25CF`} Nilai Materai yang dipilih akan menambah nilai penagihan
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
