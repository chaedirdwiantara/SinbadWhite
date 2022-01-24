import {
  React,
  View,
  Text,
  StyleSheet,
  Component,
  TouchableOpacity,
  ScrollView
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import { Color } from '../../../config';
import { Fonts, GlobalStyle, MoneyFormat } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import { indexOf } from 'lodash';

const dummy = {
  total: 7,
  limit: 3,
  skip: 0,
  data: [
    {
      id: 1,
      storeId: 1,
      invoiceGroupId: 1,
      invoiceGroupName: 'Combine',
      creditLimit: 99000000000000.0,
      balanceAmount: 98870623985367.8,
      freezeStatus: true,
      allowCreditLimit: true,
      termOfPayment: 14
    },
    {
      id: 2,
      storeId: 1,
      invoiceGroupId: 1,
      invoiceGroupName: 'PT Tigaraksa',
      creditLimit: 990000000000.0,
      balanceAmount: 98870623985367.8,
      freezeStatus: false,
      allowCreditLimit: true,
      termOfPayment: 14
    },
    {
      id: 3,
      storeId: 1,
      invoiceGroupId: 1,
      invoiceGroupName: 'Exclusive Danone',
      creditLimit: 1000000000000.0,
      balanceAmount: 200000000.8,
      freezeStatus: false,
      allowCreditLimit: true,
      termOfPayment: 14
    }
  ]
};
class MerchantDetailCreditLimitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      indexShow: []
    };
  }
  /** === FUNCTION ON SEE MORE */
  onOpenToogle(index) {
    const listArray = this.state.indexShow;
    if (listArray.indexOf(index) === -1) {
      listArray.push(index);
    } else if (listArray.indexOf(index) > -1) {
      listArray.splice(listArray.indexOf(index), 1);
    }
    this.setState({ indexShow: listArray });
  }
  /** === SEE MORE STATUS */
  seeMoreStatus(index) {
    const listIndex = this.state.indexShow;
    let condition = false;
    if (listIndex.indexOf(index) === -1) {
      condition = false;
    } else if (listIndex.indexOf(index) > -1) {
      condition = true;
    }
    return condition;
  }

  /** === RENDER INVOICE INFORMATION === */
  renderInvoiceInformation() {
    return dummy.data.map((item, index) => {
      return (
        <View style={{ paddingHorizontal: 16 }}>
          {this.renderInvoiceList(item, index)}
        </View>
      );
    });
  }
  /** === RENDER ICON SEE MORE === */
  renderIconSeeMore(index) {
    const condition = this.seeMoreStatus(index);
    return condition ? (
      <MaterialIcon
        name="keyboard-arrow-up"
        size={30}
        color={Color.fontBlack50}
      />
    ) : (
      <MaterialIcon
        name="keyboard-arrow-down"
        size={30}
        color={Color.fontBlack50}
      />
    );
  }
  /** === RENDER INVOICE LIST === */
  renderInvoiceList(item, index) {
    const condition = this.seeMoreStatus(index);
    return (
      <View style={styles.invoiceListContainer}>
        <View style={styles.listRow}>
          <View>
            <Text style={Fonts.type7}>{item.invoiceGroupName}</Text>
            <Text style={[Fonts.type104, { marginTop: 6 }]}>
              Limit: {MoneyFormat(item.creditLimit)}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.onOpenToogle(index)}>
            {this.renderIconSeeMore(index)}
          </TouchableOpacity>
        </View>
        {condition ? this.renderInvoiceListFull(item, index) : null}
      </View>
    );
  }
  /** === RENDER INVOICE LIST FULL === */
  renderInvoiceListFull(item, index) {
    return (
      <View style={{ marginTop: 16 }}>
        <View
          style={[
            styles.listRow,
            {
              marginTop: 6
            }
          ]}
        >
          <Text style={Fonts.type9}>Kredit</Text>

          <Text style={Fonts.type16}>
            {item.allowCreditLimit && item.freezeStatus ? 'Ya' : 'Tidak'}
          </Text>
        </View>
        <View
          style={[
            styles.listRow,
            {
              marginTop: 6
            }
          ]}
        >
          <Text style={Fonts.type9}>Balance</Text>

          <Text style={Fonts.type16}>{MoneyFormat(item.balanceAmount)}</Text>
        </View>
        <View
          style={[
            styles.listRow,
            {
              marginTop: 6
            }
          ]}
        >
          <Text style={Fonts.type9}>Account Receivable</Text>
          <Text style={Fonts.type16}>Rupiah</Text>
        </View>
      </View>
    );
  }
  /** === RENDER CREDIT INFORMATION === */
  renderCreditInformation() {
    return (
      <View style={{ padding: 16, backgroundColor: Color.fontWhite }}>
        <Text style={Fonts.type5}>Kredit Saat ini</Text>
        <View style={[GlobalStyle.lines, { marginTop: 8 }]} />
        <View
          style={[
            styles.listRow,
            {
              marginTop: 8,
              marginBottom: 4
            }
          ]}
        >
          <Text style={Fonts.type9}>Total Balance</Text>
          <Text style={Fonts.type16}>Rp100.000</Text>
        </View>
        <View
          style={[
            styles.listRow,
            {
              marginTop: 4,
              marginBottom: 4
            }
          ]}
        >
          <Text style={Fonts.type9}>Total Limit</Text>
          <Text style={Fonts.type9}>Rp200.000</Text>
        </View>
      </View>
    );
  }
  /** === CONTENT === */
  renderContent() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderCreditInformation()}
        <ScrollView style={{ marginBottom: 16 }}>
          {this.renderInvoiceInformation()}
        </ScrollView>
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={{ backgroundColor: Color.fontBlack10, height: '100%' }}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  invoiceListContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Color.fontWhite,
    borderRadius: 5
  }
});

const mapStateToProps = ({ merchant }) => {
  return { merchant };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantDetailCreditLimitView);
