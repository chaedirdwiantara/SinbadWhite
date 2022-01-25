import {
  React,
  View,
  Text,
  StyleSheet,
  Component,
  TouchableOpacity,
  ScrollView,
  FlatList
} from '../../../library/reactPackage';
import {
  bindActionCreators,
  connect,
  MaterialIcon
} from '../../../library/thirdPartyPackage';
import { Color } from '../../../config';
import { Fonts, GlobalStyle, MoneyFormat } from '../../../helpers';
import * as ActionCreators from '../../../state/actions';
import { SkeletonType29 } from '../../../library/component';
class MerchantDetailCreditLimitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      indexShow: [],
      limit: 6
    };
  }

  componentDidMount() {
    const data = {
      storeId: 231632,
      supplierId: 1,
      skip: 0,
      limit: this.state.limit,
      loading: true
    };
    this.props.merchantGetCreditLimitListReset();
    this.props.merchantGetCreditLimitListProcess(data);
  }
  /** LOAD MORE LIST VIEW */
  onHandleLoadMore = () => {
    if (this.props.merchant.dataGetCreditLimitList) {
      if (
        this.props.merchant.dataGetCreditLimitList.length <
        this.props.merchant.totalDataGetCreditLimitList
      ) {
        const skip = this.props.merchant.skipGetCreditLimit + this.state.limit;
        this.props.merchantGetCreditLimitListLoadMore(skip);
        this.props.merchantGetCreditLimitListProcess({
          loading: false,
          skip,
          limit: this.state.limit,
          storeId: 231632,
          supplierId: 1,
          loading: false
        });
      }
    }
  };
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
    const dataCreditLimit = this.props.merchant.dataGetCreditLimitList;
    return (
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        data={dataCreditLimit}
        renderItem={this.renderInvoiceList.bind(this)}
        keyExtractor={(item, index) => index.toString()}
        refreshing={this.props.merchant.refreshGetCreditLimitList}
        onRefresh={() => console.log('resfresh')}
        onEndReachedThreshold={0.1}
        onEndReached={() => this.onHandleLoadMore()}
        // ItemSeparatorComponent={this.renderSeparator}
      />
    );
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
  renderInvoiceList({ item, index }) {
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
        {this.renderInvoiceInformation()}
      </View>
    );
  }
  /** === MAIN === */
  render() {
    return (
      <View style={{ backgroundColor: Color.fontBlack10, height: '100%' }}>
        {!this.props.merchant.loadingGetCreditLimitList ? (
          this.renderContent()
        ) : (
          <SkeletonType29 />
        )}
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
