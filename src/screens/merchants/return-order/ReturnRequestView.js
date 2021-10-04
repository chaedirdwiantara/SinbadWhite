import {
  React,
  Component,
  View,
  Text,
  StyleSheet
} from '../../../library/reactPackage';
import {
  connect,
  bindActionCreators
} from '../../../library/thirdPartyPackage';
import { LoadingPage } from '../../../library/component';
import { Fonts } from '../../../helpers';
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
      localData: {
        orderCode: 'S01000452400341847316',
        returnParcelDraft: [
          {
            catalogueId: 1,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 90000,
            maxQty: 80
          },
          {
            catalogueId: 2,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 10000,
            maxQty: 10
          },
          {
            catalogueId: 3,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 90000,
            maxQty: 20
          },
          {
            catalogueId: 4,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 10000,
            maxQty: 30
          },
          {
            catalogueId: 5,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 90000,
            maxQty: 11
          },
          {
            catalogueId: 6,
            catalogueName: 'Cip - Kornet Sapi Merah 700GR - Rasa Sapi Panggang',
            imageUrl:
              'https://sinbad-website.s3.amazonaws.com/odoo_img/product/115808.png',
            price: 10000,
            maxQty: 17
          }
        ]
      },
      returnReasons: [
        {
          id: '4',
          reason: 'Out of stock ',
          description: 'Out of stock ',
          showOnMobile: false,
          showOnAgentApp: true,
          createdAt: '2021-08-02T07:38:34.957Z',
          updatedAt: '2021-08-18T04:33:24.924Z',
          deletedAt: null
        },
        {
          id: '5',
          reason:
            'To make sure that the device arrives in its original condition, package and send it using the label and instructions from the Google Store support email.  If you’re returning multiple items, package a',
          description:
            'To make sure that the device arrives in its original condition, package and send it using the label and instructions from the Google Store support email.\n\nIf you’re returning multiple items, package a',
          showOnMobile: true,
          showOnAgentApp: true,
          createdAt: '2021-08-08T11:52:02.588Z',
          updatedAt: '2021-08-09T06:37:50.736Z',
          deletedAt: null
        },
        {
          id: '13',
          reason: 'ttt',
          description: 'tttt',
          showOnMobile: true,
          showOnAgentApp: true,
          createdAt: '2021-08-16T05:45:31.059Z',
          updatedAt: '2021-08-16T05:45:31.059Z',
          deletedAt: null
        },
        {
          id: '14',
          reason: 'TRS',
          description: 'TRS',
          showOnMobile: true,
          showOnAgentApp: true,
          createdAt: '2021-08-16T05:46:31.894Z',
          updatedAt: '2021-08-16T05:46:31.894Z',
          deletedAt: null
        },
        {
          id: '15',
          reason: 'KKK ',
          description: 'JJJJ',
          showOnMobile: true,
          showOnAgentApp: true,
          createdAt: '2021-08-16T05:47:33.596Z',
          updatedAt: '2021-08-16T05:47:33.596Z',
          deletedAt: null
        },
        {
          id: '17',
          reason: 'Barang Hilang',
          description: 'Barang yang dipesan hilang di Warehouse',
          showOnMobile: false,
          showOnAgentApp: true,
          createdAt: '2021-08-18T03:32:28.941Z',
          updatedAt: '2021-08-18T03:32:28.941Z',
          deletedAt: null
        },
        {
          id: '18',
          reason: 'The merchant shipped the wrong item',
          description: 'The merchant shipped the wrong item',
          showOnMobile: true,
          showOnAgentApp: true,
          createdAt: '2021-08-18T04:25:07.368Z',
          updatedAt: '2021-08-18T04:25:07.368Z',
          deletedAt: null
        }
      ]
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
    this.convertListToLocalState();
    setTimeout(() => this.setState({ loading: false }), 500);
  }

  convertListToLocalState() {
    const productArray = [];
    this.state.localData.returnParcelDraft.map((item, index) => {
      const reason = {
        id: null,
        reason: null
      };
      item.qty = 0;
      item.suggestedPrice = item.price;
      item.note = null;
      item.returnReason = reason;
      productArray.push(item);
    });
    const data = {
      orderCode: this.state.localData.orderCode,
      returnParcelDraft: productArray
    };
    this.setState({ localData: data });
  }

  getReturnReason() {
    return null;
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
        console.log(data);
        this.updateNote(data.data);
        break;

      default:
        break;
    }
  }

  updateQty(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = listCatalogue.returnParcelDraft.findIndex(
      item => parseInt(item.catalogueId, 10) === parseInt(data.catalogueId, 10)
    );
    /** UPDATE QTY */
    if (data.qty > listCatalogue.returnParcelDraft[indexCatalogue].maxQty) {
      listCatalogue.returnParcelDraft[indexCatalogue].qty =
        listCatalogue.returnParcelDraft[indexCatalogue].maxQty;
    } else {
      listCatalogue.returnParcelDraft[indexCatalogue].qty = data.qty;
    }
    /** UPDATE LOCAL STATE */
    this.setState({ localData: listCatalogue });
  }

  updatePrice(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = listCatalogue.returnParcelDraft.findIndex(
      item => parseInt(item.catalogueId, 10) === parseInt(data.catalogueId, 10)
    );

    /** UPDATED PRICE */
    listCatalogue.returnParcelDraft[indexCatalogue].price = data.price;

    /** UPDATE LOCAL STATE */
    this.setState({ localData: listCatalogue });
  }

  updateReason(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = listCatalogue.returnParcelDraft.findIndex(
      item => parseInt(item.catalogueId, 10) === parseInt(data.catalogueId, 10)
    );

    const reason = {
      id: data.reason.id,
      reason: data.reason.reason
    };

    listCatalogue.returnParcelDraft[indexCatalogue].returnReason = reason;

    this.setState({ localData: listCatalogue });
  }

  updateNote(data) {
    const listCatalogue = this.state.localData;
    const indexCatalogue = listCatalogue.returnParcelDraft.findIndex(
      item => parseInt(item.catalogueId, 10) === parseInt(data.catalogueId, 10)
    );
    listCatalogue.returnParcelDraft[indexCatalogue].note = data.note;

    this.setState({ localData: listCatalogue });
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

  renderLoadingPage() {
    return <LoadingPage />;
  }

  renderContent() {
    return this.state.loading
      ? this.renderLoadingPage()
      : this.renderListData();
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
    return this.state.openModalReturnReasons ? (
      <ModalReturnReasons
        open={this.state.openModalReturnReasons}
        close={() => this.setState({ openModalReturnReasons: false })}
        data={this.state.selectedData}
        returnReasons={this.state.returnReasons}
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
