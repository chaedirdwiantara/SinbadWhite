import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image
} from '../../library/reactPackage';

import {
  bindActionCreators,
  connect,
  MaterialIcon,
  moment
} from '../../library/thirdPartyPackage';
import {
  LoadingPage,
  StatusBarWhite,
  SearchBarType1,
  TagListType2,
  SkeletonType2,
  SkeletonType25
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import { useDispatch, useSelector } from 'react-redux';
import SfaCollectionListView from './SfaCollectionListView';
import { ScrollView } from 'react-native-gesture-handler';
import {
  sfaGetCollectionListProcess,
  sfaGetCollectionStatusProcess
} from '../../state/actions/SfaAction';

function SfaView(props) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const {
    loadingGetCollectionStatus,
    dataGetCollectionStatus,
    loadingGetCollectionList,
    dataGetCollectionList
  } = useSelector(state => state.sfa);
  const [sfaTag, setSfaTag] = useState([
    { status: '', title: 'Semua', detail: '' },
    {
      status: 'waiting_for_payment',
      title: 'Menunggu Pembayaran',
      detail: 'Sedang Menunggu Pembayaran'
    },
    { status: 'overdue', title: 'Overdue', detail: 'Pesanan Sudah Overdue' }
  ]);
  const [selectedTagStatus, setSelectedTagStatus] = useState('semua');
  const [data, setData] = useState({
    data: [
      {
        id: 3832,
        invoice: 'COMBINE',
        orderCode: 'S0100042273101076686',
        orderRef: 'SNB1812/0002134',
        total: 670000,
        debtDate: '2020-09-03T08:32:10.932Z',
        overdue: '2020-10-03T08:32:10.932Z',
        paidAmount: 0,
        paymentStatus: 'waiting_for_payment'
      },
      {
        id: 3832,
        invoice: 'TIGA RAKSA #2',
        orderCode: 'S0213042273101076686',
        orderRef: 'SNB1815/0002135',
        total: 700000,
        debtDate: '26-02-2021',
        overdue: '28-02-2021',
        paidAmount: 0,
        paymentStatus: 'overdue'
      },
      {
        id: 3832,
        invoice: 'TIGA RAKSA #2',
        orderCode: 'S0213042273101076686',
        orderRef: 'SNB1815/0002135',
        total: 700000,
        debtDate: '26-02-2021',
        overdue: '28-02-2021',
        paidAmount: 0,
        paymentStatus: 'waiting_for_payment'
      },
      {
        id: 3832,
        invoice: 'TIGA RAKSA #2',
        orderCode: 'S0213042273101076686',
        orderRef: 'SNB1815/0002135',
        total: 700000,
        debtDate: '26-02-2021',
        overdue: '28-02-2021',
        paidAmount: 0,
        paymentStatus: 'overdue'
      }
    ],
    totalInvoice: 3,
    invoiceAmount: 1625000,
    totalAmountPaid: 335000,
    outstanding: 1675000
  });
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  useEffect(() => {
    getCollectionStatus();
    getCollectionList();
  }, []);

  const getCollectionStatus = () => {
    dispatch(sfaGetCollectionStatusProcess());
  };

  const getCollectionList = () => {
    const data = {
      limit: 20,
      storeId: 2,
      supplierId: 2,
      keyword: '',
      statusPayment: ''
    };
    dispatch(sfaGetCollectionListProcess(data));
  };
  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  const renderCollectionList = () => {
    return <SfaCollectionListView data={data} />;
  };
  /** === RENDER SKELETON TAGS === */
  const renderSkeletonTags = () => {
    return (
      <View>
        <SkeletonType2 />
        <View style={GlobalStyle.lines} />
      </View>
    );
  };
  /** === TAGS SECTION === */
  const renderTagsContent = () => {
    const status = dataGetCollectionStatus;
    return (
      <>
        {!loadingGetCollectionStatus && dataGetCollectionStatus ? (
          <>
            <TagListType2
              selected={selectedTagStatus}
              // onRef={ref => (this.parentFunction = ref)}
              // parentFunction={this.parentFunction.bind(this)}
              data={status.data}
            />
            <View style={GlobalStyle.lines} />
          </>
        ) : (
          renderSkeletonTags()
        )}
      </>
    );
  };
  /** === RENDER FOOTER === */
  const renderFooter = () => {
    const data = dataGetCollectionList;
    return (
      <>
        <View style={GlobalStyle.lines} />
        <View style={styles.footer}>
          {!loadingGetCollectionList && dataGetCollectionList ? (
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.footer1}>
                <View style={[styles.footerText, { marginBottom: 4 }]}>
                  <Text style={Fonts.type44}>Total Faktur: </Text>
                  <Text style={Fonts.type108p}>{data.data.totalInvoice}</Text>
                </View>
                <View style={styles.footerText}>
                  <Text style={Fonts.type44}>Jumlah Faktur: </Text>
                  <Text style={Fonts.type108p}>
                    {MoneyFormat(data.data.totalInvoiceAmount)}
                  </Text>
                </View>
              </View>
              <View style={styles.footer1}>
                <View style={[styles.footerText, { marginBottom: 4 }]}>
                  <Text style={Fonts.type44}>Total Terbayar: </Text>
                  <Text style={Fonts.type108p}>
                    {MoneyFormat(data.data.totalAmountPaid)}
                  </Text>
                </View>
                <View style={styles.footerText}>
                  <Text style={Fonts.type44}>Sisa Tagihan: </Text>
                  <Text style={Fonts.type108p}>
                    {MoneyFormat(data.data.totalOutstandingAmount)}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <SkeletonType25 />
          )}
        </View>
      </>
    );
  };
  /**
   * ==================================
   * RENDER CONTENT DATA (MAIN VIEW)
   * ==================================
   */
  const renderContent = () => {
    return (
      <View style={{ flex: 1 }}>
        {renderSearchAndFilter()}
        {renderTagsContent()}
        <ScrollView>{renderCollectionList()}</ScrollView>

        {renderFooter()}
      </View>
    );
  };

  /** === RENDER FILTER AND SEARCH === */
  const renderSearchAndFilter = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <SearchBarType1
              placeholder={'Cari produk, nomor pesanan'}
              searchText={searchText}
              // onRef={ref => (this.parentFunction = ref)}
              // parentFunction={this.parentFunction.bind(this)}
            />
          </View>
          <TouchableOpacity
            style={{ paddingRight: 16, justifyContent: 'center' }}
            onPress={() => console.log('clicked')}
          >
            {/* {this.state.portfolioId.length > 0 ||
            this.state.dateFilter.dateGte !== '' ||
            this.state.dateFilter.dateLte !== '' ? (
              <View style={styles.circleFilter} />
            ) : (
              <View />
            )
             } */}

            <Image
              source={require('../../assets/icons/pdp/filter.png')}
              style={{ height: 24, width: 24 }}
            />
            <Text style={Fonts.type67}>Filter</Text>
          </TouchableOpacity>
        </View>
        <View style={GlobalStyle.lines} />
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
      {/* {props.merchant.dataGetMerchantDetail ? ( */}
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarWhite />
        <View style={{ flex: 1 }}>{renderContent()}</View>
      </SafeAreaView>
      {/* ) : (
        <LoadingPage />
      )} */}
    </>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16
    // display: 'flex',
    // flexDirection: 'row'
  },
  footer1: {
    flex: 1
  },
  footerText: {
    display: 'flex',
    flexDirection: 'row'
  }
});

export default SfaView;
// export default DMSView;
