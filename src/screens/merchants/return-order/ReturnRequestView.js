import {
  React,
  Component,
  View,
  Text,
  StyleSheet,
  height,
  TouchableOpacity
} from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage';
import { LoadingPage, EmptyData } from '../../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import ReturnRequestListView from './ReturnRequestListView';
import ModalManualInputQty from './ModalManualInputQty';
import ModalUpdatePrice from './ModalUpdatePrice';
import ModalReturnReasons from './ModalReturnReasons';

class ReturnRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openModalManualInputQty: false,
      openModalManualInputPrice: false,
      openModalReturnReasons: false,
      selectedData: null,
      returnLines: [],
      disabledConfirmationButton: true,
      localData: {}
    };
  }
  static navigationOptions = ({ navigation }) => {
    let orderCode = '';
    if (navigation.state.params) {
      orderCode = navigation.state.params.orderCode;
    }
    return {
      headerTitle: () => (
        <View>
          <Text style={[Fonts.type35, { color: Color.fontBlack80 }]}>
            {orderCode}
          </Text>
        </View>
      )
    };
  };

  componentDidMount() {
    this.loading(true);
    this.props.GetReturnDraftProcess({
      orderParcelId: this.props.navigation.state.params.orderParcelId
    });
    this.getReturnReason();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.oms.dataGetReturnDraft !== this.props.oms.dataGetReturnDraft
    ) {
      if (this.props.oms.dataGetReturnDraft !== null) {
        this.convertListToLocalState();
      }
    }
  }

  convertListToLocalState() {
    const productArray = [];
    this.props.oms.dataGetReturnDraft.returnParcelDraft.map((item, index) => {
      const reason = {
        id: null,
        reason: null
      };
      item.qty = 0;
      item.suggestedPrice = item.price;
      item.note = '';
      item.returnReason = reason;
      productArray.push(item);
    });
    const data = {
      orderCode: this.state.localData.orderCode,
      returnParcelDraft: productArray
    };
    this.setState({ localData: data, loading: false });
  }

  loading(status) {
    this.setState({ loading: status });
  }

  getReturnReason() {
    this.props.GetReturnReasonProcess();
  }

  parentFunction(data) {
    switch (data.type) {
      case 'ManualInput':
        this.setState({
          openModalManualInputQty: true,
          selectedData: data.data
        });
        break;
      case 'ChangeQty':
        this.updateQty(data.data);
        this.setState({ openModalManualInputQty: false });
        break;
      case 'ManualInputPrice':
        this.setState({
          openModalManualInputPrice: true,
          selectedData: data.data
        });
        break;
      case 'ChangePrice':
        this.updatePrice(data.data);
        this.setState({ openModalManualInputPrice: false });
        break;
      case 'GetReturnReasons':
        this.setState({
          openModalReturnReasons: true,
          selectedData: data.data
        });
        break;
      case 'SelectReason':
        this.updateReason(data.data);
        this.setState({ openModalReturnReasons: false });
        break;
      case 'addNote':
        this.updateNote(data.data);
        break;

      default:
        break;
    }
  }

  findIndex(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = listCatalogue.returnParcelDraft.findIndex(
      item => parseInt(item.catalogueId, 10) === parseInt(data.catalogueId, 10)
    );

    return indexCatalogue;
  }

  updateQty(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = this.findIndex(data);
    /** UPDATE QTY */
    if (data.qty > listCatalogue.returnParcelDraft[indexCatalogue].maxQty) {
      listCatalogue.returnParcelDraft[indexCatalogue].qty =
        listCatalogue.returnParcelDraft[indexCatalogue].maxQty;
    } else {
      listCatalogue.returnParcelDraft[indexCatalogue].qty = data.qty;
    }
    /** UPDATE LOCAL STATE */
    this.saveToReturnLines(listCatalogue.returnParcelDraft[indexCatalogue]);
    this.setState({
      localData: listCatalogue
    });
  }

  updatePrice(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = this.findIndex(data);

    /** UPDATED PRICE */
    listCatalogue.returnParcelDraft[indexCatalogue].price = data.price;

    /** UPDATE LOCAL STATE */
    this.saveToReturnLines(listCatalogue.returnParcelDraft[indexCatalogue]);
    this.setState({ localData: listCatalogue });
  }

  updateReason(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = this.findIndex(data);

    const reason = {
      id: data.reason.id,
      reason: data.reason.reason
    };

    listCatalogue.returnParcelDraft[indexCatalogue].returnReason = reason;

    /** UPDATE LOCAL STATE */
    this.saveToReturnLines(listCatalogue.returnParcelDraft[indexCatalogue]);
    this.setState({
      localData: listCatalogue
    });
  }

  updateNote(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = this.findIndex(data);

    listCatalogue.returnParcelDraft[indexCatalogue].note = data.note;

    /** UPDATE LOCAL STATE */
    this.saveToReturnLines(listCatalogue.returnParcelDraft[indexCatalogue]);
    this.setState({ localData: listCatalogue });
  }

  saveToReturnLines(data) {
    const returnLines = this.state.returnLines;

    /** Transform Data */
    const transformData = {
      orderBrandCatalogueId: data.catalogueId,
      qty: data.qty,
      unitPrice: data.price,
      returnReasonId: data.returnReason.id,
      note: data.note
    };

    /** Find existing catalogue on Return Lines */
    const returnLinesIndex = returnLines.findIndex(
      item =>
        parseInt(item.orderBrandCatalogueId, 10) ===
        parseInt(data.catalogueId, 10)
    );

    /** Logic for Add Return Lines or
     * Replace existing data with the updated one
     * */
    if (returnLinesIndex > -1) {
      if (parseInt(transformData.qty, 10) === 0) {
        returnLines.splice(returnLinesIndex, 1);
      } else {
        returnLines[returnLinesIndex] = transformData;
      }
    } else {
      returnLines.push(transformData);
    }

    this.setState({ returnLines });
  }

  checkReturnLines() {
    const returnLines = this.state.returnLines;

    if (returnLines.length > 0) {
      const checkReturnReason = returnLines.some(
        item => item.returnReasonId === null
      );
      return checkReturnReason;
    } else {
      return true;
    }
  }

  renderListData() {
    return (
      <View style={styles.mainContainer}>
        <ReturnRequestListView
          data={this.state.localData}
          onRef={ref => (this.parentFunction = ref)}
          parentFunction={this.parentFunction.bind(this)}
        />
      </View>
    );
  }

  renderButton() {
    return (
      <TouchableOpacity
        style={{
          padding: 12,
          backgroundColor: this.checkReturnLines()
            ? Color.fontRed10
            : Color.fontRed50,
          borderRadius: 8
        }}
        disabled={this.checkReturnLines()}
        onPress={() => console.log('Confirmation')}
      >
        <Text style={Fonts.textButtonSmallRedActive}>Konfirmasi Retur</Text>
      </TouchableOpacity>
    );
  }

  /** ===> RENDER TOTAL BOTTOM VALUE === */
  renderBottomValue() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.boxBottomValue}>
          <View style={{ marginBottom: 8 }}>
            <Text>
              <Text style={Fonts.type9}>Total: </Text>
              <Text style={Fonts.type53}>{MoneyFormat(10000)}</Text>
            </Text>
          </View>
          <View>
            <Text style={Fonts.type74}>Total Produk 4 SKU</Text>
          </View>
        </View>
      </View>
    );
  }

  renderBottomSection() {
    return (
      <View style={[styles.boxTotalPrice, GlobalStyle.shadowForBox10]}>
        <View style={{ flex: 1 }}>{this.renderBottomValue()}</View>
        <View style={{ flex: 0, marginRight: 4 }}>{this.renderButton()}</View>
      </View>
    );
  }

  renderLoadingPage() {
    return <LoadingPage />;
  }

  renderContent() {
    return this.props.oms.loadingGetReturnDraft || this.state.loading
      ? this.renderLoadingPage()
      : this.renderBody();
  }

  renderBody() {
    return this.props.oms.dataGetReturnDraft !== null ? (
      <View style={styles.mainContainer}>
        {this.renderListData()}
        {this.renderBottomSection()}
      </View>
    ) : (
      <EmptyData />
    );
  }

  /**
   * ===================
   * MODAL
   * ===================
   */
  renderModalManualInputQty() {
    return this.state.openModalManualInputQty ? (
      <ModalManualInputQty
        open={this.state.openModalManualInputQty}
        close={() => this.setState({ openModalManualInputQty: false })}
        data={this.state.selectedData}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        title={'Jumlah Retur'}
      />
    ) : (
      <View />
    );
  }

  renderModalUpdatePrice() {
    return this.state.openModalManualInputPrice ? (
      <ModalUpdatePrice
        open={this.state.openModalManualInputPrice}
        close={() => this.setState({ openModalManualInputPrice: false })}
        data={this.state.selectedData}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        title={'Harga Retur'}
      />
    ) : (
      <View />
    );
  }

  renderModalReturnReasons() {
    return this.state.openModalReturnReasons &&
      this.props.oms.dataGetReturnReason !== null ? (
      <ModalReturnReasons
        open={this.state.openModalReturnReasons}
        close={() => this.setState({ openModalReturnReasons: false })}
        data={this.state.selectedData}
        returnReasons={this.props.oms.dataGetReturnReason}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        title={'Alasan Retur'}
      />
    ) : (
      <View />
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        {this.renderContent()}
        {/* MODAL */}
        {this.renderModalManualInputQty()}
        {this.renderModalUpdatePrice()}
        {this.renderModalReturnReasons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  boxTotalPrice: {
    flexDirection: 'row',
    paddingVertical: 11,
    paddingLeft: 20,
    paddingRight: 10,
    height: 63
  },
  /** bottom bar */
  boxBottomValue: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignContent: 'center',
    paddingRight: 10
  }
});

const mapStateToProps = ({ oms }) => {
  return { oms };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReturnRequestView);
