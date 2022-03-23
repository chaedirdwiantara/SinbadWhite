import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList
} from '../../library/reactPackage';
import { useDispatch } from 'react-redux';
import { LoadingLoadMore } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormatSpace } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import SfaNoDataView from './SfaNoDataView';
import { useSelector } from 'react-redux';
import { toLocalTime } from '../../helpers/TimeHelper';
import {
  collectionTransactionSelected,
  sfaGetDetailProcess
} from '../../state/actions';

function SfaInvoiceListView(props) {
  const dispatch = useDispatch();
  const { loadingLoadMoreGetSfa, refreshGetCollection } = useSelector(
    state => state.sfa
  );
  /**
   * =======================
   * RENDER FUNCTION
   * =======================
   */
  const checkpayment = item => {
    const data = props.status.data.find(
      itemPayment => itemPayment.status === item
    );
    if (data) {
      return data.title;
    } else {
      return '';
    }
  };

  const statusPayment = item => {
    return props.status !== null ? checkpayment(item) : '';
  };

  /**
   * =======================
   * RENDER VIEW
   * =======================
   */
  const renderData = () => {
    if (props.dataList) {
      const dataOrderParcels = props.dataList?.data?.orderParcels || [];
      return (
        <>
          <View style={styles.flatListContainer}>
            {dataOrderParcels.length > 0 ? (
              <FlatList
                data={props.dataList.data.orderParcels}
                renderItem={renderItem}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                refreshing={refreshGetCollection}
                onRefresh={() => props.refersh()}
                onEndReachedThreshold={0.2}
                onEndReached={() => props.loadmore()}
                showsVerticalScrollIndicator
              />
            ) : (
              <View style={{ marginTop: '20%' }}>
                {props.searchText !== '' ? (
                  <SfaNoDataView />
                ) : (
                  <SfaNoDataView
                    topText="Belum ada tagihan"
                    midText="Yuk belanja kebutuhanmu sekarang di Sinbad"
                    bottomText=""
                  />
                )}
              </View>
            )}
          </View>
        </>
      );
    }
  };

  const renderLoadMore = () => {
    return loadingLoadMoreGetSfa ? (
      <View style={{ marginTop: 8 }}>
        <LoadingLoadMore />
      </View>
    ) : (
      <View />
    );
  };

  const navigateToDetail = item => {
    dispatch(
      collectionTransactionSelected({
        collectionTransactionId: item.collectionTransactionDetailId
      })
    );
    dispatch(sfaGetDetailProcess(item.id));
    NavigationService.navigate('SfaDetailView', {
      orderParcelId: item.id
    });
  };
  /** === RENDER ITEM (STATUS PAYMENT) === */
  const renderItemStatusPayment = status_payment => {
    let textStyle = Fonts.type67;
    let colorStyle = masterColor.fontBlack05;
    switch (status_payment) {
      case 'overdue':
        textStyle = Fonts.type14;
        colorStyle = masterColor.fontRed10;
        break;
      case 'waiting_for_payment':
        textStyle = Fonts.type109p;
        colorStyle = masterColor.fontYellow10;
        break;
      default:
        break;
    }
    return (
      <View style={{ ...styles.view1Status, backgroundColor: colorStyle }}>
        <Text style={{ ...textStyle, textAlign: 'right' }}>
          {statusPayment(status_payment)}
        </Text>
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    const dueDate = toLocalTime(item.dueDate, 'DD MMM YYYY');

    return (
      <View style={styles.listContainer}>
        <TouchableOpacity onPress={() => navigateToDetail(item)}>
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

  /**
   * =======================
   * MAIN
   * =======================
   */
  return (
    <>
      {renderData()}
      {renderLoadMore()}
    </>
    // renderSkeleton()
  );
}

export default SfaInvoiceListView;

const styles = StyleSheet.create({
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
  flatListContainer: {
    padding: 16
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
