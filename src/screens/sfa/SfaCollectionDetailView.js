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
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  InputType5,
  ModalConfirmation,
  ToastType1
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import { toLocalTime } from '../../helpers/TimeHelper';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { TextInputMask } from 'react-native-masked-text';

import SfaCollectionDetailCheckandGiro from './SfaCollectionDetailCheckandGiro';
import SfaCollectionDetailTransfer from './SfaCollectionDetailTransfer';
import SfaCollectionDetailPromo from './SfaCollectionDetailPromo';
import {
  sfaGetCollectionDetailProcess,
  sfaDeleteCollectionProcess,
  sfaGetCollectionLogProcess
} from '../../state/actions';
import { APPROVED, REJECTED, PENDING } from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';

const SfaCollectionDetailView = props => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false)
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
  const [isShowEditSuccessToast, setIsShowEditSuccessToast] = useState(false)
  const [
    isModalDeleteTransactionOpened,
    setIsModalDeleteTransactionOpened
  ] = useState(false);

  //USEREF
  const prevDataSfaDeleteCollectionRef = useRef(dataSfaDeleteCollection);
  const prevDataSfaGetCollectionLogRef = useRef(dataSfaGetCollectionLog);
  const prevDataSfaEditCollectionRef = useRef(dataSfaEditCollection);

   /** === ON REFRESH === */
   const onRefresh = () => {
    getCollectionDetail()
    /** SET PAGE REFRESH */
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 10);
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
 getCollectionDetail()
  }, []);

  const getCollectionDetail = () => {
    const paymentCollectionId =
    props.navigation.state.params.paymentCollectionId;
    dispatch(sfaGetCollectionDetailProcess(paymentCollectionId));
  }

  const formatDate = date => {
    const local = toLocalTime(date);
    return moment(local).format('DD MMMM YYYY');
  };

  const deleteTransaction = () => {
    setIsModalDeleteTransactionOpened(true);
  };

  const editTransaction = () => {
    NavigationService.navigate('SfaEditCollectionView', {
      dataDetail: dataSfaGetCollectionDetail
    });
  };

  const deleteCollection = () => {
    const paymentCollectionId =
      props.navigation.state.params.paymentCollectionId;
    setIsModalDeleteTransactionOpened(false);
    dispatch(sfaDeleteCollectionProcess(paymentCollectionId));
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
        setIsShowEditSuccessToast(true)
        setTimeout(() => {
          setIsShowEditSuccessToast(false)
        }, 3000);
      }
    }
  }, [dataSfaEditCollection]);
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
            <Text style={Fonts.type5}>Detail Transaksi</Text>
          </View>
          { dataSfaGetCollectionDetail && dataSfaGetCollectionDetail.isEditable ?
            (
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
            ) : null
          }

        </View>
        <View style={[GlobalStyle.lines, styles.headerLine]} />
      </View>
    );
  };

  /**
   * ======================
   * MODAL
   * ======================
   */
  const renderModalDeleteTransaction = () => {
    return (
      <View>
        {isModalDeleteTransactionOpened ? (
          <ModalConfirmation
            statusBarWhite
            title={'Hapus Transaksi?'}
            open={isModalDeleteTransactionOpened}
            content={
              dataSfaGetCollectionDetail.paymentCollection.isPrimary 
              ? 'Transaksi dengan nomor referensi yang sama juga akan terhapus'
              : 'Transaksi yang telah terhapus tidak dapat dikembalikan'
            }
            type={'okeNotRed'}
            okText={'Ya, Hapus'}
            cancelText={'Tidak'}
            ok={() => {
              deleteCollection();
            }}
            cancel={() => setIsModalDeleteTransactionOpened(false)}
          />
        ) : (
          <View />
        )}
      </View>
    );
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

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

  const renderCollectionInfo = () => {
    const detailSfa = dataSfaGetDetail.data;
    return (
      <View style={styles.container}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View>
            <Text style={Fonts.type48}>Informasi Tagihan</Text>
          </View>
          <View style={[GlobalStyle.lines, { flex: 1, marginVertical: 8 }]} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={Fonts.type17}>Sisa Tagihan</Text>
            <Text style={Fonts.type100}>
              {MoneyFormatSpace(dataSfaGetCollectionDetail.outstanding)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderCollectionDetail = () => {
    const paymentCollectionMethod =
      dataSfaGetCollectionDetail.paymentCollection.paymentCollectionMethod;
    return (
      <View style={[styles.container, { marginBottom: 16 }]}>
        <View style={[styles.cardTaskList, GlobalStyle.shadowForBox5]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View>
              <Text style={Fonts.type48}>Detil Penagihan</Text>
            </View>
            {paymentCollectionMethod.approvalStatus === APPROVED ? (
              <View
                style={{
                  backgroundColor: masterColor.fontGreen10,
                  borderRadius: 30
                }}
              >
                <Text
                  style={[
                    Fonts.type38,
                    { margin: 8, color: masterColor.fontGreen50 }
                  ]}
                >
                  Disetujui
                </Text>
              </View>
            ) : paymentCollectionMethod.approvalStatus === PENDING ? (
              <View
                style={{
                  backgroundColor: masterColor.fontYellow10,
                  borderRadius: 30
                }}
              >
                <Text
                  style={[
                    Fonts.type38,
                    { margin: 8, color: masterColor.fontYellow50 }
                  ]}
                >
                  Menunggu
                </Text>
              </View>
            ) : paymentCollectionMethod.approvalStatus === REJECTED ? (
              <View
                style={{
                  backgroundColor: masterColor.fontRed10,
                  borderRadius: 30
                }}
              >
                <Text
                  style={[
                    Fonts.type38,
                    { margin: 4, color: masterColor.fontRed50 }
                  ]}
                >
                  Ditolak
                </Text>
              </View>
            ) : null}
          </View>
          <View style={[{ flex: 1, marginVertical: 8 }]} />
          {renderItemCollectionDetail()}
        </View>
      </View>
    );
  };

  const renderItemCollectionDetail = () => {
    const collectionMethodType =
      dataSfaGetCollectionDetail.paymentCollection.paymentCollectionMethod
        .paymentCollectionType;
    return (
      <View style={{ marginHorizontal: -16 }}>
        <InputType5
          title={`Metode Penagihan`}
          placeholder={collectionMethodType.name}
          editable={false}
        />
        {renderCollectionDetailMethod(collectionMethodType)}
      </View>
    );
  };

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

  const renderCashDetail = () => {
    return (
      <View style={{ marginTop: 16, marginHorizontal: 16 }}>
        <View>
          <Text style={Fonts.type10}>Jumlah Penagihan</Text>
        </View>
        <View
          style={[
            styles.boxInput,
            { flexDirection: 'row', alignItems: 'center' }
          ]}
        >
          <TextInputMask
            editable={false}
            type={'money'}
            options={{
              precision: 0,
              separator: ',',
              delimiter: '.',
              unit: 'Rp ',
              suffixUnit: ''
            }}
            value={
              dataSfaGetCollectionDetail.paymentCollection
                .paidByCollectionMethod
            }
            style={[
              Fonts.type31,
              {
                width: '100%',
                borderBottomWidth: 1,
                borderBottomColor: masterColor.fontBlack10
              }
            ]}
          />
        </View>
      </View>
    );
  };

  const renderToast = () => {
    return isShowEditSuccessToast ? (
      <ToastType1 margin={70} content={'Transaksi Berhasil Diubah'} />
    ) : (
      <View />
    );
  }

  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {dataSfaGetCollectionDetail && !loadingSfaGetCollectionDetail && !loadingSfaDeleteCollection ? (
          <ScrollView  refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={()=>onRefresh()}
            />
          } style={{ flex: 1, height: '100%' }}>
            {renderFakturInfo()}
            {renderCollectionInfo()}
            {renderCollectionDetail()}
          </ScrollView>
        ) : (
          <LoadingPage />
        )}
      </View>
    );
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {renderHeader()}
        {renderContent()}
        {renderModalDeleteTransaction()}
        {renderToast()}
      </View>
    </>
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
  }
});
export default SfaCollectionDetailView;
