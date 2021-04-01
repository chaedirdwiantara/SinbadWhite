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
  StatusBarWhite,
  ButtonSingle
} from '../../library/component';
import { TextInputMask } from 'react-native-masked-text';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import * as ActionCreators from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import ModalCollectionMethod from './ModalCollectionMethod';
import SfaAddTagihanCheque from './SfaAddTagihanCheque';
import SfaAddTagihanTransfer from './SfaAddTagihanTransfer';
import SfaAddTagihanPromo from './SfaAddTagihanPromo';
import SfaAddTagihanGiro from './SfaAddTagihanGiro';
import ErrorBottomFailPayment from '../../components/error/ModalBottomFailPayment';

import {
  sfaPostPaymentMethodProcess,
  sfaPostCollectionPaymentProcess,
  sfaGetDetailProcess
} from '../../state/actions';
import NavigationService from '../../navigation/NavigationService';

const SfaAddTagihanView = props => {
  const dispatch = useDispatch();
  const [collectionMethod, setCollectionMethod] = useState(null);
  const [openCollectionMethod, setOpenCollectionMethod] = useState(false);
  const [methodStatus, setMethodStatus] = useState('available');
  const [disabled, setDisabled] = useState(true);
  const {
    dataSfaPostPaymentMethod,
    dataSfaPostCollectionPayment,
    errorSfaPostPaymentMethod,
    errorSfaPostCollectionPayment,
    loadingSfaPostPaymentMethod,
    loadingSfaPostCollectionPayment
  } = useSelector(state => state.sfa);

  //DATA PAYMENT CASH
  const [cash, setCash] = useState(0);

  //DATA PAYMENT TRANSFER
  const [referenceCode, setReferenceCode] = useState(null);
  const [bankSource, setBankSource] = useState(null);
  const [bankAccount, setBankAccount] = useState(null);
  const [transferDate, setTransferDate] = useState(null);
  const [transferValue, setTransferValue] = useState(0);
  const [billingValue, setBillingValue] = useState(0);
  const [transferImage, setTransferImage] = useState(null);
  const [issuedDate, setIssuedDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(
    new Date(new Date(new Date()).setDate(new Date().getDate() + 1))
  );
  const [balance, setBalance] = useState(null);
  const [stamp, setStamp] = useState(null);
  const [isUsedStamp, setIsUsedStamp] = useState(false)
  const [isUseNoReference, setIsUseNoReference] = useState(false)
  const [paymentCollectionId, setPaymentCollectionMethodId]= useState()

  //SELECTOR
  const { selectedMerchant } = useSelector(state => state.merchant);
  const { userSuppliers, id } = useSelector(state => state.user);

  //DATA PAYMENT PROMO
  const [promoReferenceCode, setPromoReferenceCode] = useState(null);
  const [promoNumber, setPromoNumber] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [promoValue, setPromoValue] = useState(null);
  const [billingPromoValue, setBillingPromoValue] = useState(null);
  const [promoImage, setPromoImage] = useState(null);

  //USEREF
  const prevDataSfaPostPaymentMethodRef = useRef(dataSfaPostPaymentMethod);
  const prevDataSfaPostCollectionPaymentRef = useRef(
    dataSfaPostCollectionPayment
  );

  //USEREF ERROR
  const prevErrorSfaPostPaymentMethodRef = useRef(errorSfaPostPaymentMethod);
  const prevErrorSfaPostCollectionPaymentRef = useRef(
    errorSfaPostCollectionPayment
  );

  //MODAL
  const [modalBottomError, setModalBottomError] = useState(false);
  const [messageError, setMessageError] = useState(null);

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */

  //USE EFFECT PREV DATA
  useEffect(() => {
    prevDataSfaPostPaymentMethodRef.current = dataSfaPostPaymentMethod;
  }, []);
  const prevDataSfaPostPaymentMethod = prevDataSfaPostPaymentMethodRef.current;

  useEffect(() => {
    prevDataSfaPostCollectionPaymentRef.current = dataSfaPostCollectionPayment;
  }, []);
  const prevDataSfaPostCollectionPayment =
    prevDataSfaPostCollectionPaymentRef.current;

  //USE EFFECT PREV DATA ERROR
  useEffect(() => {
    prevErrorSfaPostPaymentMethodRef.current = errorSfaPostPaymentMethod;
  }, []);
  const prevErrorSfaPostPaymentMethod =
    prevErrorSfaPostPaymentMethodRef.current;

  useEffect(() => {
    prevErrorSfaPostCollectionPaymentRef.current = errorSfaPostCollectionPayment;
  }, []);
  const prevErrorSfaPostCollectionPayment =
    prevErrorSfaPostCollectionPaymentRef.current;

  const setIntialState = () => {
    setReferenceCode(null);
    setBankSource(null);
    setBankAccount(null);
    setTransferDate(null);
    setTransferValue(0);
    setBillingValue(0);
    setTransferImage(null);
    setBalance(null);
    setStamp(null);
    setIsUsedStamp(false);
    setIsUseNoReference(false);
  };

  const selectedCollectionMethod = data => {
    setIntialState();
    setCollectionMethod(data);
    setOpenCollectionMethod(false);
  };

  const selectBilling = () => {
    if (collectionMethod !== null) {
      if (collectionMethod.code === 'cash') {
        return renderBillingCash();
      }
      if (collectionMethod.code === 'check') {
        return renderBillingCheque(collectionMethod.id);
      }
      if (collectionMethod.code === 'transfer') {
        return renderBillingTransfer();
      }
      if (collectionMethod.code === 'promo') {
        return renderBillingPromo();
      }
      if (collectionMethod.code === 'giro') {
        return renderBillingGiro(collectionMethod.id);
      }
    }
  };

  const textBillingCash = text => {
    if (
      parseInt(text.replace(/[Rp.]+/g, '')) >
      parseInt(props.navigation.state.params.data.remainingBilling)
    ) {
      setCash(parseInt(props.navigation.state.params.data.remainingBilling));
    } else {
      setCash(parseInt(text.replace(/[Rp.]+/g, '')));
    }
  };
  console.log("log:", collectionMethod);
  const saveCollection = async () => {
    const orderParcelId = props.navigation.state.params.data.id;
    const userId = parseInt(id)
    const supplierId = parseInt(userSuppliers[0].supplier.id)
    const storeId = parseInt(selectedMerchant.storeId)
    const paymentCollectionMethodId = parseInt(paymentCollectionId)
    if (collectionMethod.code === 'cash') {
      const data = {
        supplierId: supplierId,
        userSellerId: userId,
        orderParcelId :orderParcelId,
        storeId: storeId,
        paymentCollectionMethodId: null,
        amount : cash
      }
      dispatch(sfaPostCollectionPaymentProcess(data))
    }
    if (collectionMethod.code === 'transfer') {
      if (isUseNoReference === true) {
        const dataPostPayment = {
          supplierId: supplierId,
          userSellerId: userId,
          orderParcelId: orderParcelId,
          storeId: storeId,
          paymentCollectionMethodId: paymentCollectionMethodId,
          amount: billingValue
        };
        dispatch(sfaPostCollectionPaymentProcess(dataPostPayment));
      } else {
        const dataTransfer = {
          paymentCollectionTypeId: parseInt(collectionMethod.id),
          storeId: storeId,
          supplierId: supplierId,
          userId: userId,
          referenceCode: referenceCode,
          balance: transferValue,
          issuedDate: moment(new Date(transferDate)).format(
            'YYYY-MM-DD HH:mm:ss'
          ),
          bankId: bankSource.id,
          bankToAccountId: bankAccount.id,
          filename: transferImage.fileName,
          type: transferImage.fileType,
          image: transferImage.fileData
        };
        dispatch(sfaPostPaymentMethodProcess(dataTransfer));
      }
    }
    if (collectionMethod.code === 'promo') {
      if (isUseNoReference === true) {
        const dataPostPayment = {
          supplierId: supplierId,
          userSellerId: userId,
          orderParcelId: orderParcelId,
          storeId: storeId,
          paymentCollectionMethodId: paymentCollectionMethodId,
          amount: billingPromoValue
        }
        dispatch(sfaPostCollectionPaymentProcess(dataPostPayment))
      } else {
        const dataPromo = {
          paymentCollectionTypeId: parseInt(collectionMethod.id),
          storeId: storeId,
          supplierId: supplierId,
          userId: userId,

          referenceCode: promoReferenceCode,
          balance: promoValue,
          promoCode: promoNumber,
          principalId: principal.id,
          filename: promoImage.fileName,
          type: promoImage.fileType,
          image: promoImage.fileData,
        }
        dispatch(sfaPostPaymentMethodProcess(dataPromo));
      }
    }
    if (collectionMethod.code === 'check' || collectionMethod.code === 'giro') {
      const data = {
        paymentCollectionTypeId: parseInt(collectionMethod.id),
        storeId: storeId,
        supplierId: supplierId,
        userId: userId,
        referenceCode: referenceCode,
        bankId: bankSource,
        issuedDate: moment
          .utc(issuedDate)
          .local()
          .format('YYYY-MM-DD HH:MM:ss'),
        invalidDate: moment
          .utc(dueDate)
          .local()
          .format('YYYY-MM-DD HH:MM:ss'),
        balance: balance,
        isUsedStamp: isUsedStamp,
        stampId: stamp
      };
      if (isUseNoReference === true) {
        const dataPostPayment = {
          supplierId: supplierId,
          userSellerId: userId,
          orderParcelId: orderParcelId,
          storeId: storeId,
          paymentCollectionMethodId: paymentCollectionMethodId,
          amount: billingValue
        };
        dispatch(sfaPostCollectionPaymentProcess(dataPostPayment));
      } else {
        dispatch(sfaPostPaymentMethodProcess(data));
      }
    }
  };

  useEffect(() => {
    const orderParcelId = props.navigation.state.params.data.id;
    const userId = id
    if (prevDataSfaPostPaymentMethod !== dataSfaPostPaymentMethod) {
      if (dataSfaPostPaymentMethod) {
        const dataPostPayment = {
          supplierId: parseInt(userSuppliers[0].supplier.id),
          userSellerId: parseInt(userId),
          orderParcelId: orderParcelId,
          storeId: parseInt(selectedMerchant.storeId),
          paymentCollectionMethodId: parseInt(dataSfaPostPaymentMethod.data.id),
          amount: collectionMethod.code === 'cash' 
          ? cash 
          : collectionMethod.code === 'transfer' || collectionMethod.code === 'check' || collectionMethod.code === 'giro'
          ? billingValue 
          : collectionMethod.code === "promo"
          ? billingPromoValue
          : cash
        }
        dispatch(sfaPostCollectionPaymentProcess(dataPostPayment))
      }
    }
  }, [dataSfaPostPaymentMethod]);

  useEffect(() => {
    const orderParcelId = props.navigation.state.params.data.id;
    if (prevDataSfaPostCollectionPayment !== dataSfaPostCollectionPayment) {
      if (dataSfaPostCollectionPayment) {
        dispatch(sfaGetDetailProcess(orderParcelId));
        NavigationService.navigate('SfaDetailView', {
          orderParcelId: orderParcelId
        });
      }
    }
  }, [dataSfaPostCollectionPayment]);

  //HANDLE ERROR POST PAYMENT
  useEffect(() => {
    if (prevErrorSfaPostPaymentMethod !== errorSfaPostPaymentMethod) {
      if (errorSfaPostPaymentMethod) {
        setModalBottomError(true);
        setMessageError(errorSfaPostPaymentMethod.data.errorMessage);
      }
    }
  }, [errorSfaPostPaymentMethod]);

  //HANDLE ERROR POST COLLECTION
  useEffect(() => {
    if (prevErrorSfaPostCollectionPayment !== errorSfaPostCollectionPayment) {
      if (errorSfaPostCollectionPayment) {
        setModalBottomError(true);
        setMessageError(
          errorSfaPostCollectionPayment.payload.data.errorMessage
        );
      }
    }
  }, [errorSfaPostCollectionPayment]);

  useEffect(() => {
    if (loadingSfaPostCollectionPayment || loadingSfaPostPaymentMethod) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [loadingSfaPostCollectionPayment, loadingSfaPostPaymentMethod]);

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

  const dataIssuedDate = data => {
    setIssuedDate(data);
  };

  const dataDueDate = data => {
    setDueDate(data);
  };

  const dataBalance = data => {
    setBalance(data);
  };

  const dataStamp = data => {
    setStamp(data);
  };
  const statusStamp = data => {
    setIsUsedStamp(data);
  };

  const useNoReference = data => {
    setIsUseNoReference(data);
    console.log("disni:", data);
  };

  const noPaymentCollectionMethodId = data => {
    console.log("dataaa2:", data);
    setPaymentCollectionMethodId(data);
  };

  //DATA PROMO
  const dataPromoReferenceCode = data => {
    setPromoReferenceCode(data);
  };
  const dataPromoNumber = data => {
    setPromoNumber(data);
  };
  const dataPrincipal = data => {
    setPrincipal(data);
  };
  const dataPromoValue = data => {
    setPromoValue(data);
  };
  const dataBillingPromoValue = data => {
    setBillingPromoValue(data);
  };
  const dataPromoImage = data => {
    setPromoImage(data);
  };

  useEffect(() => {
    if (collectionMethod !== null) {
      if (collectionMethod.code === 'cash') {
        if (cash === 0 || cash === '') {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      }
      if (collectionMethod.code === 'transfer') {
        if (
          referenceCode === null ||
          bankSource === null ||
          bankAccount === null ||
          transferDate === null ||
          transferValue === 0 ||
          billingValue === 0 ||
          transferImage === null
        ) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      }
      if (
        collectionMethod.code === 'check' ||
        collectionMethod.code === 'giro'
      ) {
        if (isUsedStamp === true) {
          if (stamp !== null) {
            if (
              referenceCode === null ||
              bankSource === null ||
              issuedDate === null ||
              dueDate === null ||
              balance === null ||
              billingValue === 0
            ) {
              setDisabled(true);
            } else {
              setDisabled(false);
            }
          } else {
            setDisabled(true);
          }
        } else if (isUsedStamp === false) {
          if (
            referenceCode === null ||
            bankSource === null ||
            issuedDate === null ||
            dueDate === null ||
            balance === null ||
            billingValue === 0
          ) {
            setDisabled(true);
          } else {
            setDisabled(false);
          }
        }
      }
      if (collectionMethod.code === 'promo') {
        if (
          promoReferenceCode === null ||
          promoValue === null ||
          promoNumber === null ||
          principal === null ||
          promoImage === null ||
          billingPromoValue === null
        ) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
      }
    } else {
      setDisabled(true);
    }
  }, [
    collectionMethod,
    cash,
    referenceCode,
    bankSource,
    bankAccount,
    transferDate,
    transferValue,
    billingValue,
    transferImage,
    bankSource,
    issuedDate,
    dueDate,
    balance,
    stamp,
    isUsedStamp,
    promoReferenceCode,
    promoValue,
    promoNumber,
    principal,
    promoImage,
    billingPromoValue,
  ]);

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
          <Text style={Fonts.type17}>
            {props.navigation.state.params.data.invoiceGroupName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>No. Pesanan</Text>
          <Text style={Fonts.type17}>
            {props.navigation.state.params.data.orderCode}
          </Text>
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
            {props.navigation.state.params.data.orderRef === null
              ? '-'
              : props.navigation.state.params.data.orderRef}
          </Text>
        </View>
      </View>
    );
  };

  const renderCollectionInfo = () => {
    return (
      <View style={styles.container}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Informasi Tagihan</Text>
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              justifyContent: 'space-between'
            }}
          >
            <Text style={Fonts.type17}>Sisa Tagihan</Text>
            <Text style={Fonts.type22}>
              {MoneyFormat(props.navigation.state.params.data.remainingBilling)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCollectionDetail = () => {
    return (
      <View style={[styles.container, { marginBottom: 16 }]}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Detail Penagihan</Text>
          </View>
          <View
            style={[
              GlobalStyle.lines,
              { flex: 1, marginTop: 8, marginBottom: 16 }
            ]}
          />
          <View>
            <Text style={Fonts.type10}>Metode Penagihan</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.boxMenu}
              onPress={() => setOpenCollectionMethod(true)}
            >
              <Text
                style={[
                  Fonts.type17,
                  { opacity: collectionMethod === null ? 0.5 : null }
                ]}
              >
                {collectionMethod === null
                  ? 'Pilih Metode Penagihan'
                  : collectionMethod.name}
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
          {selectBilling()}
        </View>
      </View>
    );
  };

  const renderBillingCash = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <View>
          <Text style={Fonts.type10}>*Jumlah Penagihan</Text>
        </View>
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
            value={cash}
            onChangeText={text => textBillingCash(text)}
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
    );
  };

  /** RENDER CHEQUE PAYMENT */
  const renderBillingCheque = id => {
    return (
      <SfaAddTagihanCheque
        collectionMethod={collectionMethod}
        status={methodStatus}
        paymentCollectionTypeId={id}
        referenceCode={dataReferenceCode}
        bankSource={dataBankSource}
        issuedDate={dataIssuedDate}
        dueDate={dataDueDate}
        balance={dataBalance}
        billingValue={dataBillingValue}
        stamp={dataStamp}
        remainingBilling={props.navigation.state.params.data.remainingBilling}
        isUsedStamp={statusStamp}
        useNoReference={useNoReference}
        paymentCollectionMethodId={noPaymentCollectionMethodId}
      />
    );
  };

  /** RENDER TRANSFER PAYMENT */
  const renderBillingTransfer = () => {
    return (
      <SfaAddTagihanTransfer
        collectionMethod={collectionMethod}
        remainingBilling={props.navigation.state.params.data.remainingBilling}
        referenceCode={dataReferenceCode}
        bankSource={dataBankSource}
        bankAccount={dataBankAccount}
        transferDate={dataTransferDate}
        transferValue={dataTranserValue}
        billingValue={dataBillingValue}
        transferImage={dataTransferImage}
        useNoReference={useNoReference}
        paymentCollectionMethodId={noPaymentCollectionMethodId}
      />
    );
  };

  /** RENDER PROMO PAYMENT */
  const renderBillingPromo = () => {
    return (
      <SfaAddTagihanPromo
        collectionMethod={collectionMethod}
        remainingBilling={props.navigation.state.params.data.remainingBilling}
        referenceCode={dataPromoReferenceCode}
        promoNumber={dataPromoNumber}
        principal={dataPrincipal}
        promoValue={dataPromoValue}
        billingPromoValue={dataBillingPromoValue}
        promoImage={dataPromoImage}
        useNoReference={useNoReference}
        paymentCollectionMethodId={noPaymentCollectionMethodId}
      />
    );
  };

  /** RENDER GIRO PAYMENT */
  const renderBillingGiro = id => {
    return (
      <SfaAddTagihanGiro
        collectionMethod={collectionMethod}
        status={methodStatus}
        paymentCollectionTypeId={id}
        referenceCode={dataReferenceCode}
        bankSource={dataBankSource}
        issuedDate={dataIssuedDate}
        dueDate={dataDueDate}
        balance={dataBalance}
        billingValue={dataBillingValue}
        stamp={dataStamp}
        remainingBilling={props.navigation.state.params.data.remainingBilling}
        isUsedStamp={statusStamp}
        useNoReference={useNoReference}
        paymentCollectionMethodId={noPaymentCollectionMethodId}
      />
    );
  };
  /**
   * =======================
   * MODAL
   * =======================
   */
  const renderModalCollectionMethod = () => {
    return (
      <View>
        {openCollectionMethod ? (
          <ModalCollectionMethod
            open={openCollectionMethod}
            close={() => setOpenCollectionMethod(false)}
            onRef={ref => (selectCollection = ref)}
            selectCollection={selectedCollectionMethod.bind(this)}
          />
        ) : null}
      </View>
    );
  };

  const renderButtonSave = () => {
    return (
      <ButtonSingle
        disabled={disabled}
        loading={
          loadingSfaPostCollectionPayment || loadingSfaPostPaymentMethod
            ? true
            : false
        }
        title={'Simpan'}
        borderRadius={4}
        onPress={() => saveCollection()}
      />
    );
  };

  /** RENDER MODAL ERROR */
  const renderModalError = () => {
    return (
      <View>
        {modalBottomError ? (
          <ErrorBottomFailPayment
            open={modalBottomError}
            onPress={() => setModalBottomError(false)}
            text={messageError}
          />
        ) : (
          <View />
        )}
      </View>
    );
  };

  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderFakturInfo()}
        {renderCollectionInfo()}
        {renderCollectionDetail()}
      </View>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      {/* {props.merchant.dataGetMerchantDetail ? ( */}
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <ScrollView style={{ flex: 1 }}>{renderContent()}</ScrollView>
        {renderButtonSave()}
        {renderModalCollectionMethod()}
        {renderModalError()}
      </SafeAreaView>
      {/* ) : (
        <LoadingPage />
      )} */}
    </>
  );
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
  boxMenu: {
    // paddingHorizontal: 16,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  boxInput: {
    borderBottomWidth: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderBottomColor: masterColor.fontBlack10
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SfaAddTagihanView);
