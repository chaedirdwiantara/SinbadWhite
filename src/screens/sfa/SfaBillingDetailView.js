/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl
} from '../../library/reactPackage';
import { LoadingPage } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import { toLocalTime } from '../../helpers/TimeHelper';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { sfaGetBillingDetailProcess } from '../../state/actions';
import {
  APPROVED,
  REJECTED,
  PENDING,
  CHECK,
  GIRO,
  TRANSFER,
  USED,
  USED_BY_OTHERS,
  NOT_AVAILABLE,
  NOT_USED,
  RETUR,
  PROMO
} from '../../constants/collectionConstants';
import { CardHeaderBadge, CardBody, CardHeader } from './components/CardView';
import ErrorBottomFailPayment from '../../components/error/ModalBottomFailPayment';
import NavigationService from '../../navigation/NavigationService';

const SfaBillingDetailView = props => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const {
    dataSfaGetBillingDetail,
    loadingSfaGetBillingDetail,
    errorSfaGetBillingDetail
  } = useSelector(state => state.sfa);

  //USEREF ERROR
  const prevErrorSfaGetBillingDetailRef = useRef(errorSfaGetBillingDetail);

  //MODAL
  const [modalBottomError, setModalBottomError] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [buttonTitle, setButtonTitle] = useState(null);

  /** === ON REFRESH === */
  const onRefresh = () => {
    getBillingDetail();
    /** SET PAGE REFRESH */
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 10);
  };

  /**
   * *********************************
   * FUNCTION
   * *********************************
   */

  useEffect(() => {
    getBillingDetail();
  }, []);

  const getBillingDetail = () => {
    const paymentBillingId = props.navigation.state.params.paymentBillingId;
    dispatch(sfaGetBillingDetailProcess(paymentBillingId));
  };

  const formatDate = date => {
    return date ? toLocalTime(date, 'DD/MM/YYYY') : '-';
  };

  //USE EFFECT PREV DATA ERROR
  useEffect(() => {
    prevErrorSfaGetBillingDetailRef.current = errorSfaGetBillingDetail;
  }, []);
  const prevErrorSfaGetBillingDetail = prevErrorSfaGetBillingDetailRef.current;

  //HANDLE ERROR POST COLLECTION
  useEffect(() => {
    if (prevErrorSfaGetBillingDetail !== errorSfaGetBillingDetail) {
      if (errorSfaGetBillingDetail) {
        handleError(errorSfaGetBillingDetail);
      }
    }
  }, [errorSfaGetBillingDetail]);

  const handleError = error => {
    if (error) {
      switch (error?.data?.code) {
        case 40003:
          handleErrorSpecific(error, 'Maaf, data tidak ditemukan', 'Kembali');
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

  const onClickModalError = () => {
    setModalBottomError(false);
    NavigationService.navigate('SfaBillingLogView');
  };

  /** FUNCTION CHECK MATERAI STATUS */
  const checkMateraiStatus = (status, amount) => {
    switch (status) {
      case NOT_USED:
        return 'Pembayaran tidak menggunakan materai';
      case USED:
        return MoneyFormatSpace(amount);
      case NOT_AVAILABLE:
        return 'Penagihan tidak menggunakan materai';
      case USED_BY_OTHERS:
        return 'Materai sudah digunakan di pembayaran lainnya';
      default:
        return '-';
    }
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
            onPress={() => onClickModalError()}
            // text={messageError}
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
      orderRef
    } = dataSfaGetBillingDetail?.data;

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
          value: orderRef || '-',
          styleCardView: styles.styleCardView
        })}
      </>
    );
  };

  /**
   * ==============================
   * RENDER CODE INFORMATION HEADER
   * ==============================
   */
  const renderCodeInfoHeader = () => {
    return (
      <>
        {CardHeader({
          title: 'Informasi Kode',
          styleContainer: styles.container,
          styleCard: {
            ...styles.cardTaskList,
            ...GlobalStyle.shadowForBox5
          },
          styleCardView: styles.styleCardView,
          renderCardBody: renderCodeInfoBody
        })}
      </>
    );
  };

  /**
   * ============================
   * RENDER CODE INFORMATION BODY
   * ============================
   */
  const renderCodeInfoBody = () => {
    const {
      billingPaymentCode,
      billingPaymentRef,
      paymentCollectionType
    } = dataSfaGetBillingDetail.data;

    return (
      <>
        {CardBody({
          title:
            paymentCollectionType.id === RETUR ||
            paymentCollectionType.id === PROMO
              ? 'Kode Penagihan'
              : 'Kode Pembayaran',
          value: billingPaymentCode || '-',
          styleCardView: styles.styleCardView
        })}
        {paymentCollectionType.id !== RETUR &&
        paymentCollectionType.id !== PROMO
          ? CardBody({
              title: 'Kode Pembayaran Ref',
              value: billingPaymentRef || '-',
              styleCardView: styles.styleCardView
            })
          : null}
      </>
    );
  };

  /** RENDER SALESMAN INFORMATION HEADER */
  const renderSalesmanInfoHeader = () => {
    const { paymentCollectionType } = dataSfaGetBillingDetail.data;
    return (
      (paymentCollectionType.id === RETUR ||
        paymentCollectionType.id === PROMO) && (
        <>
          {CardHeader({
            title: 'Informasi Salesman',
            styleContainer: styles.container,
            styleCard: {
              ...styles.cardTaskList,
              ...GlobalStyle.shadowForBox5
            },
            styleCardView: styles.styleCardView,
            renderCardBody: renderSalesmanInfoBody
          })}
        </>
      )
    );
  };

  /** RENDER SALESMAN INFORMATION BODY */
  // TODO: Integration with API
  const renderSalesmanInfoBody = () => {
    return (
      <>
        {CardBody({
          title: 'Kode Salesman',
          value: dataSfaGetBillingDetail?.data?.salesCode,
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Nama Salesman',
          value: dataSfaGetBillingDetail?.data?.salesName,
          styleCardView: styles.styleCardView
        })}
      </>
    );
  };

  /**
   * =====================================
   * RENDER BILLING INFO CARD HEADER BADGE
   * =====================================
   */
  const renderBillingInfoHeaderBadge = () => {
    const { approvalStatus } = dataSfaGetBillingDetail.data;

    return approvalStatus === APPROVED
      ? CardHeaderBadge({
          title: 'Disetujui',
          backgroundColor: masterColor.fontGreen10,
          textColor: masterColor.fontGreen50
        })
      : approvalStatus === PENDING
      ? CardHeaderBadge({
          title: 'Menunggu',
          backgroundColor: masterColor.fontYellow10,
          textColor: masterColor.fontYellow50
        })
      : approvalStatus === REJECTED
      ? CardHeaderBadge({
          title: 'Ditolak',
          backgroundColor: masterColor.fontRed10,
          textColor: masterColor.fontRed50
        })
      : null;
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
          renderCardHeaderBadge: renderBillingInfoHeaderBadge,
          renderCardBody: renderBillingInfoBody
        })}
      </>
    );
  };

  /**
   * ========================
   * RENDER BILLING INFO BODY
   * ========================
   */
  const renderBillingInfoBody = () => {
    const {
      createdAt,
      paidAmount,
      paidByCollectionMethod,
      stampAmount,
      stampStatus,
      paymentCollectionType
    } = dataSfaGetBillingDetail?.data;

    return (
      <>
        {CardBody({
          title:
            paymentCollectionType.id === TRANSFER
              ? '*Tanggal Pembayaran'
              : 'Tanggal Pembayaran',
          valueIcon: paymentCollectionType.id !== RETUR && {
            prefixIcon: 'date-range',
            prefixStyle: { marginRight: 11 }
          },
          value: formatDate(createdAt),
          valuePosition: 'bottom',
          titleStyle: { ...Fonts.type37 },
          valueStyle: { marginBottom: 16, marginTop: 2 },
          styleCardView: styles.styleCardView
        })}
        {(paymentCollectionType.id === RETUR ||
          paymentCollectionType.id === PROMO) &&
          CardBody({
            title: 'Metode Penagihan',
            value: paymentCollectionType?.name || '-',
            valuePosition: 'bottom',
            titleStyle: { ...Fonts.type37 },
            valueStyle: { marginBottom: 16 },
            styleCardView: styles.styleCardView
          })}
        {CardBody({
          title:
            paymentCollectionType.id === TRANSFER
              ? '*Jumlah Pembayaran'
              : 'Jumlah Pembayaran',
          value: MoneyFormatSpace(paidByCollectionMethod),
          valuePosition: 'bottom',
          titleStyle: { ...Fonts.type37 },
          valueStyle: { marginBottom: 16 },
          styleCardView: styles.styleCardView
        })}
        {paymentCollectionType.id === CHECK || paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Materai',
              value: stampStatus
                ? checkMateraiStatus(stampStatus, stampAmount)
                : '-',
              valuePosition: 'bottom',
              titleStyle: { ...Fonts.type37 },
              valueStyle: { marginBottom: 16 },
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id !== TRANSFER
          ? CardBody({
              title: 'Total Pembayaran',
              value: MoneyFormatSpace(paidAmount),
              valuePosition: 'bottom',
              titleStyle: { ...Fonts.type37 },
              valueStyle: { marginBottom: 16 },
              styleCardView: styles.styleCardView
            })
          : null}
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
        {renderCodeInfoHeader()}
        {renderSalesmanInfoHeader()}
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
      {!loadingSfaGetBillingDetail ? (
        <SafeAreaView style={styles.mainContainer}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
              />
            }
            style={{ flex: 1, height: '100%' }}
          >
            {dataSfaGetBillingDetail ? renderContent() : renderModalError()}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <LoadingPage />
      )}
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
  }
});

export default SfaBillingDetailView;
