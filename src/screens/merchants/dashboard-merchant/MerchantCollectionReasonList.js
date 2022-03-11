import {
  React,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from '../../../library/reactPackage';
import { LoadingLoadMore } from '../../../components/Loading';
import { useSelector } from 'react-redux';
import SfaNoDataView from '../../sfa/SfaNoDataView';
import { MoneyFormatSpace, Fonts, GlobalStyle } from '../../../helpers';
import {
  OVERDUE,
  WAITING_FOR_PAYMENT
} from '../../../constants/paymentConstants';
import { toLocalTime } from '../../../helpers/TimeHelper';
import masterColor from '../../../config/masterColor.json';
import { MaterialIcon } from '../../../library/thirdPartyPackage';
import { ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS } from '../../../constants';

const MerchantCollectionReasonList = props => {
  const { refreshGetCollection, loadingLoadMoreGetSfa } = useSelector(
    state => state.sfa
  );
  /** RENDER FUNCTION */

  /** RENDER STATUS PAYMENT */
  /** === RENDER ITEM (STATUS PAYMENT) === */
  const renderItemStatusPayment = status_payment => {
    let textStyle = Fonts.type67;
    let colorStyle = masterColor.fontBlack05;
    let text = '';

    switch (status_payment) {
      case OVERDUE:
        textStyle = Fonts.type14;
        colorStyle = masterColor.fontRed10;
        text = 'Overdue';
        break;
      case WAITING_FOR_PAYMENT:
        textStyle = Fonts.type109p;
        colorStyle = masterColor.fontYellow10;
        text = 'Menunggu Pembayaran';
        break;
      default:
        break;
    }
    return (
      <View style={{ ...styles.view1Status, backgroundColor: colorStyle }}>
        <Text style={{ ...textStyle, textAlign: 'right' }}>{text}</Text>
      </View>
    );
  };

  /** RENDER ITEM FLATLIST */
  const renderItem = ({ item, index }) => {
    const dueDate = toLocalTime(item.dueDate, 'DD MMM YYYY');
    return (
      <View style={styles.listContainer}>
        <View>
          <View style={styles.view1}>
            <View style={{ flex: 1 }}>
              <Text style={Fonts.type48}>{item.invoiceGroupName}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              {renderItemStatusPayment(item.statusPayment)}
            </View>
          </View>
          <View style={GlobalStyle.lines} />
          <View style={styles.view2}>
            <View style={{ flex: 1 }}>
              <Text style={[Fonts.type17, { marginBottom: 8 }]}>
                Nomor Pesanan
              </Text>
              <Text style={Fonts.type17}>Jatuh Tempo</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={[Fonts.type17, { marginBottom: 8 }]}>
                {item.orderCode}
              </Text>
              <Text style={Fonts.type17}>{dueDate}</Text>
            </View>
          </View>
          <View style={GlobalStyle.lines} />
          <View style={styles.view3}>
            <View style={{ flex: 1 }}>
              <Text style={[Fonts.type17, { marginBottom: 8 }]}>
                Total Tagihan
              </Text>
              <Text style={Fonts.type50}>
                {MoneyFormatSpace(item?.invoiceAmount || 0)}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={[Fonts.type17, { marginBottom: 8 }]}>
                Sisa Tagihan
              </Text>
              <Text style={Fonts.type113p}>
                {MoneyFormatSpace(item?.outstandingAmount || 0)}
              </Text>
            </View>
          </View>
          <View style={GlobalStyle.lines} />
          <View>
            <View style={styles.reasonContainer}>
              <Text style={[Fonts.type8, { flex: 1 }]}> Alasan</Text>
              <TouchableOpacity
                onPress={() => props.openReason(index, item.id)}
                style={styles.reasonButton}
                disabled={
                  props.type === ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS
                    ? true
                    : false
                }
              >
                {item.reasonNotPay ? (
                  <Text style={[Fonts.type48]}>{item.reasonNotPay}</Text>
                ) : (
                  props?.navigateFrom === 'view-reason' 
                    ? <Text style={[Fonts.type48]}>{item.reasonNotPayView}</Text>
                    : <Text style={[Fonts.type85]}>Pilih Alasan</Text>
                )}
                {props.type ===
                ACTIVITY_JOURNEY_PLAN_COLLECTION_NOT_SUCCESS ? null : (
                  <MaterialIcon
                    name="chevron-right"
                    color={masterColor.mainColor}
                    size={24}
                  />
                )}
              </TouchableOpacity>
            </View>
            {item.reasonNotPay ? null : (
              <View style={styles.reasonAlert}>
                <Text style={[Fonts.type119]}>
                  Wajib Memilih Alasan Tidak Ada Penagihan
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };
  /** RENDER LOADING LOAD MORE */
  const renderLoadMore = () => {
    return loadingLoadMoreGetSfa ? (
      <View style={{ marginTop: 8 }}>
        <LoadingLoadMore />
      </View>
    ) : (
      <View />
    );
  };

  /** RENDER LIST */
  const renderData = () => {
    if (props.dataList) {
      return (
        <>
          <View style={styles.flatListContainer}>
            {props.dataList !== null ? (
              <FlatList
                data={props.dataList}
                extraData={props.extraData}
                renderItem={renderItem}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                refreshing={refreshGetCollection}
                // onRefresh={() => props.refersh()}
                onEndReachedThreshold={0.2}
                onEndReached={() => props.loadmore()}
                showsVerticalScrollIndicator
              />
            ) : (
              <View style={{ marginTop: '20%' }}>
                <SfaNoDataView
                  topText="Belum ada tagihan"
                  midText="Yuk belanja kebutuhanmu sekarang di Sinbad"
                  bottomText=""
                />
              </View>
            )}
          </View>
        </>
      );
    }
  };
  /** RENDER CONTENT */
  const renderContent = () => {
    return <>{renderData()}</>;
  };
  /** MAIN */
  return props.dataList?.length > 0 ? (
    <>
      {renderContent()}
      {renderLoadMore()}
    </>
  ) : (
    <View style={{ marginTop: '20%' }}>
      <SfaNoDataView
        topText={'Belum Ada Tagihan'}
        midText={'Yuk belanja kebutuhanmu sekarang di Sinbad'}
        bottomText={''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 16
  },
  listContainer: {
    marginBottom: 16,
    paddingTop: 20,
    paddingBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
    borderColor: masterColor.fontBlack10,
    borderWidth: 1,
    borderRadius: 8
  },
  view1: {
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row'
  },
  view1Status: {
    marginLeft: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  view2: {
    paddingVertical: 12,
    flexDirection: 'row'
  },
  view3: {
    paddingVertical: 12,
    flexDirection: 'row'
  },
  buttonDetail: {
    backgroundColor: masterColor.mainColor,
    height: 36,
    width: 66,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reasonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center'
  },
  reasonButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  reasonAlert: {
    backgroundColor: masterColor.fontYellow10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 8
  }
});
export default MerchantCollectionReasonList;
