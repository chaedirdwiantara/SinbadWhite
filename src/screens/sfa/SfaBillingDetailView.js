import React, { useState, useEffect } from 'react';
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
  TRANSFER
} from '../../constants/collectionConstants';
import { CardHeaderBadge, CardBody, CardHeader } from './components/DetailView';

const SfaBillingDetailView = props => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const { dataSfaGetBillingDetail, loadingSfaGetBillingDetail } = useSelector(
    state => state.sfa
  );

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
    return date ? toLocalTime(date, 'DD MMMM YYYY') : '';
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

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
          title: 'Nomor Faktur',
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
          value: orderRef,
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
      billingPaymentRef
    } = dataSfaGetBillingDetail.data;

    return (
      <>
        {CardBody({
          title: 'Kode Pembayaran',
          value: billingPaymentCode,
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Kode Pembayaran Ref',
          value: billingPaymentRef,
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
      amount,
      stampAmount,
      totalAmount,
      paymentCollectionType
    } = dataSfaGetBillingDetail.data;

    return (
      <>
        {CardBody({
          title:
            paymentCollectionType.id === TRANSFER
              ? '*Tanggal Pembayaran'
              : 'Tanggal Pembayaran',
          value: formatDate(createdAt),
          valuePosition: 'bottom',
          titleStyle: { ...Fonts.type37 },
          valueStyle: { marginBottom: 16 },
          viewType: 'date',
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title:
            paymentCollectionType.id === TRANSFER
              ? '*Jumlah Pembayaran'
              : 'Jumlah Pembayaran',
          value: MoneyFormatSpace(amount),
          valuePosition: 'bottom',
          titleStyle: { ...Fonts.type37 },
          valueStyle: { marginBottom: 16 },
          styleCardView: styles.styleCardView
        })}
        {paymentCollectionType.id === CHECK || paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Materai',
              value:
                stampAmount !== undefined && stampAmount !== null
                  ? MoneyFormatSpace(stampAmount)
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
              value: MoneyFormatSpace(totalAmount),
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
      {dataSfaGetBillingDetail && !loadingSfaGetBillingDetail ? (
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
            {renderContent()}
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
