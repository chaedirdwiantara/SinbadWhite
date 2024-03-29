import {
  React,
  Component,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text
} from '../../library/reactPackage'
import {
  bindActionCreators,
  moment,
  connect
} from '../../library/thirdPartyPackage'
import {
  StatusBarRed
} from '../../library/component'
import { GlobalStyle, Fonts } from '../../helpers'
import * as ActionCreators from '../../state/actions';
import masterColor from '../../config/masterColor.json';

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
  checkStatus(item) {
    let data = null;
    if (item.type === 'order') {
      if (this.props.history.dataGetOrderStatus !== null) {
        data = this.props.history.dataGetOrderStatus.find(
          itemOrder => itemOrder.status === item.status
        );
      }
    } else {
      if (this.props.history.dataGetPaymentStatus !== null) {
        data = this.props.history.dataGetPaymentStatus.find(
          itemPayment => itemPayment.status === item.status
        );
      }
    }
    return {
      title: data ? data.title : '-',
      desc: data ? data.detail : '-'
    };
  }
  /**
   * ========================
   * RENDER VIEW
   * =======================
   */
  /** RENDER CONTENT LIST GLOBAL */
  renderContentListGlobal(key, value) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8
        }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <Text style={Fonts.type17}>{key}</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={[Fonts.type17, { textAlign: 'right' }]}>{value}</Text>
        </View>
      </View>
    );
  }
  /** RENDER ORDER DETAIL */
  renderOrderDetail() {
    const { dataDetailHistory } = this.props.history
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
          { dataDetailHistory.orderCancelReason !== null ? (
            this.renderContentListGlobal('Alasan Pembatalan', dataDetailHistory.orderCancelReason.reason)
          ) : (
            <View />
          ) }
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
                  <Text style={Fonts.type10}>
                    {this.checkStatus(item).desc}
                  </Text>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryDetailStatusView);

/**
* ============================
* NOTES
* ============================
* createdBy: 
* createdDate: 
* updatedBy: Tatas
* updatedDate: 06072020
* updatedFunction:
* -> Refactoring Module Import
* 
*/
