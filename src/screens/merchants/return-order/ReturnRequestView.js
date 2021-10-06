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
import {
  LoadingPage,
  EmptyData,
  ErrorPage,
  ModalBottomErrorRespons
} from '../../../library/component';
import { Fonts, GlobalStyle, MoneyFormat } from '../../../helpers';
import { Color } from '../../../config';
import * as ActionCreators from '../../../state/actions';
import ReturnRequestListView from './ReturnRequestListView';
import ModalManualInputQty from './ModalManualInputQty';
import ModalUpdatePrice from './ModalUpdatePrice';
import ModalReturnReasons from './ModalReturnReasons';
import ModalReturnSummary from './ModalReturnSummary';
import ModalReturnConfirmation from './ModalReturnConfirmation';

class ReturnRequestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      openModalManualInputQty: false,
      openModalManualInputPrice: false,
      openModalReturnReasons: false,
      openModalReturnSummary: false,
      openModalReturnConfirmation: false,
      openModalResponseError: false,
      selectedData: null,
      returnLines: [],
      disabledConfirmationButton: true,
      localData: {},
      dataConfirmation: [],
      returnedConfirmation: null,
      showInfo: false,
      orderParcelId: this.props.navigation.state.params.orderParcelId
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

    if (
      prevProps.oms.errorGetReturnDraft !== this.props.oms.errorGetReturnDraft
    ) {
      if (this.props.oms.errorGetReturnDraft !== null) {
        this.loading(false);
      }
    }

    if (
      prevProps.oms.errorPostReturnOrder !== this.props.oms.errorPostReturnOrder
    ) {
      if (this.props.oms.errorPostReturnOrder !== null) {
        this.openModalResponseError();
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

  openModalResponseError() {
    this.setState({
      openModalResponseError: true,
      openModalReturnSummary: false
    });
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
      case 'ConfirmationCancel':
        this.setState({ openModalReturnSummary: false });
        break;
      case 'ConfirmationContinue':
        if (this.state.returnedConfirmation === null) {
          this.setState({ showInfo: true });
        } else {
          this.confirmReturnOrder();
        }
        break;
      case 'openModalConfirmation':
        this.setState({
          openModalReturnConfirmation: true,
          openModalReturnSummary: false
        });
        break;
      case 'SelectConfirmation':
        this.setState({
          showInfo: false,
          returnedConfirmation: data.data,
          openModalReturnSummary: true
        });
        break;

      default:
        break;
    }
  }

  confirmReturnOrder() {
    const data = {
      orderParcelId: parseInt(this.state.orderParcelId, 10),
      returns: this.state.returnLines,
      returned: this.state.returnedConfirmation
    };

    console.log('Confirm Return Order', data);
    console.log(JSON.stringify(data));

    this.props.PostReturnOrderProcess(data);
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
    const dataConfirmation = this.state.dataConfirmation;
    const returnLines = this.state.returnLines;

    /** Transform Data */
    const transformData = {
      orderBrandCatalogueId: parseInt(data.catalogueId, 10),
      qty: parseInt(data.qty, 10),
      unitPrice: parseInt(data.price, 10),
      returnReasonId:
        data.returnReason.id === null
          ? null
          : parseInt(data.returnReason.id, 10),
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
        dataConfirmation.splice(returnLinesIndex, 1);
      } else {
        returnLines[returnLinesIndex] = transformData;
        dataConfirmation[returnLinesIndex] = data;
      }
    } else {
      returnLines.push(transformData);
      dataConfirmation.push(data);
    }

    console.log('Data Order Lines', returnLines);
    console.log('Data Confirmation', dataConfirmation);

    this.setState({ returnLines, dataConfirmation });
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

  checkGrandTotalPrice() {
    let grandTotalPrice = 0;
    this.state.returnLines.map(item => {
      grandTotalPrice += item.qty * item.unitPrice;
    });
    return grandTotalPrice;
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
        onPress={() => this.setState({ openModalReturnSummary: true })}
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
              <Text style={Fonts.type53}>
                {MoneyFormat(this.checkGrandTotalPrice())}
              </Text>
            </Text>
          </View>
          <View>
            <Text style={Fonts.type74}>
              Total Produk {this.state.returnLines.length} SKU
            </Text>
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
    ) : this.props.oms.errorGetReturnDraft !== null ? (
      <ErrorPage
        title={
          this.props.oms.errorGetReturnDraft.data?.errorCode === 'ERR-LIMIT'
            ? 'Order Sudah Melebihi Batas Waktu'
            : 'Terjadi Kesalahan'
        }
        description={
          this.props.oms.errorGetReturnDraft.data?.errorCode === 'ERR-LIMIT'
            ? 'Silahkan pilih order lainnya'
            : 'Silahkan mencoba kembali'
        }
      />
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

  renderModalReturnSummary() {
    return this.state.openModalReturnSummary ? (
      <ModalReturnSummary
        open={this.state.openModalReturnSummary}
        close={() =>
          this.setState({
            openModalReturnSummary: false,
            openModalReturnConfirmation: false
          })
        }
        data={this.state.dataConfirmation}
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        title={'Konfirmasi Retur'}
        showInfo={this.state.showInfo}
        returnInfo={this.state.returnedConfirmation}
      />
    ) : (
      <View />
    );
  }

  renderModalReturnConfirmation() {
    return this.state.openModalReturnConfirmation ? (
      <ModalReturnConfirmation
        open={this.state.openModalReturnConfirmation}
        close={() =>
          this.setState({
            openModalReturnConfirmation: false,
            openModalReturnSummary: true
          })
        }
        onRef={ref => (this.parentFunction = ref)}
        parentFunction={this.parentFunction.bind(this)}
        title={'Barang sudah dibawa?'}
      />
    ) : (
      <View />
    );
  }

  renderModalResponseError() {
    return this.state.openModalResponseError ? (
      <ModalBottomErrorRespons
        statusBarType={'transparent'}
        open={this.state.openModalResponseError}
        onPress={() =>
          this.setState({
            openModalResponseError: false,
            openModalReturnSummary: true
          })
        }
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
        {this.renderModalReturnSummary()}
        {this.renderModalReturnConfirmation()}
        {this.renderModalResponseError()}
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
