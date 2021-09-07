import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  TouchableWithoutFeedback,
  RefreshControl
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../library/thirdPartyPackage';
import {
  StatusBarWhite,
  ButtonSingle,
  LoadingPage
} from '../../library/component';
import {
  sfaGetDetailProcess,
  sfaGetPaymentMethodProcess
} from '../../state/actions';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import ErrorBottomFailPayment from '../../components/error/ModalBottomFailPayment';
import { COLLECTION } from '../../constants/paymentConstants';
function SfaDetailView(props) {
  const dispatch = useDispatch();
  const orderParcelId = props.navigation.state.params.orderParcelId;
  const [refreshing, setRefreshing] = useState(false);
  // SELECTOR
  const {
    loadingSfaGetDetail,
    dataSfaGetDetail,
    errorSfaGetDetail
  } = useSelector(state => state.sfa);

  const { selectedMerchant } = useSelector(state => state.merchant);
  const { userSuppliers } = useSelector(state => state.user);
  const [accordionOpen, setAccordionOpen] = useState(false);

  //USEREF ERROR
  const prevErrorSfaGetDetailRef = useRef(errorSfaGetDetail);

  //MODAL
  const [modalBottomError, setModalBottomError] = useState(false);
  const [messageError, setMessageError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [buttonTitle, setButtonTitle] = useState(null);

  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  const addCollection = () => {
    const data = {
      supplierId: parseInt(userSuppliers[0].supplier.id, 10),
      storeId: selectedMerchant.storeId
    };
    dispatch(sfaGetPaymentMethodProcess(data));
    NavigationService.navigate('SfaCollectionMethodListView');
  };

  const openAccordion = event => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        375,
        LayoutAnimation.Types.easeIn,
        LayoutAnimation.Properties.opacity
      )
    );

    setAccordionOpen(event);
  };

  //USE EFFECT PREV DATA ERROR
  useEffect(() => {
    prevErrorSfaGetDetailRef.current = errorSfaGetDetail;
  }, []);
  const prevErrorSfaGetDetail = prevErrorSfaGetDetailRef.current;

  //HANDLE ERROR POST COLLECTION
  useEffect(() => {
    if (prevErrorSfaGetDetail !== errorSfaGetDetail) {
      if (errorSfaGetDetail) {
        handleError(errorSfaGetDetail);
      }
    }
  }, [errorSfaGetDetail]);

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
    NavigationService.navigate('SfaView');
  };
  /** GET DETAIL ORDER PARCEL */
  const getDetailOrder = () => {
    dispatch(sfaGetDetailProcess(orderParcelId));
  };
  /** === ON REFRESH === */
  const onRefresh = () => {
    getDetailOrder();
    /** SET PAGE REFRESH */
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 10);
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

  /** RENDER FAKTUR INFO */
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

  /** RENDER FAKTUR INFO ITEM */
  const renderItemFakturInfo = () => {
    const detailSfa = dataSfaGetDetail.data;
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
          <Text style={Fonts.type17}>{detailSfa.invoiceGroupName}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>No. Pesanan</Text>
          <Text style={Fonts.type17}>{detailSfa.orderCode}</Text>
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
            {detailSfa.orderRef === null || detailSfa.orderRef === ''
              ? '-'
              : detailSfa.orderRef}
          </Text>
        </View>
      </View>
    );
  };

  /** RENDER COLLECTION INFO */
  const renderCollectionInfo = () => {
    return (
      <View style={[styles.container, { marginBottom: 16 }]}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Informasi Tagihan</Text>
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          {renderItemCollectionInfo()}
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          {renderCollectionDetail()}
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          {renderCollectionOutstanding()}
        </View>
      </View>
    );
  };

  /** RENDER COLLECTION INFO ITEM */
  const renderItemCollectionInfo = () => {
    const detailSfa = dataSfaGetDetail.data;
    return (
      <View key={1}>
        <TouchableWithoutFeedback onPress={() => openAccordion(!accordionOpen)}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 4,
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              {accordionOpen === true ? (
                <MaterialIcon
                  name="keyboard-arrow-up"
                  color={masterColor.fontBlack50}
                  size={24}
                  style={{ marginTop: -4, marginLeft: -4, marginRight: 6 }}
                />
              ) : (
                <MaterialIcon
                  name="keyboard-arrow-down"
                  color={masterColor.fontBlack50}
                  size={24}
                  style={{ marginTop: -4, marginLeft: -4, marginRight: 6 }}
                />
              )}
              <Text style={Fonts.type17}>Total Tagihan</Text>
            </View>
            <Text style={Fonts.type17}>
              {MoneyFormatSpace(detailSfa.totalBilling)}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        {renderAccordion()}
        <View style={[GlobalStyle.lines, { flex: 1, marginBottom: 8 }]} />

        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>Pembayaran dari Toko</Text>
          <Text style={Fonts.type17}>
            {MoneyFormatSpace(detailSfa.totalInStorePayment)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>Total Penagihan</Text>
          <Text style={Fonts.type17}>
            {MoneyFormatSpace(detailSfa.totalCollection)}
          </Text>
        </View>
      </View>
    );
  };

  /** RENDER COLLECTION DETAIL */
  const renderCollectionDetail = () => {
    return dataSfaGetDetail.data.collections.map((item, index) => {
      return (
        <View key={index} style={{ marginLeft: 8 }}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              justifyContent: 'space-between'
            }}
          >
            <Text style={Fonts.type17}>{item.name}</Text>
            <Text style={Fonts.type17}>
              {item.value === 0 ? '-' : MoneyFormatSpace(item.value)}
            </Text>
          </View>
        </View>
      );
    });
  };

  /** RENDER COLLECTION OUTSTANDING */
  const renderCollectionOutstanding = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={Fonts.type17}>Sisa Tagihan</Text>
          <Text style={Fonts.type22}>
            {MoneyFormatSpace(dataSfaGetDetail.data.remainingBilling)}
          </Text>
        </View>
      </View>
    );
  };

  /** RENDER ADD COLLECTION */
  const renderAddCollection = () => {
    return (
      <ButtonSingle
        disabled={
          dataSfaGetDetail.data.isPaid ||
          dataSfaGetDetail.data.remainingBilling === 0
        }
        title={'Tagih'}
        borderRadius={4}
        onPress={() => addCollection()}
      />
    );
  };

  /** RENDER ACCORDING */
  const renderAccordion = () => {
    if (accordionOpen === true) {
      return (
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              justifyContent: 'space-between'
            }}
          >
            <Text style={Fonts.type17}>{`Sub-Total (${
              dataSfaGetDetail.data.parcelQty
            })`}</Text>
            <Text style={Fonts.type17}>
              {MoneyFormatSpace(dataSfaGetDetail.data.parcelGrossPrice)}
            </Text>
          </View>
          {dataSfaGetDetail?.data.promoList !== null ? renderPromo() : null}
          {dataSfaGetDetail?.data.voucherList !== null
            ? renderVoucherList()
            : null}
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              justifyContent: 'space-between'
            }}
          >
            <Text style={Fonts.type17}>Ongkos Kirim</Text>
            <Text style={Fonts.type17}>{MoneyFormatSpace(0)}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              justifyContent: 'space-between'
            }}
          >
            <Text style={Fonts.type17}>PPN 10%</Text>
            <Text style={Fonts.type17}>
              {MoneyFormatSpace(dataSfaGetDetail.data.parcelTaxes)}
            </Text>
          </View>
        </View>
      );
    }
  };
  /** === RENDER VOUCHER LIST ==== */
  const renderVoucherList = () => {
    return dataSfaGetDetail.data.voucherList.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={[Fonts.type51, { width: '80%' }]}>
            {item.voucherValue !== null
              ? item.voucherName
              : `${item.catalogueName} (${item.voucherQty} Pcs)`}
          </Text>
          <Text style={Fonts.type51}>
            {item.voucherValue !== null
              ? `- ${MoneyFormatSpace(item.voucherValue)}`
              : 'FREE'}
          </Text>
        </View>
      );
    });
  };
  /** RENDER PROMO */
  const renderPromo = () => {
    return dataSfaGetDetail.data.promoList.map((item, index) => {
      return (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            marginBottom: 8,
            justifyContent: 'space-between'
          }}
        >
          <Text style={[Fonts.type51, { width: '80%' }]}>
            {item.promoValue !== null
              ? item.promoName
              : `${item.catalogueName} (${item.promoQty} Pcs)`}
          </Text>
          <Text style={Fonts.type51}>
            {item.promoValue !== null
              ? `- ${MoneyFormatSpace(item.promoValue)}`
              : 'FREE'}
          </Text>
        </View>
      );
    });
  };

  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return (
      <>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1 }}>
            {renderFakturInfo()}
            {renderCollectionInfo()}
          </View>
        </ScrollView>
        {renderAddCollection()}
      </>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      {!loadingSfaGetDetail ? (
        <SafeAreaView style={styles.mainContainer}>
          <StatusBarWhite />
          {dataSfaGetDetail ? renderContent() : null}
          {renderModalError()}
        </SafeAreaView>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export const HeaderRightOption = props => {
  return (
    <View style={styles.navOption}>
      <>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate('SfaCollectionLog', {
              type: COLLECTION
            })
          }
        >
          <MaterialIcon
            name="restore"
            size={28}
            style={{ color: masterColor.fontBlack50, marginRight: 10 }}
          />
        </TouchableOpacity>
      </>
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
  navOption: {
    flex: 1,
    paddingHorizontal: 10
  }
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapDispatchToProps)(SfaDetailView);
