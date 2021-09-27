import {
  React,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from '../../../library/reactPackage';
import SfaNoDataView from '../../sfa/SfaNoDataView';
import { MoneyFormatSpace, Fonts, GlobalStyle } from '../../../helpers';
import {
  OVERDUE,
  WAITING_FOR_PAYMENT
} from '../../../constants/paymentConstants';
import { toLocalTime } from '../../../helpers/TimeHelper';
import masterColor from '../../../config/masterColor.json';
const MerchantCollectionReasonList = props => {
  /** RENDER FUNCTION */

  /** RENDER STATUS PAYMENT */
  /** === RENDER ITEM (STATUS PAYMENT) === */
  const renderItemStatusPayment = status_payment => {
    console.log(status_payment);
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
        <TouchableOpacity>
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
                {MoneyFormatSpace(item.invoiceAmount)}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={[Fonts.type17, { marginBottom: 8 }]}>
                Sisa Tagihan
              </Text>
              <Text style={Fonts.type113p}>
                {MoneyFormatSpace(item.outstandingAmount)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  /** RENDER LIST */
  const renderData = () => {
    if (props.dataList) {
      return (
        <>
          <View style={styles.flatListContainer}>
            {props.dataList.data.orderParcels !== null ? (
              <FlatList
                data={props.dataList.data.orderParcels}
                renderItem={renderItem}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                // refreshing={refreshGetCollection}
                // onRefresh={() => props.refersh()}
                onEndReachedThreshold={0.2}
                // onEndReached={() => props.loadmore()}
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
  return <>{renderContent()}</>;
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
    paddingTop: 12,
    flexDirection: 'row'
  },
  buttonDetail: {
    backgroundColor: masterColor.mainColor,
    height: 36,
    width: 66,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default MerchantCollectionReasonList;
