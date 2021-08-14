import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Text
} from '../../library/reactPackage';
import { LoadingPage, ButtonSingle } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { sfaGetBillingAddProcess } from '../../state/actions';
import { CardBody, CardHeader } from './components/DetailView';
import NavigationService from '../../navigation/NavigationService';

const SfaBillingAddView = props => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const dataSfaGetBillingAdd = {
    data: {
      fakturName: 'COMBINE',
      orderCode: 'S001001788812',
      orderRef: 'A754',
      totalInvoiceAmmount: 1100000,
      totalInvoiceOutstandingAmmount: 1100000,
      paymentCollectionTypeId: 1,
      collectionRef: 'C001',
      collectionAmount: 1100000,
      stampAmount: 10000,
      totalCollectionAmount: 1100000,
      totalCollectionRemainingAmount: 120000
    }
  };

  const { loadingSfaGetBillingAdd } = useSelector(state => state.sfa);

  /** === ON REFRESH === */
  const onRefresh = () => {
    getBillingAdd();
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
    getBillingAdd();
  }, []);

  const getBillingAdd = () => {
    const paymentBillingId = props.navigation.state.params.paymentBillingId;
    dispatch(sfaGetBillingAddProcess(paymentBillingId));
  };

  const isNumber = n => (n !== null && n !== undefined ? true : false);

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
      fakturName,
      orderCode,
      orderRef,
      totalInvoiceAmmount,
      totalInvoiceOutstandingAmmount
    } = dataSfaGetBillingAdd?.data;

    return (
      <>
        {CardBody({
          title: 'Nama Faktur',
          value: fakturName,
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
        {CardBody({
          title: 'Total Tagihan',
          value:
            totalInvoiceAmmount !== undefined && totalInvoiceAmmount !== null
              ? MoneyFormatSpace(totalInvoiceAmmount)
              : '-',
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Sisa Tagihan',
          value:
            totalInvoiceOutstandingAmmount !== undefined &&
            totalInvoiceOutstandingAmmount !== null
              ? MoneyFormatSpace(totalInvoiceOutstandingAmmount)
              : '-',
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
    const {
      paymentCollectionTypeId,
      collectionRef,
      collectionAmount,
      stampAmount,
      totalCollectionAmount,
      totalCollectionRemainingAmount
    } = dataSfaGetBillingAdd.data;

    return (
      <>
        {CardBody({
          title: 'Metode Penagihan',
          value: paymentCollectionTypeId,
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Nomor Penagihan',
          value: collectionRef,
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Nilai Penagihan',
          value: MoneyFormatSpace(collectionAmount),
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Materai',
          value: isNumber(stampAmount) ? stampAmount : '-',
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Total Penagihan',
          value: MoneyFormatSpace(totalCollectionAmount),
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Sisa Penagihan',
          value: MoneyFormatSpace(totalCollectionRemainingAmount),
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
          styleCardView: styles.styleCardView
          // renderCardBody: renderBillingInfoBody
        })}
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <View style={[GlobalStyle.lines, styles.footerLine]} />
        <View style={styles.footer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[Fonts.type23, styles.textLeft]}>
                Total Pembayaran
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[Fonts.type116p, styles.textRight]}>
                {/* TODO: */}
                {MoneyFormatSpace(1000000)}
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
          title={'Simpan'}
          borderRadius={4}
          // onPress={() =>
          //   // TODO: Change navigation to SfaBillingListView
          //   NavigationService.navigate('SfaBillingDetailView', {
          //     paymentBillingId: dataSfaGetCollectionDetail.data.id
          //   })
          // }
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
      {dataSfaGetBillingAdd && !loadingSfaGetBillingAdd ? (
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
          {renderFooter()}
          {renderSaveButton()}
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
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: masterColor.backgroundWhite
  }
});

export default SfaBillingAddView;
