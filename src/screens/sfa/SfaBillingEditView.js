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
import { CASH, CHECK, GIRO } from '../../constants/collectionConstants';
import {
  sfaPostCollectionPaymentProcess,
  sfaGetBillingDetailProcess,
  sfaGetDetailProcess
} from '../../state/actions';
import ErrorBottomFailPayment from '../../components/error/ModalBottomFailPayment';

const SfaBillingEditView = props => {
  const dispatch = useDispatch();
  const collectionInfo = props.navigation.state.params;
  const [paymentAmount, setPaymentAmount] = useState(
    dataSfaGetBillingDetail?.data.amount
  );
  const [isStampChecked, setIsStampChecked] = useState(false);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const stampAmount = 10000;


  // SELECTOR
  const {
    loadingSfaPostCollectionPayment,
    loadingSfaGetBillingDetail,
    loadingSfaGetDetail,
    dataSfaPostCollectionPayment,
    errorSfaPostCollectionPayment,
    dataSfaGetDetail,
    dataSfaGetBillingDetail
  } = useSelector(state => state.sfa);
  const { userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);

  //USEREF ERROR
  const prevErrorSfaPostCollectionPaymentRef = useRef(
    errorSfaPostCollectionPayment
  );
  const prevDataSfaGetBillingDetailRef = useRef(dataSfaGetBillingDetail);

  useEffect(() => {
    getBillingDetail();
    getInvoiceDetail();
  }, []);

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

  const getBillingDetail = () => {
    dispatch(sfaGetBillingDetailProcess(210));
  };

  const getInvoiceDetail = () => {
    const orderParcelId = dataSfaGetDetail.data.id;
    dispatch(sfaGetDetailProcess(orderParcelId));
  };

  const isNumber = n => (n !== null && n !== undefined ? true : false);
  const onChangePaymentAmount = text => {
    let paymentAmountInt = parseInt(text.replace(/[Rp.]+/g, ''), 10);

    if (
      dataSfaGetBillingDetail.data.paymentCollectionType.id === GIRO ||
      dataSfaGetBillingDetail.data.paymentCollectionType.id === CHECK
      //   &&
      // collectionInfo.isStampUsed === true &&
      // isStampChecked === true
    ) {
      setTotalPaymentAmount(paymentAmountInt + stampAmount);
    } else {
      setTotalPaymentAmount(paymentAmountInt);
    }

    setPaymentAmount(paymentAmountInt);
  };

  const onCheckStamp = () => {
    setIsStampChecked(!isStampChecked);
    if (isStampChecked === false) {
      setTotalPaymentAmount(totalPaymentAmount + stampAmount);
    } else if (isStampChecked === true) {
      setTotalPaymentAmount(totalPaymentAmount - stampAmount);
    }
  };

  const submit = () => {
    const data = {
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      userId: parseInt(userSuppliers[0].userId, 10),
      orderParcelId: dataSfaGetDetail.data.id,
      storeId: parseInt(selectedMerchant.storeId, 10),
      paymentCollectionMethodId: collectionInfo.paymentCollectionMethodId,
      amount: totalPaymentAmount,
      isUsedStamp: true
    };
    dispatch(sfaPostCollectionPaymentProcess(data));

    if (!loadingSfaPostCollectionPayment && dataSfaPostCollectionPayment?.id) {
      NavigationService.navigate('SfaDetailView', {
        orderParcelId: dataSfaGetDetail.data.id
      });
    }
  };

  useEffect(()=> {
    prevDataSfaGetBillingDetailRef.current = dataSfaGetBillingDetail;
  }, [])
  const prevDataSfaGetBillingDetail =
  prevDataSfaGetBillingDetailRef.current;

  useEffect(() => {
    if (prevDataSfaGetBillingDetail !== dataSfaGetBillingDetail) {
      if (dataSfaGetBillingDetail) {
        setPaymentAmount(dataSfaGetBillingDetail.data.amount);
      }
    }
  }, [dataSfaGetBillingDetail]);
  //USE EFFECT PREV DATA ERROR
  useEffect(() => {
    prevErrorSfaPostCollectionPaymentRef.current = errorSfaPostCollectionPayment;
  }, []);
  const prevErrorSfaPostCollectionPayment =
    prevErrorSfaPostCollectionPaymentRef.current;

  //HANDLE ERROR POST COLLECTION
  useEffect(() => {
    if (prevErrorSfaPostCollectionPayment !== errorSfaPostCollectionPayment) {
      if (errorSfaPostCollectionPayment) {
        handleError(errorSfaPostCollectionPayment);
      }
    }
  }, [errorSfaPostCollectionPayment]);

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
    const {
      invoiceGroupName,
      orderCode,
      orderRef,
      totalBilling,
      remainingBilling
    } = dataSfaGetDetail?.data;

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
          value: isNumber(totalBilling)
            ? MoneyFormatSpace(totalBilling)
            : MoneyFormatSpace(0),
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Sisa Tagihan',
          value: isNumber(remainingBilling)
            ? MoneyFormatSpace(remainingBilling)
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
          value: collectionInfo?.paymentCollectionMethodName,
          styleCardView: styles.styleCardView
        })}
        {dataSfaGetBillingDetail.data.paymentCollectionType.id !== CASH
          ? CardBody({
              title: 'Nomor Referensi',
              value: collectionInfo?.collectionCode,
              styleCardView: styles.styleCardView
            })
          : null}
        {dataSfaGetBillingDetail.data.paymentCollectionType.id === CHECK ||
        dataSfaGetBillingDetail.data.paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Nilai Penagihan',
              value: MoneyFormatSpace(collectionInfo.amount),
              styleCardView: styles.styleCardView
            })
          : null}
        {dataSfaGetBillingDetail.data.paymentCollectionType.id === CHECK ||
        dataSfaGetBillingDetail.data.paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Materai',
              value: isNumber(dataSfaGetBillingDetail.data.stampAmount)
                ? MoneyFormatSpace(dataSfaGetBillingDetail.data.stampAmount)
                : '-',
              styleCardView: styles.styleCardView
            })
          : null}
        {CardBody({
          title: 'Total Penagihan',
          value: MoneyFormatSpace(collectionInfo?.amount),
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Sisa Penagihan',
          value: MoneyFormatSpace(collectionInfo?.amount),
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
              // onPress={() => console.log('true')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              disabled={!isStampChecked}
            >
              <Text style={[Fonts.type17]}>Rp 10.000</Text>
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
        </>
      );
    };

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
          {collectionInfo.isStampUsed === null ? (
            <Text style={[Fonts.type17]}>
              Penagihan tidak menggunakan materai
            </Text>
          ) : collectionInfo.isStampUsed === true ? (
            renderItem()
          ) : (
            <Text style={[Fonts.type17]}>
              Materai telah digunakan di pembayaran lainnya
            </Text>
          )}
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
          loading={loadingSfaPostCollectionPayment}
          disabled={loadingSfaPostCollectionPayment}
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
    return dataSfaGetBillingDetail && dataSfaGetDetail ? (
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
  return !loadingSfaGetBillingDetail && !loadingSfaGetDetail ? (
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
