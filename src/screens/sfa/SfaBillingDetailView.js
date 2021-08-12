import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from '../../library/reactPackage';
import { MaterialIcon } from '../../library/thirdPartyPackage';
import { LoadingPage } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import { toLocalTime } from '../../helpers/TimeHelper';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { sfaGetBillingDetailProcess } from '../../state/actions';
import {
  APPROVED,
  REJECTED,
  PENDING
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';

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
    const paymentBillingId = props.navigation.state.params.paymentCollectionId;
    dispatch(sfaGetBillingDetailProcess(paymentBillingId));
  };

  const formatDate = date => {
    return date ? toLocalTime(date, 'DD MMMM YYYY') : '';
  };

  /* ========================
   * HEADER MODIFY
   * ========================
   */
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={[styles.headerContent]}>
          <View style={[styles.headerBody, { alignItems: 'flex-start' }]}>
            <TouchableOpacity onPress={() => NavigationService.goBack()}>
              <View>
                <MaterialIcon
                  name="arrow-back"
                  size={24}
                  color={masterColor.fontBlack50}
                  style={{
                    marginBottom: 8,
                    marginLeft: 8,
                    alignContent: 'flex-start'
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: 'center', flex: 1, marginLeft: 25 }}>
            <Text style={Fonts.type5}>Detail Pembayaran</Text>
          </View>
        </View>
        <View style={[GlobalStyle.lines, styles.headerLine]} />
      </View>
    );
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  /**
   * RENDER BADGE
   * @param {string} title
   * @param {any} backgroundColor
   * @param {any} textColor
   * @returns
   */
  const renderBadge = items => {
    return (
      <View
        style={{ borderRadius: 30, backgroundColor: items.backgroundColor }}
      >
        <Text style={[Fonts.type38, { padding: 8, color: items.textColor }]}>
          {items.title}
        </Text>
      </View>
    );
  };

  /**
   * RENDER CARD HEADER
   * @param {string} title
   * @param {any} boxStyle
   * @param {any} renderCardHeaderBadge
   * @param {any} renderCardBody
   * @returns
   */
  const renderCardHeader = items => {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.cardTaskList,
            GlobalStyle.shadowForBox5,
            { ...items.boxStyle }
          ]}
        >
          <View style={{ ...styles.items }}>
            <Text style={Fonts.type48}>{items.title}</Text>
            {items.renderCardHeaderBadge ? items.renderCardHeaderBadge() : null}
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          {items.renderCardBody ? items.renderCardBody() : null}
        </View>
      </View>
    );
  };

  /**
   * RENDER CARD BODY
   * @param {*} title
   * @param {*} value
   * @param {*} imageSource
   * @returns
   */
  const renderCardBody = items => {
    return (
      <>
        <View style={{ ...styles.items, marginBottom: 8 }}>
          {items?.tooltip ? (
            <View style={{ flexDirection: 'row' }}>
              <Text style={Fonts.type17}>{items.title}</Text>
            </View>
          ) : (
            <Text style={Fonts.type17}>{items.title}</Text>
          )}
          <Text style={Fonts.type17}>{items.value}</Text>
        </View>
        {/* {items.imageSource ? (
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.smallContainerImage}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64, ${items.imageSource}`
                }}
                style={styles.images}
              />
            </View>
          </View>
        ) : null} */}
      </>
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
        {renderCardHeader({
          title: 'Informasi Faktur',
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
        {renderCardBody({
          title: 'Nomor Faktur',
          value: invoiceGroupName
        })}
        {renderCardBody({
          title: 'Nomor Pesanan',
          value: orderCode
        })}
        {renderCardBody({
          title: 'Nomor Referensi',
          value: orderRef
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
        {renderCardHeader({
          title: 'Informasi Kode',
          renderCardBody: renderCodeInfoBody,
          boxStyle: { marginBottom: 16 }
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
        {renderCardBody({
          title: 'Kode Pembayaran',
          value: billingPaymentCode
        })}
        {renderCardBody({
          title: 'Kode Pembayaran Ref',
          value: billingPaymentRef
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
      ? renderBadge({
          title: 'Disetujui',
          backgroundColor: masterColor.fontGreen10,
          textColor: masterColor.fontGreen50
        })
      : approvalStatus === PENDING
      ? renderBadge({
          title: 'Menunggu',
          backgroundColor: masterColor.fontYellow10,
          textColor: masterColor.fontYellow50
        })
      : approvalStatus === REJECTED
      ? renderBadge({
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
        {renderCardHeader({
          title: 'Informasi Pembayaran',
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
    const { createdAt, amount, totalAmount } = dataSfaGetBillingDetail.data;

    return (
      <>
        {renderCardBody({
          title: 'Tanggal Pembayaran',
          value: formatDate(createdAt)
        })}
        {renderCardBody({
          title: 'Jumlah Pembayaran',
          value: MoneyFormatSpace(amount)
        })}
        {renderCardBody({
          title: 'Total Pembayaran',
          value: MoneyFormatSpace(totalAmount)
        })}
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
        {renderBillingInfoCardHeader()}
        {renderCodeInfoHeader()}
      </View>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  // return (
  //   <View style={{ flex: 1 }}>
  //     <StatusBarWhite />
  //     <ScrollView
  //       style={{ flex: 1, backgroundColor: masterColor.backgroundWhite }}
  //     >
  //       {renderContent()}
  //     </ScrollView>
  //   </View>
  // );

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
  inputField: {
    marginTop: 16
  },
  headerContainer: {
    backgroundColor: masterColor.backgroundWhite,
    height: 56,
    justifyContent: 'center'
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row'
  },
  headerBody: {
    marginHorizontal: 8,
    marginVertical: 16
  },
  headerLine: {
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 1
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
export default SfaBillingDetailView;
