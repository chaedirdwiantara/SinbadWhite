import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList
} from '../../library/reactPackage';
import { LoadingLoadMore } from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import { moment } from '../../library/thirdPartyPackage';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import SfaNoDataView from './SfaNoDataView';
import { useSelector } from 'react-redux';

function SfaInvoiceListView(props) {
  const { loadingLoadMoreGetSfa, refreshGetCollection } = useSelector(state => state.sfa);
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
      return (
        <>
          <View style={styles.flatListContainer}>
            {props.dataList.data.orderParcels !== null ? (
              <FlatList
                data={props.dataList.data.orderParcels}
                renderItem={renderItem}
                //   numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                  refreshing={refreshGetCollection}
                  onRefresh={()=>props.refersh()}
                onEndReachedThreshold={0.2}
                onEndReached={() => props.loadmore()}
                showsVerticalScrollIndicator
              />
            ) : (
              <View style={{ marginTop: '20%' }}>
                <SfaNoDataView />
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

  const renderItem = ({ item, index }) => {
    const delivery = moment(new Date(item.deliveredDate)).format('Do MMM YYYY');
    const dueDate = moment(new Date(item.dueDate)).format('Do MMM YYYY');
    return (
      <View style={styles.listContainer}>
        <View style={styles.view1}>
          <View style={{ flex: 1 }}>
            <Text style={Fonts.type48}>{item.invoiceGroupName}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={[Fonts.type22, { marginBottom: 8 }]}>
              {statusPayment(item.statusPayment)}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={Fonts.type17}>Total: </Text>
              <Text style={Fonts.type37}>
                {MoneyFormat(item.invoiceAmount)}
              </Text>
            </View>
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        <View style={styles.view2}>
          <View style={{ flex: 1 }}>
            <Text style={[Fonts.type17, { marginBottom: 8 }]}>
              {item.orderCode}
            </Text>
            <Text style={Fonts.type17}>{item.orderRef}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={[Fonts.type17, { marginBottom: 8 }]}>{delivery}</Text>
            {/* <Text style={Fonts.type17}>{item.orderRef}</Text> */}
            <View style={{ flexDirection: 'row' }}>
              <Text style={item.statusPayment === 'overdue'? Fonts.type22 : Fonts.type17}>Jatuh Tempo: </Text>
              <Text style={item.statusPayment === 'overdue'? Fonts.type22 : Fonts.type17}>{dueDate}</Text>
            </View>
          </View>
        </View>
        <View style={GlobalStyle.lines} />
        <View style={styles.view3}>
          <View style={{ flex: 1 }}>
            <Text style={[Fonts.type17, { marginBottom: 8 }]}>
              Sisa Tagihan
            </Text>
            <Text style={Fonts.type113p}>
              {MoneyFormat(item.outstandingAmount)}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={styles.buttonDetail}
              onPress={() =>
                NavigationService.navigate('SfaDetailView', {
                  orderParcelId: item.id
                })
              }
            >
              <Text style={Fonts.type94}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 9,
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
