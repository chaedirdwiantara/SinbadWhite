import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity
} from '../../library/reactPackage';
import {
  MaterialIcon,
  MaterialCommunityIcons
} from '../../library/thirdPartyPackage';
import { TextInputMask } from 'react-native-masked-text';
import { ButtonSingle, LoadingPage } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { CardBody, CardHeader } from './components/CardView';
import NavigationService from '../../navigation/NavigationService';
import {
  CASH,
  CHECK,
  GIRO,
  USED,
  USED_BY_OTHERS,
  NOT_AVAILABLE,
  NOT_USED
} from '../../constants/collectionConstants';
import {
  sfaGetBillingDetailProcess,
  sfaEditBillingProcess,
  sfaGetPaymentCollectionLogProcess
} from '../../state/actions';
import ErrorBottomFailPayment from '../../components/error/ModalBottomFailPayment';

const SfaBillingEditView = props => {
  const dispatch = useDispatch();
  // SELECTOR
  const {
    loadingSfaPostCollectionPayment,
    loadingSfaGetBillingDetail,
    errorSfaEditBilling,
    dataSfaEditBilling,
    dataSfaGetBillingDetail,
    loadingSfaEditBilling
  } = useSelector(state => state.sfa);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const collectionInfo = props.navigation.state.params;
  const [stampNominal, setStampNominal] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isStampChecked, setIsStampChecked] = useState(null);

  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [stampAmount, setStampAmount] = useState(0);
  const [collectionBalance, setCollectionBalance] = useState(0);
  const [dataBillingDetail, setDataBillingDetail] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { userSuppliers } = useSelector(state => state.user);
  //MODAL
  const [modalBottomError, setModalBottomError] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [buttonTitle, setButtonTitle] = useState(null);

  /**
   * *********************************
   * FUNCTION
   * *********************************
   */

  useEffect(() => {
    getBillingDetail();
  }, []);
  const getBillingDetail = () => {
    dispatch(sfaGetBillingDetailProcess(collectionInfo.id));
  };
  // function to make sure collection !> balance || colection !>outstanding
  useEffect(() => {
    const outstanding = dataSfaGetBillingDetail?.data.outstandingAmount;
    if (parseInt(paymentAmount, 10) > parseInt(outstanding, 10)) {
      if (outstanding < collectionBalance) {
        setPaymentAmount(parseInt(outstanding, 10));
        setTotalPaymentAmount(parseInt(outstanding, 10) + stampNominal);
      } else {
        setPaymentAmount(parseInt(collectionBalance, 10));
        setTotalPaymentAmount(parseInt(collectionBalance, 10) + stampNominal);
      }
    } else if (parseInt(paymentAmount, 10) > parseInt(collectionBalance, 10)) {
      if (outstanding < collectionBalance) {
        setPaymentAmount(parseInt(outstanding, 10));
        setTotalPaymentAmount(parseInt(outstanding, 10) + stampNominal);
      } else {
        setPaymentAmount(parseInt(collectionBalance, 10));
        setTotalPaymentAmount(parseInt(collectionBalance, 10) + stampNominal);
      }
    } else {
      setPaymentAmount(parseInt(paymentAmount, 10));
      setTotalPaymentAmount(parseInt(paymentAmount, 10) + stampNominal);
    }
  }, [paymentAmount, collectionBalance]);

  const isNumber = n => (n !== null && n !== undefined ? true : false);
  const onChangePaymentAmount = text => {
    const outstanding = dataSfaGetBillingDetail?.data.outstandingAmount;
    if (parseInt(text.replace(/[Rp.]+/g, ''), 10) > parseInt(outstanding, 10)) {
      // setIsChangeBillingValue(true);
      if (outstanding + paymentAmount < collectionBalance) {
        setPaymentAmount(parseInt(outstanding, 10));
      } else {
        setPaymentAmount(parseInt(collectionBalance, 10));
      }
    } else if (
      parseInt(text.replace(/[Rp.]+/g, ''), 10) >
      parseInt(collectionBalance, 10)
    ) {
      if (outstanding < collectionBalance) {
        setPaymentAmount(parseInt(outstanding, 10));
      } else {
        setPaymentAmount(parseInt(collectionBalance, 10));
      }
    } else {
      setPaymentAmount(parseInt(text.replace(/[Rp.]+/g, ''), 10));
    }
  };

  const onCheckStamp = () => {
    setIsStampChecked(!isStampChecked);
    if (isStampChecked === false) {
      setTotalPaymentAmount(totalPaymentAmount + stampAmount);
    } else if (isStampChecked === true) {
      setTotalPaymentAmount(totalPaymentAmount - stampAmount);
    }
  };
  /** ON SUBMIT EDIT */
  const submit = () => {
    setIsButtonDisabled(true);
    const data = {
      paymentCollectionId: parseInt(collectionInfo.id, 10),
      paymentCollectionTypeId: parseInt(
        dataSfaGetBillingDetail.data.paymentCollectionType.id,
        10
      ),
      userId: parseInt(userSuppliers[0].userId, 10),
      paymentAmount: parseInt(paymentAmount, 10),
      isUsedStamp: isStampChecked
    };
    dispatch(sfaEditBillingProcess(data));
  };
  /** USEREF SUCCES GET DETAIL BILLING */
  const prevDataSfaGetBillingDetailRef = useRef(dataSfaGetBillingDetail);
  /** USEREF SUCCESS */
  const prevDataSfaEditBillingRef = useRef(dataSfaEditBilling);
  /** USEREF ERROR */
  const prevErrorSfaEditBillingRef = useRef(errorSfaEditBilling);

  /** USE EFFECT SUCCESS GET DETAIL BILLING */
  useEffect(() => {
    prevDataSfaGetBillingDetailRef.current = dataSfaGetBillingDetail;
  }, []);
  const prevDataSfaGetBillingDetail = prevDataSfaGetBillingDetailRef.current;
  /** USE EFFECT SUCCESS EDIT BILLING */
  useEffect(() => {
    prevDataSfaEditBillingRef.current = dataSfaEditBilling;
  }, []);
  const prevDataSfaEditBilling = prevDataSfaEditBillingRef.current;

  //USE EFFECT PREV DATA ERROR
  useEffect(() => {
    prevErrorSfaEditBillingRef.current = errorSfaEditBilling;
  }, []);
  const prevErrorSfaEditBilling = prevErrorSfaEditBillingRef.current;

  //HANDLE SUCCESS GET DETAIL BILLING
  useEffect(() => {
    if (prevDataSfaGetBillingDetail !== dataSfaGetBillingDetail) {
      if (dataSfaGetBillingDetail) {
        const data = dataSfaGetBillingDetail.data;
        const {
          paymentCollectionMethod,
          paidByCollectionMethod,
          paidAmount
        } = dataSfaGetBillingDetail.data;
        setStampNominal(data.stampAmount);
        setStampAmount(
          data.stampStatus === USED || data.stampStatus === NOT_USED
            ? paymentCollectionMethod.stamp.nominal
            : 0
        );
        setCollectionBalance(paymentCollectionMethod.totalBalance + paidAmount);
        setPaymentAmount(paidByCollectionMethod);
        setDataBillingDetail(dataSfaGetBillingDetail);
        setIsStampChecked(data.stampStatus === USED ? true : false);
        setTotalPaymentAmount(data.stampAmount + paidByCollectionMethod);
      }
    }
  }, [dataSfaGetBillingDetail]);
  //HANDLE ERROR POST COLLECTION
  useEffect(() => {
    if (prevErrorSfaEditBilling !== errorSfaEditBilling) {
      if (errorSfaEditBilling) {
        setIsButtonDisabled(false);
        handleError(errorSfaEditBilling);
      }
    }
  }, [errorSfaEditBilling]);

  /** HANDLE ON SUCCESS */
  //HANDLE ERROR POST COLLECTION
  useEffect(() => {
    if (prevDataSfaEditBilling !== dataSfaEditBilling) {
      if (dataSfaEditBilling) {
        navigateOnSuccessEdit();
      }
    }
  }, [dataSfaEditBilling]);

  /** HANDLE ERROR EDIT BILLING */
  const handleError = error => {
    if (error) {
      switch (error?.data?.code) {
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
    setModalBottomError(true);
  };

  /** HANDLE ERROR GLOBAL */
  const handleErrorGlobal = () => {
    setMessageError(null);
    setTitleError(null);
    setButtonTitle(null);
    setModalBottomError(true);
  };

  /** HANDLE SUCCESS EDIT BILLING */
  const navigateOnSuccessEdit = () => {
    const {
      paymentCollectionType,
      paymentCollectionMethod
    } = dataSfaGetBillingDetail?.data;
    const data = {
      paymentCollectionMethodId:
        paymentCollectionMethod.paymentCollectionMethodId,
      limit: 20,
      storeId: parseInt(selectedMerchant.storeId, 10),
      skip: 0,
      loading: true
    };
    dispatch(sfaGetPaymentCollectionLogProcess(data));
    NavigationService.navigate('SfaBillingLogView', {
      collectionId: paymentCollectionMethod.paymentCollectionMethodId,
      paymentCollectionTypeId: paymentCollectionType.id
    });
  };

  useEffect(() => {
    if (
      paymentAmount === 0 ||
      totalPaymentAmount ===
        dataSfaGetBillingDetail?.data.paidByCollectionMethod + stampNominal
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }, [paymentAmount, isStampChecked]);

  useEffect(() => {
    if (!loadingSfaEditBilling && paymentAmount !== 0) {
      setIsButtonDisabled(false);
    }
  }, [loadingSfaEditBilling]);

  /** FUNCTION CHECK MATERAI STATUS */
  const checkMateraiStatus = status => {
    let text;
    switch (status) {
      // case NOT_USED:
      //   text = 'Pembayaran tidak menggunakan materai';
      //   break;
      case NOT_AVAILABLE:
        text = 'Penagihan tidak menggunakan materai';
        break;
      case USED_BY_OTHERS:
        text = 'Materai sudah digunakan di pembayaran lainnya';
        break;
      default:
        break;
    }

    return <Text style={[Fonts.type17]}>{text}</Text>;
  };
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  /** RENDER MODAL ERROR */
  const renderModalError = () => {
    return (
      <View>
        {modalBottomError ? (
          <ErrorBottomFailPayment
            open={modalBottomError}
            onPress={() => setModalBottomError(false)}
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
   * ======================================
   * RENDER INVOICE INFORMATION CARD HEADER
   * ======================================
   */
  const renderInvoiceInfoHeader = () => {
    return (
      <>
        {CardHeader({
          title: 'Informasi Faktur',
          styleContainer: styles.container,
          styleCard: {
            ...styles.cardTaskList,
            ...GlobalStyle.shadowForBox5
          },
          styleCardView: styles.styleCardView,
          renderCardBody: renderInvoiceInfoBody
        })}
      </>
    );
  };

  /**
   * ====================================
   * RENDER INVOICE INFORMATION CARD BODY
   * ====================================
   */
  const renderInvoiceInfoBody = () => {
    if (dataBillingDetail !== null) {
      const {
        invoiceGroupName,
        orderCode,
        orderRef,
        deliveredAmount,
        outstandingAmount
      } = dataBillingDetail?.data;

      return (
        <>
          {CardBody({
            title: 'Nama Faktur',
            value: invoiceGroupName,
            styleCardView: styles.styleCardView
          })}
          {CardBody({
            title: 'Nomor Pesanan',
            value: orderCode,
            styleCardView: styles.styleCardView
          })}
          {CardBody({
            title: 'Nomor Referensi',
            value: orderRef ? orderRef : '-',
            styleCardView: styles.styleCardView
          })}
          {CardBody({
            title: 'Total Tagihan',
            value: isNumber(deliveredAmount)
              ? MoneyFormatSpace(deliveredAmount)
              : MoneyFormatSpace(0),
            styleCardView: styles.styleCardView
          })}
          {CardBody({
            title: 'Sisa Tagihan',
            value: isNumber(outstandingAmount)
              ? MoneyFormatSpace(outstandingAmount)
              : MoneyFormatSpace(0),
            styleCardView: styles.styleCardView
          })}
        </>
      );
    }
  };

  /**
   * ====================================
   * RENDER COLLECTION INFORMATION HEADER
   * ====================================
   */
  const renderCollectionInfoHeader = () => {
    return (
      <>
        {CardHeader({
          title: 'Informasi Penagihan',
          styleContainer: styles.container,
          styleCard: {
            ...styles.cardTaskList,
            ...GlobalStyle.shadowForBox5
          },
          styleCardView: styles.styleCardView,
          renderCardBody: renderCollectionInfoBody
        })}
      </>
    );
  };
  /**
   * ==================================
   * RENDER COLLECTION INFORMATION BODY
   * ==================================
   */
  const renderCollectionInfoBody = () => {
    const {
      paymentCollectionMethod,
      paymentCollectionType
    } = dataSfaGetBillingDetail.data;
    return (
      <>
        {CardBody({
          title: 'Metode Penagihan',
          value: paymentCollectionType?.name,
          styleCardView: styles.styleCardView
        })}
        {paymentCollectionType.id !== CASH
          ? CardBody({
              title: 'Nomor Referensi',
              value: paymentCollectionMethod.collectionRef
                ? paymentCollectionMethod.collectionRef
                : '-',
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id === CHECK || paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Nilai Penagihan',
              value: MoneyFormatSpace(paymentCollectionMethod.amount),
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id === CHECK || paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Materai',
              value: paymentCollectionMethod.stamp
                ? MoneyFormatSpace(paymentCollectionMethod.stamp.nominal)
                : '-',
              styleCardView: styles.styleCardView
            })
          : null}
        {CardBody({
          title: 'Total Penagihan',
          value: MoneyFormatSpace(paymentCollectionMethod.totalAmount),
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Sisa Penagihan',
          value: MoneyFormatSpace(collectionBalance),
          styleCardView: styles.styleCardView
        })}
      </>
    );
  };

  /**
   * ===============================
   * RENDER BILLING INFO CARD HEADER
   * ===============================
   */
  const renderBillingInfoCardHeader = () => {
    return (
      <>
        {CardHeader({
          title: 'Informasi Pembayaran',
          styleContainer: styles.container,
          styleCard: {
            ...styles.cardTaskList,
            ...GlobalStyle.shadowForBox5,
            marginBottom: 16
          },
          styleCardView: styles.styleCardView,
          renderCardBody: renderBillingInfoBody
        })}
      </>
    );
  };

  /**
   * ========================
   * RENDER MATERAI
   * ========================
   */
  const renderMaterai = () => {
    const { stampStatus } = dataSfaGetBillingDetail?.data;
    return dataSfaGetBillingDetail.data.paymentCollectionType.id === CHECK ||
      dataSfaGetBillingDetail.data.paymentCollectionType.id === GIRO ? (
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
          {stampStatus === USED || stampStatus === NOT_USED
            ? renderMateraiAvailable(stampAmount)
            : checkMateraiStatus(stampStatus)}
        </View>
      </View>
    ) : null;
  };

  const renderMateraiAvailable = () => {
    const stampNominal =
      dataSfaGetBillingDetail?.data.paymentCollectionMethod.stamp.nominal;
    return (
      <>
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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
            disabled={!isStampChecked}
          >
            <Text style={[isStampChecked ? Fonts.type17 : Fonts.type31]}>
              {MoneyFormatSpace(stampNominal)}
            </Text>
          </TouchableOpacity>
          <View style={[GlobalStyle.lines, { marginTop: 8 }]} />
        </View>
      </>
    );
  };

  /**
   * ========================
   * RENDER BILLING INFO BODY
   * ========================
   */
  const renderBillingInfoBody = () => {
    return (
      <>
        <View style={{ paddingTop: 16 }}>
          <Text style={Fonts.type10}>*Jumlah Pembayaran</Text>
          <View>
            <TextInputMask
              type={'money'}
              options={{
                precision: 0,
                separator: ',',
                delimiter: '.',
                unit: 'Rp ',
                suffixUnit: ''
              }}
              value={paymentAmount}
              onChangeText={text => onChangePaymentAmount(text)}
              style={[
                Fonts.type17,
                {
                  width: '95%',
                  borderBottomColor: masterColor.fontBlack50
                }
              ]}
            />
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        {renderMaterai()}
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <View style={[GlobalStyle.lines, styles.footerLine]} />
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={Fonts.type23}>Total Pembayaran</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={Fonts.type116p}>
                {MoneyFormatSpace(totalPaymentAmount)}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  /**
   * RENDER SAVE BUTTON
   * @returns
   */
  const renderSaveButton = () => {
    return (
      <>
        <ButtonSingle
          loading={loadingSfaEditBilling}
          disabled={isButtonDisabled}
          title={'Simpan'}
          borderRadius={4}
          onPress={() => submit()}
        />
      </>
    );
  };

  /**
   * =======================
   * RENDER CONTENT
   * =======================
   * @returns
   */
  const renderContent = () => {
    return dataSfaGetBillingDetail ? (
      <View style={{ flex: 1 }}>
        {renderInvoiceInfoHeader()}
        {renderCollectionInfoHeader()}
        {renderBillingInfoCardHeader()}
      </View>
    ) : (
      <View />
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return !loadingSfaGetBillingDetail && dataSfaGetBillingDetail ? (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={{ flex: 1, height: '100%' }}>
          {renderContent()}
        </ScrollView>
        {renderFooter()}
        {renderSaveButton()}
        {renderModalError()}
      </SafeAreaView>
    </View>
  ) : (
    <LoadingPage />
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
  styleCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: masterColor.backgroundWhite
  }
});

export default SfaBillingEditView;
