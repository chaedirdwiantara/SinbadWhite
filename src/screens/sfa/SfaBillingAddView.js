/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity
} from '../../library/reactPackage';
import { MaterialCommunityIcons } from '../../library/thirdPartyPackage';
import { TextInputMask } from 'react-native-masked-text';
import { ButtonSingle, ToolTip } from '../../library/component';
import {
  Fonts,
  GlobalStyle,
  MoneyFormatSpace,
  StringToNumber
} from '../../helpers';
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
  NOT_USED,
  RETUR
} from '../../constants/collectionConstants';
import {
  sfaGetDetailProcess,
  sfaPostCollectionPaymentProcess
} from '../../state/actions';
import ErrorBottomFailPayment from '../../components/error/ModalBottomFailPayment';
import { Color } from '../../config';

const SfaBillingAddView = props => {
  const dispatch = useDispatch();
  const collectionInfo = props.navigation.state.params;
  const [billingAmount, setBillingAmount] = useState(0);
  const [isStampChecked, setIsStampChecked] = useState(false);
  const [totalBillingAmount, setTotalBillingAmount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isTotalCollection, setTotalCollection] = useState(true);
  const [isCollectionLeft, setCollectionLeft] = useState(false);

  // SELECTOR
  const {
    loadingSfaPostCollectionPayment,
    dataSfaPostCollectionPayment,
    errorSfaPostCollectionPayment,
    dataSfaGetDetail,
    selectedCollectionTransaction
  } = useSelector(state => state.sfa);
  const { userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);

  //USEREF ERROR
  const prevErrorSfaPostCollectionPaymentRef = useRef(
    errorSfaPostCollectionPayment
  );

  //USEREF POST BILLING
  const prevdataSfaPostCollectionPaymentRef = useRef(
    dataSfaPostCollectionPayment
  );

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
  const isNumber = n => (n !== null && n !== undefined ? true : false);

  const onChangePaymentAmount = text => {
    const { totalBalance, stampAmount } = collectionInfo;
    const { remainingBilling } = dataSfaGetDetail?.data;

    let billAmount = StringToNumber(text);
    let totalBillAmount = 0;

    if (billAmount > remainingBilling) {
      if (remainingBilling < totalBalance) {
        billAmount = remainingBilling;
      } else {
        billAmount = totalBalance;
      }
    } else if (billAmount > totalBalance) {
      if (remainingBilling < totalBalance) {
        billAmount = remainingBilling;
      } else {
        billAmount = totalBalance;
      }
    }

    // validation paymentCollectionTypeId GIRO or CHECK
    if (
      (collectionInfo.paymentCollectionTypeId === GIRO ||
        collectionInfo.paymentCollectionTypeId === CHECK) &&
      collectionInfo.isStampUsed === true &&
      isStampChecked === true
    ) {
      // validation use stamp or not
      if (isStampChecked) {
        const totalBillAmountWithStamp = billAmount + stampAmount;

        // validation billAmount > Remaining Billing, validation billAmount > Total Balance
        if (totalBillAmountWithStamp > remainingBilling) {
          billAmount = remainingBilling - stampAmount;
          totalBillAmount = remainingBilling;
        } else if (totalBillAmountWithStamp > totalBalance) {
          billAmount = totalBalance - stampAmount;
          totalBillAmount = totalBalance;
        } else {
          totalBillAmount = totalBillAmountWithStamp;
        }
      } else {
        totalBillAmount = billAmount + collectionInfo.stampAmount;
      }
    } else {
      totalBillAmount = billAmount;
    }

    setBillingAmount(billAmount);
    setTotalBillingAmount(totalBillAmount);
  };

  const onCheckStamp = () => {
    setIsStampChecked(!isStampChecked);

    const { remainingBilling } = dataSfaGetDetail?.data;
    const { stampAmount, totalBalance } = collectionInfo;
    const totalBillAmountWithStamp = billingAmount + stampAmount;
    const substraction = totalBillAmountWithStamp - remainingBilling;

    let totalBillAmount = 0;
    if (isStampChecked === false) {
      if (totalBillAmountWithStamp > remainingBilling) {
        totalBillAmount = billingAmount;
        setBillingAmount(billingAmount - substraction);
      } else if (totalBillAmountWithStamp > totalBalance) {
        totalBillAmount = billingAmount;
        setBillingAmount(totalBalance - stampAmount);
      } else {
        totalBillAmount = totalBillAmountWithStamp;
      }
    } else if (isStampChecked === true) {
      totalBillAmount = billingAmount;
    }

    setTotalBillingAmount(totalBillAmount);
  };

  const submit = () => {
    setIsButtonDisabled(true);
    const ctdId = selectedCollectionTransaction.collectionTransactionId;
    const data = {
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      userId: parseInt(userSuppliers[0].userId, 10),
      orderParcelId: dataSfaGetDetail.data.id,
      storeId: parseInt(selectedMerchant.storeId, 10),
      paymentCollectionMethodId: collectionInfo.id,
      amount: billingAmount,
      isUsedStamp: isStampChecked,
      collectionTransactionDetailId: parseInt(ctdId, 10)
    };
    dispatch(sfaPostCollectionPaymentProcess(data));
  };

  //USE EFFECT PREV DATA ERROR
  useEffect(() => {
    prevErrorSfaPostCollectionPaymentRef.current = errorSfaPostCollectionPayment;
  }, []);
  const prevErrorSfaPostCollectionPayment =
    prevErrorSfaPostCollectionPaymentRef.current;
  useEffect(() => {
    prevdataSfaPostCollectionPaymentRef.current = dataSfaPostCollectionPayment;
  }, []);
  const prevdataSfaPostCollectionPayment =
    prevdataSfaPostCollectionPaymentRef.current;

  //HANDLE ERROR POST COLLECTION
  useEffect(() => {
    if (prevErrorSfaPostCollectionPayment !== errorSfaPostCollectionPayment) {
      if (errorSfaPostCollectionPayment) {
        handleError(errorSfaPostCollectionPayment);
      }
    }
  }, [errorSfaPostCollectionPayment]);

  useEffect(() => {
    if (prevdataSfaPostCollectionPayment !== dataSfaPostCollectionPayment) {
      if (dataSfaPostCollectionPayment) {
        dispatch(sfaGetDetailProcess(dataSfaGetDetail.data.id));
        NavigationService.navigate('SfaDetailView', {
          orderParcelId: dataSfaGetDetail.data.id
        });
      }
    }
  }, [dataSfaPostCollectionPayment]);

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

  const handleErrorSpecific = (error, title, buttonText) => {
    setMessageError(error.data.errorMessage);
    setTitleError(title);
    setButtonTitle(buttonText);
    setModalBottomError(true);
  };

  const handleErrorGlobal = () => {
    setMessageError(null);
    setTitleError(null);
    setButtonTitle(null);
    setModalBottomError(true);
  };

  useEffect(() => {
    if (!isNaN(billingAmount) && billingAmount > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [billingAmount]);

  /** FUNCTION CHECK MATERAI STATUS */
  const checkMateraiStatus = status => {
    let text;
    switch (status) {
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
    return (
      <>
        {CardBody({
          title: 'Nama Faktur',
          value: dataSfaGetDetail?.data?.invoiceGroupName,
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Nomor Pesanan',
          value: dataSfaGetDetail?.data?.orderCode,
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Nomor Referensi',
          value: dataSfaGetDetail?.data?.orderRef || '-',
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Total Tagihan',
          value: isNumber(dataSfaGetDetail?.data?.totalBilling)
            ? MoneyFormatSpace(dataSfaGetDetail.data.totalBilling)
            : MoneyFormatSpace(0),
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Sisa Tagihan',
          value: isNumber(dataSfaGetDetail?.data?.remainingBilling)
            ? MoneyFormatSpace(dataSfaGetDetail.data.remainingBilling)
            : MoneyFormatSpace(0),
          styleCardView: styles.styleCardView
        })}
      </>
    );
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
    return (
      <>
        {CardBody({
          title: 'Metode Penagihan',
          value: collectionInfo?.collectionMethodName,
          styleCardView: styles.styleCardView
        })}
        {collectionInfo.paymentCollectionTypeId !== CASH &&
        collectionInfo.paymentCollectionTypeId !== RETUR
          ? CardBody({
              title: 'Nomor Referensi',
              value: collectionInfo?.collectionCode || '-',
              styleCardView: styles.styleCardView
            })
          : null}
        {collectionInfo.paymentCollectionTypeId === CHECK ||
        collectionInfo.paymentCollectionTypeId === GIRO
          ? CardBody({
              title: 'Nilai Penagihan',
              value: MoneyFormatSpace(collectionInfo.amount),
              styleCardView: styles.styleCardView
            })
          : null}
        {collectionInfo.paymentCollectionTypeId === CHECK ||
        collectionInfo.paymentCollectionTypeId === GIRO
          ? CardBody({
              title: 'Materai',
              value: isNumber(collectionInfo?.stampAmount)
                ? MoneyFormatSpace(collectionInfo.stampAmount)
                : '-',
              styleCardView: styles.styleCardView
            })
          : null}
        {collectionInfo.paymentCollectionTypeId !== RETUR ? (
          <>
            {CardBody({
              title: 'Total Penagihan',
              value: MoneyFormatSpace(collectionInfo?.totalAmount),
              styleCardView: styles.styleCardView
            })}
            {CardBody({
              title: 'Sisa Penagihan',
              value: MoneyFormatSpace(collectionInfo?.totalBalance),
              styleCardView: styles.styleCardView
            })}
          </>
        ) : (
          <>
            {renderReturnInfo({
              title: 'Total Penagihan',
              value: MoneyFormatSpace(collectionInfo?.totalAmount),
              toolTipText: 'Total saldo di metode penagihan barang retur'
            })}
            {renderReturnInfo({
              title: 'Sisa Penagihan',
              value: MoneyFormatSpace(collectionInfo?.totalBalance),
              toolTipText:
                'Sisa saldo di metode penagihan barang retur karena sudah terpakai untuk tagihan lainnya'
            })}
          </>
        )}
      </>
    );
  };

  const renderReturnInfo = data => {
    return (
      <View style={{ marginBottom: 12, ...styles.styleCardView, marginTop: 4 }}>
        <View
          style={{
            ...styles.styleCardView,
            flex: 1
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={[Fonts.type17]}>{data.title} </Text>
            <ToolTip
              iconName={'info'}
              iconSize={15}
              height={55}
              iconColor={Color.fontBlue50}
              popover={
                <Text style={[Fonts.type87, { textAlign: 'center' }]}>
                  {data.toolTipText}
                </Text>
              }
            />
          </View>
          <View>
            <Text style={[Fonts.type17]}>{data.value}</Text>
          </View>
        </View>
      </View>
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
   * RENDER
   * ========================
   */
  const renderMaterai = () => {
    const renderItem = () => {
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
              <Text style={[Fonts.type17]}>
                {MoneyFormatSpace(collectionInfo.stampAmount)}
              </Text>
            </TouchableOpacity>
            <View style={[GlobalStyle.lines, { marginTop: 8 }]} />
          </View>
        </>
      );
    };

    return collectionInfo.paymentCollectionTypeId === CHECK ||
      collectionInfo.paymentCollectionTypeId === GIRO ? (
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
          {collectionInfo.stampStatus === USED ||
          collectionInfo.stampStatus === NOT_USED
            ? renderItem()
            : checkMateraiStatus(collectionInfo.stampStatus)}
        </View>
      </View>
    ) : null;
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
              value={billingAmount}
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
                {MoneyFormatSpace(totalBillingAmount)}
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
          loading={loadingSfaPostCollectionPayment}
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
    return (
      <View style={{ flex: 1 }}>
        {renderInvoiceInfoHeader()}
        {renderCollectionInfoHeader()}
        {renderBillingInfoCardHeader()}
      </View>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
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

export default SfaBillingAddView;
