/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Image
} from '../../library/reactPackage';
import {
  LoadingPage,
  ButtonSingle,
  StatusBarBlackOP40,
  ModalBottomWithClose
} from '../../library/component';
import { GlobalStyle, MoneyFormatSpace } from '../../helpers';
import { toLocalTime } from '../../helpers/TimeHelper';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  sfaGetCollectionDetailProcess,
  sfaGetPaymentCollectionLogProcess
} from '../../state/actions';
import {
  APPROVED,
  REJECTED,
  PENDING,
  TRANSFER,
  CASH,
  CHECK,
  GIRO,
  RETUR,
  PROMO
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';
import { CardBody, CardHeader, CardHeaderBadge } from './components/CardView';

const { height } = Dimensions.get('window');
const isNumber = n => (n !== null && n !== undefined ? true : false);

const SfaCollectionDetailView = props => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [stateModalImage, setStateModalImage] = useState({
    open: false,
    source: null,
    title: ''
  });

  const {
    dataSfaGetCollectionDetail,
    loadingSfaGetCollectionDetail,
    dataSfaGetCollectionImage,
    loadingSfaGetCollectionImage,
    selectedStore
  } = useSelector(state => state.sfa);
  const { selectedMerchant } = useSelector(state => state.merchant);
  const { id } = useSelector(state => state.user);
  const userId = parseInt(id, 10);

  /** === ON REFRESH === */
  const onRefresh = () => {
    getCollectionDetail();
    /** SET PAGE REFRESH */
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 10);
  };

  /** NAVIGATE TO BILLING LOG */
  const navigateToBillingLog = () => {
    NavigationService.navigate('SfaBillingLogView', {
      collectionId: dataSfaGetCollectionDetail.data.id,
      paymentCollectionTypeId:
        dataSfaGetCollectionDetail.data.paymentCollectionType.id
    });
    const data = {
      paymentCollectionMethodId: dataSfaGetCollectionDetail.data.id,
      limit: 20,
      storeId: parseInt(selectedStore?.id || selectedMerchant?.storeId, 10),
      skip: 0,
      loading: true,
      userId: userId
    };
    dispatch(sfaGetPaymentCollectionLogProcess(data));
  };
  /**
   * *********************************
   * FUNCTION
   * *********************************
   */

  const getCollectionDetail = () => {
    const paymentCollectionId =
      props.navigation.state.params.paymentCollectionId;
    dispatch(sfaGetCollectionDetailProcess(paymentCollectionId));
  };

  const formatDate = date => {
    return date ? toLocalTime(date, 'DD MMM YYYY') : '-';
  };

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  /**
   * ==============================
   * RENDER CODE INFORMATION HEADER
   * ==============================
   */
  const renderCodeInfoHeader = () => {
    const { paymentCollectionType } = dataSfaGetCollectionDetail.data;
    return paymentCollectionType?.id !== RETUR ? (
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
    ) : null;
  };

  /**
   * ============================
   * RENDER CODE INFORMATION BODY
   * ============================
   */
  const renderCodeInfoBody = () => {
    const collectionDetail = dataSfaGetCollectionDetail.data;

    return (
      <>
        {CardBody({
          title: 'Kode Penagihan',
          value: collectionDetail?.collectionCode || '-',
          styleCardView: styles.styleCardView
        })}
        {collectionDetail?.paymentCollectionType?.id !== PROMO
          ? CardBody({
              title: 'Kode Penagihan Ref',
              value: collectionDetail?.collectionRef || '-',
              styleCardView: styles.styleCardView
            })
          : null}
      </>
    );
  };

  /**
   * ========================================
   * RENDER COLLECTION INFO CARD HEADER BADGE
   * ========================================
   */
  const renderCollectionInfoHeaderBadge = () => {
    const { approvalStatus } = dataSfaGetCollectionDetail.data;

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
   * =============================
   * RENDER COLLECTION INFO HEADER
   * =============================
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
          renderCardHeaderBadge: renderCollectionInfoHeaderBadge,
          renderCardBody: renderCollectionInfoBody
        })}
      </>
    );
  };

  /**
   * ===========================
   * RENDER COLLECTION INFO BODY
   * ===========================
   */
  const renderCollectionInfoBody = () => {
    const {
      createdDate,
      paymentCollectionType,
      reference,
      bankFrom,
      bankToAccount,
      issuedDate,
      dueDate,
      amount,
      stamp,
      totalAmount,
      totalBalance
    } = dataSfaGetCollectionDetail.data;
    const image = dataSfaGetCollectionImage?.data.image;
    const skpImage = dataSfaGetCollectionImage?.data.skpImage;
    return (
      <>
        {CardBody({
          title: 'Tanggal Penagihan',
          value: formatDate(createdDate),
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Metode Penagihan',
          value: paymentCollectionType?.name,
          styleCardView: styles.styleCardView
        })}
        {paymentCollectionType.id !== CASH &&
        paymentCollectionType.id !== RETUR &&
        paymentCollectionType.id !== PROMO
          ? CardBody({
              title: 'Nomor Referensi',
              value: reference,
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id !== CASH &&
        paymentCollectionType.id !== RETUR &&
        paymentCollectionType.id !== PROMO
          ? CardBody({
              title: 'Sumber Bank',
              value: bankFrom.displayName,
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id === TRANSFER
          ? CardBody({
              title: 'Bank Tujuan',
              value: `${bankToAccount?.bank?.name} - ${
                bankToAccount?.accountNo
              }`,
              styleCardView: {
                ...styles.styleCardView,
                marginBottom: 0
              }
            })
          : null}
        {paymentCollectionType.id === TRANSFER
          ? CardBody({
              title: '',
              value: bankToAccount?.description,
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id === TRANSFER
          ? CardBody({
              title: 'Tanggal Transfer',
              value: formatDate(issuedDate),
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id === CHECK || paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Tanggal Terbit',
              value: formatDate(issuedDate),
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id === CHECK || paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Tanggal Jatuh Tempo',
              value: formatDate(dueDate),
              styleCardView: styles.styleCardView
            })
          : null}
        {CardBody({
          title:
            paymentCollectionType.id === PROMO
              ? 'Nilai Penagihan'
              : 'Jumlah Penagihan',
          value: isNumber(amount) ? MoneyFormatSpace(amount) : '',
          styleCardView: styles.styleCardView
        })}
        {paymentCollectionType.id === CHECK || paymentCollectionType.id === GIRO
          ? CardBody({
              title: 'Materai',
              value: isNumber(stamp?.nominal)
                ? MoneyFormatSpace(stamp.nominal)
                : '-',
              styleCardView: styles.styleCardView
            })
          : null}
        {paymentCollectionType.id !== RETUR
          ? CardBody({
              title: 'Foto Penagihan',
              loadingImage: loadingSfaGetCollectionImage,
              imageSource: { uri: `data:image/jpeg;base64, ${image}` },
              imageContainerStyle: styles.imageContainerStyle,
              imageSourceStyle: styles.imageSourceStyle,
              imageBackgroundStyle: styles.imageBackgroundStyle,
              styleCardView: styles.styleCardViewImage,
              onPressImage: () =>
                setStateModalImage({
                  source: image,
                  title: 'Foto Penagihan',
                  open: true
                })
            })
          : null}
        {paymentCollectionType.id === PROMO
          ? CardBody({
              title: 'Surat Kerjasama Promosi',
              loadingImage: loadingSfaGetCollectionImage,
              imageSource: { uri: `data:image/jpeg;base64, ${skpImage}` },
              imageContainerStyle: styles.imageContainerStyle,
              imageSourceStyle: styles.imageSourceStyle,
              imageBackgroundStyle: styles.imageBackgroundStyle,
              styleCardView: styles.styleCardViewImage,
              onPressImage: () =>
                setStateModalImage({
                  source: skpImage,
                  title: 'Surat Kerjasama Promosi',
                  open: true
                })
            })
          : null}
        {CardBody({
          title: 'Total Penagihan',
          value: isNumber(totalAmount) ? MoneyFormatSpace(totalAmount) : '',
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Sisa Penagihan',
          value: isNumber(totalBalance) ? MoneyFormatSpace(totalBalance) : '',
          styleCardView: styles.styleCardView
        })}
      </>
    );
  };

  /**
   * ==================================
   * RENDER INFORMATION SALESMAN HEADER
   * ==================================
   */
  const renderSalesmanInfoHeader = () => {
    return (
      <>
        {CardHeader({
          title: 'Informasi Salesman',
          styleContainer: styles.container,
          styleCard: {
            ...styles.cardTaskList,
            ...GlobalStyle.shadowForBox5,
            marginBottom: 16
          },
          styleCardView: styles.styleCardView,
          renderCardBody: renderSalesmanInfoBody
        })}
      </>
    );
  };

  /**
   * ================================
   * RENDER INFORMATION SALESMAN BODY
   * ================================
   */
  const renderSalesmanInfoBody = () => {
    const collectionDetail = dataSfaGetCollectionDetail.data;

    return (
      <>
        {CardBody({
          title: 'Kode Salesman',
          value: collectionDetail.salesmanCode,
          styleCardView: styles.styleCardView
        })}
        {CardBody({
          title: 'Nama Salesman',
          value: collectionDetail.salesmanName,
          styleCardView: styles.styleCardView
        })}
      </>
    );
  };

  /** CONTENT MODAL IMAGE */
  const contentModalImage = () => {
    return (
      <View style={{ flex: 1, maxnHeight: (80 / 100) * height }}>
        <StatusBarBlackOP40 />
        <Image
          source={{ uri: `data:image/jpeg;base64, ${stateModalImage.source}` }}
          style={styles.modalImage}
        />
      </View>
    );
  };

  /** RENDER MODAL IMAGE */
  const renderModalImage = () => {
    return (
      <ModalBottomWithClose
        open={stateModalImage.open}
        title={stateModalImage.title}
        close={() => setStateModalImage({ ...stateModalImage, open: false })}
        content={contentModalImage()}
      />
    );
  };

  /**
   * RENDER BILLING HISTORY BUTTON
   * @returns
   */
  const renderBillingHistoryButton = () => {
    return (
      <>
        <View style={[GlobalStyle.lines, styles.footerLine]} />
        <ButtonSingle
          title={'Lihat Riwayat Pembayaran'}
          borderRadius={4}
          onPress={() => navigateToBillingLog()}
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
        {renderCodeInfoHeader()}
        {renderCollectionInfoHeader()}
        {renderSalesmanInfoHeader()}
      </View>
    );
  };

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      {!loadingSfaGetCollectionDetail && dataSfaGetCollectionDetail ? (
        <>
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
          {renderModalImage()}
        </>
      ) : (
        <LoadingPage />
      )}
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
  },
  footerLine: {
    shadowColor: masterColor.shadow,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 1
  },
  imageContainerStyle: {
    backgroundColor: 'white',
    marginTop: -16,
    marginBottom: 16,
    height: 138,
    width: '100%'
  },
  imageSourceStyle: {
    resizeMode: 'cover',
    width: '100%',
    height: 138,
    backgroundColor: 'white'
  },
  imageBackgroundStyle: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000000c0',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  modalImage: {
    resizeMode: 'stretch',
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 16,
    height: (50 / 100) * height
  },
  styleCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  styleCardViewImage: {
    flex: 1
  }
});
export default SfaCollectionDetailView;
