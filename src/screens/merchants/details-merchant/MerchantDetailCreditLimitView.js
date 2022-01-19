import {
  React,
  View,
  Text,
  StyleSheet,
  Component,
  TouchableOpacity
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import { Color } from '../../../config';
import { Fonts, GlobalStyle } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
class MerchantDetailCreditLimitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    };
  }
  /** === RENDER INVOICE INFORMATION === */
  renderInvoiceInformation() {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        {this.renderInvoiceList()}
        {this.renderInvoiceList()}
      </View>
    );
  }
  /** === RENDER ICON SEE MORE === */
  renderIconSeeMore() {
    return this.state.showMore ? (
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
  renderInvoiceList() {
    return (
      <View style={styles.invoiceListContainer}>
        <View style={styles.listRow}>
          <View>
            <Text style={Fonts.type7}>Invoice Name</Text>
            <Text style={[Fonts.type104, { marginTop: 6 }]}>
              Limit: Rp50.000.000
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.setState({ showMore: !this.state.showMore })}
          >
            {this.renderIconSeeMore()}
          </TouchableOpacity>
        </View>
        {this.state.showMore ? this.renderInvoiceListFull() : null}
      </View>
    );
  }
  /** === RENDER INVOICE LIST FULL === */
  renderInvoiceListFull() {
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

          <Text style={Fonts.type16}>Ya</Text>
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

          <Text style={Fonts.type16}>Rp.100.000</Text>
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
      <View>
        {this.renderCreditInformation()}
        {this.renderInvoiceInformation()}
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
