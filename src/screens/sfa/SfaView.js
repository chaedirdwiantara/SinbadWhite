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
  TagListType2
} from '../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../helpers';
import masterColor from '../../config/masterColor.json';
import NavigationService from '../../navigation/NavigationService';
import * as ActionCreators from '../../state/actions';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';

function SfaView(props) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
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
        orderCode: 'S0100042273101076686',
        orderRef: 'SNB1812/0002134',
        total: 670000,
        debtDate: '25-02-2021',
        overdue: '27-02-2021',
        paidAmount: 0
      },
      {
        orderCode: 'S0213042273101076686',
        orderRef: 'SNB1815/0002135',
        total: 700000,
        debtDate: '26-02-2021',
        overdue: '28-02-2021',
        paidAmount: 0
      },
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

  /**
   * *********************************
   * RENDER VIEW
   * *********************************
   */

  const renderBody = () => {
    return (
      <View>
        <Text>Body</Text>
      </View>
    );
  };
  /** === TAGS SECTION === */
  const renderTagsContent = () => {
    return (
      <View>
        <TagListType2
          selected={selectedTagStatus}
          // onRef={ref => (this.parentFunction = ref)}
          // parentFunction={this.parentFunction.bind(this)}
          data={sfaTag}
        />
        <View style={GlobalStyle.lines} />
      </View>
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
        {renderBody()}
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
  }
});

const mapStateToProps = ({ user, merchant }) => {
  return { user, merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SfaView);
// export default DMSView;
