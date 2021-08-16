import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  // RefreshControl,
  Text,
  TouchableOpacity
} from '../../library/reactPackage';
import {
  MaterialIcon,
  MaterialCommunityIcons
} from '../../library/thirdPartyPackage';
import { TextInputMask } from 'react-native-masked-text';
import { ButtonSingle } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { CardBody, CardHeader } from './components/CardView';
import NavigationService from '../../navigation/NavigationService';
import { CASH, CHECK, GIRO } from '../../constants/collectionConstants';
import { sfaPostBillingAddProcess } from '../../state/actions';

const SfaBillingAddView = props => {
  const dispatch = useDispatch();

  const collectionInfo = props.navigation.state.params;
  // const [refreshing, setRefreshing] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isStampChecked, setIsStampChecked] = useState(null);
  const [stampAmount, setStampAmount] = useState(0);

  console.log('collectionInfo:', collectionInfo);

  const {
    loadingSfaPostBillingAdd,
    dataSfaGetDetail,
    dataSfaPostBillingAdd
  } = useSelector(state => state.sfa);
  const { userSuppliers } = useSelector(state => state.user);
  const { selectedMerchant } = useSelector(state => state.merchant);

  /** === ON REFRESH === */
  // const onRefresh = () => {
  //   /** SET PAGE REFRESH */
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 10);
  // };

  /**
   * *********************************
   * FUNCTION
   * *********************************
   */

  const isNumber = n => (n !== null && n !== undefined ? true : false);

  const dataPaymentAmount = text => {
    let paymentAmountInt = parseInt(text.replace(/[Rp.]+/g, ''), 10);

    if (
      collectionInfo.paymentCollectionTypeId === GIRO ||
      collectionInfo.paymentCollectionTypeId === CHECK
    ) {
      if (collectionInfo.isStampUsed === true) {
        paymentAmountInt += stampAmount;
      }
    }

    setPaymentAmount(paymentAmountInt);
  };

  const onCheckStamp = () => {
    setIsStampChecked(!isStampChecked);
    if (isStampChecked === false) {
      console.log('lalla');
    }
  };

  const submit = () => {
    const data = {
      supplierId: parseInt(userSuppliers[0].supplierId, 10),
      userId: parseInt(userSuppliers[0].userId, 10),
      orderParcelId: dataSfaGetDetail.data.id,
      storeId: parseInt(selectedMerchant.storeId, 10),
      paymentCollectionMethodId: collectionInfo.paymentCollectionTypeId,
      amount: paymentAmount,
      isUsedStamp: collectionInfo.isStampUsed
    };
    dispatch(sfaPostBillingAddProcess(data));

    if (!loadingSfaPostBillingAdd && dataSfaPostBillingAdd?.id) {
      NavigationService.navigate('SfaDetailView', {
        orderParcelId: dataSfaGetDetail.data.id
      });
    }
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
          value: collectionInfo?.collectionMethodName,
          styleCardView: styles.styleCardView
        })}
        {collectionInfo.paymentCollectionTypeId !== CASH
          ? CardBody({
              title: 'Nomor Referensi',
              value: collectionInfo?.collectionCode,
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

  /** RENDER MATERAI */
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
              onPress={() => console.log('true')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
              disabled={!isStampChecked}
            >
              <Text style={[Fonts.type17]}>Materai</Text>
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
              onChangeText={text => dataPaymentAmount(text)}
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
                {MoneyFormatSpace(paymentAmount)}
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
          loading={loadingSfaPostBillingAdd}
          disabled={loadingSfaPostBillingAdd}
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
      {/* {dataSfaGetBillingAdd && !loadingSfaGetBillingAdd ? ( */}
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={() => onRefresh()}
          //   />
          // }
          style={{ flex: 1, height: '100%' }}
        >
          {renderContent()}
        </ScrollView>
        {renderFooter()}
        {renderSaveButton()}
      </SafeAreaView>
      {/* ) : (
        <LoadingPage />
      )} */}
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
