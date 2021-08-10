import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from '../../library/reactPackage';
import {
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  ButtonSingle
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import { toLocalTime } from '../../helpers/TimeHelper';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import SfaCollectionDetailCheckandGiro from './SfaCollectionDetailCheckandGiro';
import SfaCollectionDetailTransfer from './SfaCollectionDetailTransfer';
import SfaCollectionDetailPromo from './SfaCollectionDetailPromo';
import {
  sfaGetCollectionDetailProcess,
  sfaDeleteCollectionProcess,
  sfaGetCollectionLogProcess
} from '../../state/actions';
import {
  APPROVED,
  REJECTED,
  PENDING
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';

const SfaCollectionDetailView = props => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const {
    dataSfaGetDetail,
    dataSfaGetCollectionDetail,
    dataSfaDeleteCollection,
    dataSfaGetCollectionLog,
    dataSfaEditCollection,
    loadingSfaDeleteCollection,
    loadingSfaGetCollectionDetail
  } = useSelector(state => state.sfa);
  const { selectedMerchant } = useSelector(state => state.merchant);

  //USEREF
  const prevDataSfaDeleteCollectionRef = useRef(dataSfaDeleteCollection);
  const prevDataSfaGetCollectionLogRef = useRef(dataSfaGetCollectionLog);
  const prevDataSfaEditCollectionRef = useRef(dataSfaEditCollection);

  /** === ON REFRESH === */
  const onRefresh = () => {
    getCollectionDetail();
    /** SET PAGE REFRESH */
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3);
  };

  /**
   * *********************************
   * FUNCTION
   * *********************************
   */
  //USE EFFECT PREV DATA EDIT
  useEffect(() => {
    prevDataSfaEditCollectionRef.current = dataSfaEditCollection;
  }, []);
  const prevDataSfaEditCollection = prevDataSfaEditCollectionRef.current;

  //USE EFFECT PREV DATA DELETE
  useEffect(() => {
    prevDataSfaDeleteCollectionRef.current = dataSfaDeleteCollection;
  }, []);
  const prevDataSfaDeleteCollection = prevDataSfaDeleteCollectionRef.current;

  //USE EFFECT PREV DATA LOG
  useEffect(() => {
    prevDataSfaGetCollectionLogRef.current = dataSfaGetCollectionLog;
  }, []);
  const prevDataSfaGetCollectionLog = prevDataSfaGetCollectionLogRef.current;

  useEffect(() => {
    getCollectionDetail();
  }, []);

  const getCollectionDetail = () => {
    const paymentCollectionId =
      props.navigation.state.params.paymentCollectionId;
    dispatch(sfaGetCollectionDetailProcess(paymentCollectionId));
  };

  const formatDate = date => {
    const local = toLocalTime(date);
    return moment(local).format('DD MMMM YYYY');
  };

  useEffect(() => {
    if (prevDataSfaDeleteCollection !== dataSfaDeleteCollection) {
      if (dataSfaDeleteCollection) {
        const data = {
          storeId: parseInt(selectedMerchant.storeId),
          orderParcelId: dataSfaGetDetail.data.id,
          limit: 20,
          skip: 0
        };
        dispatch(sfaGetCollectionLogProcess(data));
      }
    }
  }, [dataSfaDeleteCollection]);

  useEffect(() => {
    if (prevDataSfaGetCollectionLog !== dataSfaGetCollectionLog) {
      NavigationService.navigate('SfaCollectionLog');
    }
  }, [dataSfaGetCollectionLog]);

  useEffect(() => {
    if (prevDataSfaEditCollection !== dataSfaEditCollection) {
      if (dataSfaEditCollection) {
        setIsShowEditSuccessToast(true);
        setTimeout(() => {
          setIsShowEditSuccessToast(false);
        }, 3000);
      }
    }
  }, [dataSfaEditCollection]);

  /** FUNCTION COLLECTION METHOD */
  const collectionMethod = id => {
    let collection = '';
    switch (id) {
      case 1:
        collection = 'Tunai';
        break;
      case 2:
        collection = 'Cek';
        break;
      case 3:
        collection = 'Giro';
        break;
      case 4:
        collection = 'Transfer';
        break;
      case 5:
        collection = 'Promo';
        break;
      default:
        collection = '';
        break;
    }
    return collection;
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
            <Text style={Fonts.type5}>Detail Penagihan</Text>
          </View>
          {dataSfaGetCollectionDetail &&
          dataSfaGetCollectionDetail.isEditable ? (
            <View style={[styles.headerBody, { flexDirection: 'row' }]}>
              <TouchableOpacity onPress={() => deleteTransaction()}>
                <MaterialIcon
                  name="delete"
                  size={28}
                  style={{ color: masterColor.fontBlack50, marginRight: 10 }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editTransaction()}>
                <MaterialIcon
                  name="edit"
                  size={28}
                  style={{ color: masterColor.fontBlack50 }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
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
   const renderBadge = props => {
    return (
      <View
        style={{ borderRadius: 30, backgroundColor: props.backgroundColor }}
      >
        <Text style={[Fonts.type38, { padding: 8, color: props.textColor }]}>
          {props.title}
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
  const renderCardHeader = (props) => {
    return (
      <View style={styles.container}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5, { ...props.boxStyle }]}>
          <View style={{ ...styles.items }}>
            <Text style={Fonts.type48}>{props.title}</Text>
            {props.renderCardHeaderBadge ? props.renderCardHeaderBadge() : null}
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          {props.renderCardBody ? props.renderCardBody() : null}
        </View>
      </View>
    )
  }

  /**
   * RENDER CARD BODY
   * @param {*} title 
   * @param {*} value 
   * @returns 
   */
   const renderCardBody = (props) => {
    return (
      <View style={{ ...styles.items, marginBottom: 8 }}>
        <Text style={Fonts.type17}>{props.title}</Text>
        <Text style={Fonts.type17}>{props.value}</Text>
      </View>
    );
  }

  /**
   * ==================================-
   * RENDER INFORMATION INFO CARD HEADER
   * ===================================
   * @returns
   */
  const renderInfoCodeHeader = () => {
    return (
      <>
        {renderCardHeader({
          title: 'Informasi Kode',
          renderCardBody: renderInfoCodeBody
        })}
      </>
    );
  };

  /**
   * =================================
   * RENDER INFORMATION INFO CARD BODY
   * =================================
   * @returns
   */
  const renderInfoCodeBody = () => {
    const detailSfa = dataSfaGetDetail.data;
    return (
      <>
        {renderCardBody({
          title: 'Kode Penagihan',
          value: detailSfa.collectionCode
        })}
        {renderCardBody({
          title: 'Kode Penagihan Ref',
          value: detailSfa.collectionRef
        })}
      </>
    );
  };

  /**
   * ==========================================
   * RENDER COLLECTION DETAIL CARD HEADER BADGE
   * ==========================================
   */
  const renderCollectionDetailHeaderBadge = () => {
    const paymentCollectionMethod =
      dataSfaGetCollectionDetail.paymentCollection.paymentCollectionMethod;

    return paymentCollectionMethod.approvalStatus === APPROVED
      ? renderBadge({
          title: 'Disetujui',
          backgroundColor: masterColor.fontGreen10,
          textColor: masterColor.fontGreen50
        })
      : paymentCollectionMethod.approvalStatus === PENDING
      ? renderBadge({
          title: 'Menunggu',
          backgroundColor: masterColor.fontYellow10,
          textColor: masterColor.fontYellow50
        })
      : paymentCollectionMethod.approvalStatus === REJECTED
      ? renderBadge({
          title: 'Ditolak',
          backgroundColor: masterColor.fontRed10,
          textColor: masterColor.fontRed50
        })
      : null;
  };

  /**
   * ====================================
   * RENDER COLLECTION DETAIL CARD HEADER
   * ====================================
   */
  const renderCollectionDetailCardHeader = () => {
    return (
      <>
        {renderCardHeader({
          title: 'Informasi Penagihan',
          renderCardHeaderBadge: renderCollectionDetailHeaderBadge,
          renderCardBody: renderCollectionDetailBody
        })}
      </>
    );
  };

  /**
   * ====================================
   * RENDER COLLECTION DETAIL BODY
   * ====================================
   */
  const renderCollectionDetailBody = () => {
    const collectionMethodType =
      dataSfaGetCollectionDetail.paymentCollection.paymentCollectionMethod
        .paymentCollectionType;
    return (
      <View>
        {renderCardBody({
          title: 'Tanggal Penagihan',
          value: formatDate('2021-08-10')
        })}
        {renderCardBody({
          title: 'Metode Penagihan',
          value: collectionMethod(collectionMethodType)
        })}
        {renderCardBody({
          title: 'Nomor Referensi',
          value: ''
        })}
        {renderCardBody({
          title: 'Sumber Bank',
          value: ''
        })}
        {renderCardBody({
          title: 'Tanggal Terbit',
          value: formatDate('2021-08-10')
        })}
        {renderCardBody({
          title: 'Tanggal Jatuh Tempo',
          value: formatDate('2021-08-10')
        })}
        {renderCardBody({
          title: 'Jumlah Penagihan',
          value: MoneyFormatSpace(2000000)
        })}
        {renderCardBody({
          title: 'Materai',
          value: ''
        })}
        {renderCardBody({
          title: 'Foto Penagihan',
          value: ''
        })}
        {renderCardBody({
          title: 'Total Penagihan',
          value: MoneyFormatSpace(2000000)
        })}
        {renderCardBody({
          title: 'Sisa Penagihan',
          value: MoneyFormatSpace(2000000)
        })}
      </View>
    );
  };

  /**
   * RENDER COLLECTION DETAIL METHOD
   * @param {*} collectionMethodType
   * @returns
   */
  const renderCollectionDetailMethod = collectionMethodType => {
    if (
      collectionMethodType.code === 'check' ||
      collectionMethodType.code === 'giro'
    ) {
      return (
        <SfaCollectionDetailCheckandGiro data={dataSfaGetCollectionDetail} />
      );
    } else if (collectionMethodType.code === 'transfer') {
      return <SfaCollectionDetailTransfer data={dataSfaGetCollectionDetail} />;
    } else if (collectionMethodType.code === 'cash') {
      return renderCashDetail();
    } else if (collectionMethodType.code === 'promo') {
      return <SfaCollectionDetailPromo data={dataSfaGetCollectionDetail} />;
    }
  };

  /**
   * ==================================
   * RENDER INFORMATION SALESMAN HEADER
   * ==================================
   * @returns
   */
  const renderInfoSalesmanHeader = () => {
    return (
      <>
        {renderCardHeader({
          title: 'Informasi Salesman',
          renderCardBody: renderInfoSalesmanBody,
          boxStyle: { marginBottom: 16 }
        })}
      </>
    );
  };

  /**
   * ================================
   * RENDER INFORMATION SALESMAN BODY
   * ================================
   * @returns
   */
  const renderInfoSalesmanBody = () => {
    const detailSfa = dataSfaGetDetail.data;
    return (
      <>
        {renderCardBody({
          title: 'Kode Salesman',
          value: detailSfa.orderCode
        })}
        {renderCardBody({
          title: 'Name Salesman',
          value: detailSfa.orderRef === null || detailSfa.orderRef === ''
            ? '-'
            : detailSfa.orderRef
        })}
      </>
    );
  };

  /**
   * RENDER BILLING HISTORY BUTTON
   * @returns
   */
  const renderBillingHistoryButton = () => {
    return (
      <ButtonSingle
        disabled={
          dataSfaGetDetail.data.isPaid ||
          dataSfaGetDetail.data.remainingBilling === 0
        }
        title={'Lihat Daftar Pembayaran'}
        borderRadius={4}
        // onPress={() => addCollection()}
      />
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
        {renderInfoCodeHeader()}
        {renderCollectionDetailCardHeader()}
        {renderInfoSalesmanHeader()}
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
      {dataSfaGetCollectionDetail &&
      !loadingSfaGetCollectionDetail &&
      !loadingSfaDeleteCollection ? (
        <SafeAreaView style={styles.mainContainer}>
          {renderHeader()}
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
          {renderBillingHistoryButton()}
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
export default SfaCollectionDetailView;
