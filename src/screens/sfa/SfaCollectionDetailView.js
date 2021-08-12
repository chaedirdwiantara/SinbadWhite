import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
  Image
} from '../../library/reactPackage';
import { MaterialIcon, Tooltip } from '../../library/thirdPartyPackage';
import { LoadingPage, ButtonSingle } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import { toLocalTime } from '../../helpers/TimeHelper';
import masterColor from '../../config/masterColor.json';
import { useDispatch, useSelector } from 'react-redux';
import { sfaGetCollectionDetailProcess } from '../../state/actions';
import {
  APPROVED,
  REJECTED,
  PENDING,
  TRANSFER_CODE,
  TUNAI_CODE,
  CEK_CODE,
  GIRO_CODE
} from '../../constants/collectionConstants';
import NavigationService from '../../navigation/NavigationService';

const { width } = Dimensions.get('window');

const SfaCollectionDetailView = props => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(null);

  const {
    dataSfaGetCollectionDetail,
    loadingSfaGetCollectionDetail
  } = useSelector(state => state.sfa);

  /** === ON REFRESH === */
  const onRefresh = () => {
    getCollectionDetail();
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
    getCollectionDetail();
  }, []);

  const getCollectionDetail = () => {
    const paymentCollectionId = props.navigation.state.params.paymentCollectionId;
    dispatch(sfaGetCollectionDetailProcess(paymentCollectionId));
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
            <Text style={Fonts.type5}>Detail Penagihan</Text>
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
              {renderTooltip(items)}
            </View>
          ) : (
            <Text style={Fonts.type17}>{items.title}</Text>
          )}
          <Text style={Fonts.type17}>{items.value}</Text>
        </View>
        {items.imageSource ? (
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
        ) : null}
      </>
    );
  };

  /**
   * RENDER TOOLTIP
   * @returns
   */
  const renderTooltip = items => {
    return (
      <>
        <Tooltip
          backgroundColor={masterColor.fontBlack50OP80}
          height={55}
          withOverlay={false}
          withPointer={false}
          onOpen={() => setOpenTooltip({ [items.title]: false })}
          onClose={() => setOpenTooltip({ [items.title]: true })}
          containerStyle={{
            padding: 8,
            width: 0.4 * width
          }}
          popover={
            <Text style={Fonts.type87}> {items.tooltip?.tooltipText} </Text>
          }
        >
          {openTooltip ? (
            <MaterialIcon
              name="help"
              style={{ marginLeft: 6 }}
              size={13}
              color={masterColor.mainColor}
            />
          ) : (
            <View />
          )}
        </Tooltip>
      </>
    );
  };

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
    const collectionDetail = dataSfaGetCollectionDetail.data;

    return (
      <>
        {renderCardBody({
          title: 'Kode Penagihan',
          value: collectionDetail.collectionCode
        })}
        {renderCardBody({
          title: 'Kode Penagihan Ref',
          value: collectionDetail.collectionRef
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
    const collectionDetail = dataSfaGetCollectionDetail.data;

    return collectionDetail.approvalStatus === APPROVED
      ? renderBadge({
          title: 'Disetujui',
          backgroundColor: masterColor.fontGreen10,
          textColor: masterColor.fontGreen50
        })
      : collectionDetail.approvalStatus === PENDING
      ? renderBadge({
          title: 'Menunggu',
          backgroundColor: masterColor.fontYellow10,
          textColor: masterColor.fontYellow50
        })
      : collectionDetail.approvalStatus === REJECTED
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
    const collectionDetail = dataSfaGetCollectionDetail.data;
    const tooltipData =
      collectionDetail.paymentCollectionType.code === CEK_CODE
        ? { tooltipText: 'Foto Penagihan' }
        : null;

    return (
      <>
        {renderCardBody({
          title: 'Tanggal Penagihan',
          value: formatDate('2020-08-20')
        })}
        {renderCardBody({
          title: 'Metode Penagihan',
          value: collectionDetail.paymentCollectionType.name
        })}
        {collectionDetail.paymentCollectionType.code !== TUNAI_CODE
          ? renderCardBody({
              title: 'Nomor Referensi',
              value: collectionDetail.reference
            })
          : null}
        {collectionDetail.paymentCollectionType.code !== TUNAI_CODE
          ? renderCardBody({
              title: 'Sumber Bank',
              value: collectionDetail.bankFrom.displayName
            })
          : null}
        {collectionDetail.paymentCollectionType.code === TRANSFER_CODE
          ? renderCardBody({
              title: 'Bank Tujuan',
              value: collectionDetail.bankToAccount.displayName
            })
          : null}
        {collectionDetail.paymentCollectionType.code === TRANSFER_CODE
          ? renderCardBody({
              title: 'Tanggal Transfer',
              value: collectionDetail.transferDate
            })
          : null}
        {collectionDetail.paymentCollectionType.code === CEK_CODE ||
        collectionDetail.paymentCollectionType.code === GIRO_CODE
          ? renderCardBody({
              title: 'Tanggal Terbit',
              value: formatDate(collectionDetail.issuedDate)
            })
          : null}
        {collectionDetail.paymentCollectionType.code === CEK_CODE ||
        collectionDetail.paymentCollectionType.code === GIRO_CODE
          ? renderCardBody({
              title: 'Tanggal Jatuh Tempo',
              value: formatDate(collectionDetail.dueDate)
            })
          : null}
        {renderCardBody({
          title: 'Jumlah Penagihan',
          value: MoneyFormatSpace(collectionDetail.amount)
        })}
        {collectionDetail.paymentCollectionType.code === CEK_CODE ||
        collectionDetail.paymentCollectionType.code === GIRO_CODE
          ? renderCardBody({
              title: 'Materai',
              value: MoneyFormatSpace(collectionDetail.stamp.nominal)
            })
          : null}
        {renderCardBody({
          title: 'Foto Penagihan',
          value: '',
          tooltip: tooltipData,
          imageSource: collectionDetail.image
        })}
        {renderCardBody({
          title: 'Total Penagihan',
          value: MoneyFormatSpace(collectionDetail.totalAmount)
        })}
        {renderCardBody({
          title: 'Sisa Penagihan',
          value: MoneyFormatSpace(collectionDetail.balance)
        })}
      </>
    );
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
    const collectionDetail = dataSfaGetCollectionDetail.data;

    return (
      <>
        {renderCardBody({
          title: 'Kode Salesman',
          value: collectionDetail.salesmanCode
        })}
        {renderCardBody({
          title: 'Name Salesman',
          value: collectionDetail.salesmanName
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
        // disabled={
        //   dataSfaGetDetail.data.isPaid ||
        //   dataSfaGetDetail.data.remainingBilling === 0
        // }
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
      {dataSfaGetCollectionDetail && !loadingSfaGetCollectionDetail ? (
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
  },
  smallContainerImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginBottom: 16
  },
  images: {
    width: width - 65,
    height: 138,
    borderWidth: 1,
    backgroundColor: 'white'
  }
});
export default SfaCollectionDetailView;
