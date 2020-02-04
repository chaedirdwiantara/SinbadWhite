import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Text from 'react-native-text';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import * as ActionCreators from '../../state/actions';
import GlobalStyle from '../../helpers/GlobalStyle';
import masterColor from '../../config/masterColor.json';
import Fonts from '../../helpers/GlobalFont';
import { StatusBarRed } from '../../components/StatusBarGlobal';
import ProductListType2 from '../../components/list/ProductListType2';
import Address from '../../components/Address';
import { MoneyFormat } from '../../helpers/NumberFormater';

class HistoryDetailStatusView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * =======================
   * FUNCTIONAL
   * =======================
   */
  /** CHECK STATUS */
  checkStatus() {
    let data = null;
    if (this.state.section === 'payment') {
      if (this.props.history.dataGetPaymentStatus !== null) {
        data = this.props.history.dataGetPaymentStatus.find(
          itemPayment =>
            itemPayment.status ===
            this.props.history.dataDetailHistory.statusPayment
        );
      }
    } else {
      if (this.props.history.dataGetOrderStatus !== null) {
        data = this.props.history.dataGetOrderStatus.find(
          itemOrder =>
            itemOrder.status === this.props.history.dataDetailHistory.status
        );
      }
    }
    return {
      title: data !== null ? data.title : '-',
      desc: data !== null ? data.detail : '-'
    };
  }
  /** CALCULATE TOTAL SKU */
  totalSKU() {
    let totalProduct = 0;
    this.props.history.dataDetailHistory.orderBrands.forEach(item => {
      item.orderBrandCatalogues.map(itemProduct => {
        totalProduct = totalProduct + itemProduct.qty;
      });
    });
    return totalProduct;
  }
  /** GO TO LOG */
  goToLog() {
    console.log('iaiaiaiai');
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER CONTENT LIST GLOBAL */
  renderContentListGlobal(key, value, green) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={green ? Fonts.type51 : Fonts.type17}>{key}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={Fonts.type17}>{value}</Text>
        </View>
      </View>
    );
  }
  /** RENDER ORDER DETAIL */
  renderOrderDetail() {
    return (
      <View style={[GlobalStyle.shadowForBox, { marginBottom: 16 }]}>
        <View
          style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
        >
          <Text style={Fonts.type48}>Tracking Pesanan</Text>
        </View>
        <View style={[GlobalStyle.lines, { marginHorizontal: 16 }]} />
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {this.renderContentListGlobal(
            'Nomor Pesanan',
            this.props.history.dataDetailHistory.orderCode
          )}
          {this.renderContentListGlobal(
            'Tanggal Pembelian',
            moment(
              new Date(this.props.history.dataDetailHistory.createdAt)
            ).format('DD MMM YYYY HH:mm:ss')
          )}
          {this.renderContentListGlobal('Nomor Resi', '-')}
        </View>
      </View>
    );
  }
  /** RENDER ORDER LOG CONTENT */
  renderOrderLogContent() {
    return (
      <View style={{ paddingHorizontal: 16, paddingBottom: 16, paddingTop: 8 }}>
        {this.props.history.dataDetailHistory.orderParcelLogs.map(
          (item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <View>
                  <View
                    style={index === 0 ? styles.circleRed : styles.circle}
                  />
                  <View
                    style={{
                      backgroundColor: masterColor.fontBlack10,
                      flex: 1,
                      width: 2,
                      marginLeft: 2
                    }}
                  />
                </View>
                <View
                  style={{ marginBottom: 15, marginLeft: 10, marginTop: -5 }}
                >
                  <Text style={Fonts.type10}>Detail</Text>
                  <Text style={[Fonts.type76, { marginTop: 5 }]}>
                    {moment(new Date(item.createdAt)).format(
                      'DD-MM-YYYY HH:mm:ss'
                    )}
                  </Text>
                </View>
              </View>
            );
          }
        )}
      </View>
    );
  }
  /** RENDER ORDER LOG */
  renderOrderLog() {
    return (
      <View style={[GlobalStyle.shadowForBox, { marginBottom: 16 }]}>
        <View
          style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 }}
        >
          <Text style={Fonts.type48}>Detail</Text>
        </View>
        <View
          style={[GlobalStyle.lines, { marginHorizontal: 16, marginBottom: 8 }]}
        />
        {this.renderOrderLogContent()}
      </View>
    );
  }
  /** MAIN */
  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBarRed />
        <ScrollView>
          {this.renderOrderDetail()}
          {this.renderOrderLog()}
          <View style={{ paddingBottom: 50 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: masterColor.backgroundWhite
  },
  circle: {
    backgroundColor: masterColor.fontBlack10,
    height: 6,
    width: 6,
    borderRadius: 10
  },
  circleRed: {
    backgroundColor: masterColor.mainColor,
    borderWidth: 2,
    height: 8,
    width: 8,
    marginLeft: -1,
    borderColor: masterColor.fontRed10,
    borderRadius: 10
  }
});

const mapStateToProps = ({ history }) => {
  return { history };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetailStatusView);
